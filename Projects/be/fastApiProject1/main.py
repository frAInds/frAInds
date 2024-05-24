from fastapi import FastAPI, Depends, HTTPException, status, Header, Request
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Enum, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.responses import JSONResponse
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone

#사용자 조회용
from typing import List, Optional

import enum

# 데이터베이스 설정
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 비밀번호 해싱 설정
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT setup
SECRET_KEY = "awjf90waefjawe"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Enum 클래스 정의
class UserStatus(enum.Enum):
    일반 = "일반"
    결제 = "결제"
    관리자 = "관리자"

# 사용자 모델 정의
class User(Base):
    __tablename__ = "users"
    username = Column(String, primary_key=True, index=True)
    hashed_password = Column(String)
    status = Column(Enum(UserStatus), default=UserStatus.일반)

# 데이터베이스 생성
Base.metadata.create_all(bind=engine)

# Pydantic 모델 정의

class UserCreate(BaseModel):
    username: str
    password: str

class UserSignIn(BaseModel):
    username: str
    password: str

# 사용자 조회용
class UserOut(BaseModel):
    username: str
    status: UserStatus

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None


class BroadcastData(BaseModel):
    stream_key: str
    chat_url: str

# FastAPI 앱 생성
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메소드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )

# 의존성 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 헬퍼 함수
def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# JWT helper functions
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user(db, username: str):
    return db.query(User).filter(User.username == username).first()

def authenticate_user(db, username: str, password: str):
    user = get_user(db, username)
    print(f"Authenticating user: {username}"), print(f"User found: {user}")
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user

def get_current_user(db: Session = Depends(SessionLocal), token: str = Header(...)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

@app.get("/")
def read_root():
    return {"message": "Hello World"}

# 회원 가입 엔드포인트
# @app.post("/api/signup", status_code=status.HTTP_201_CREATED)
# async def signup(user: UserCreate, db: Session = Depends(get_db)):
#     db_user = db.query(User).filter(User.username == user.username).first()
#     if db_user:
#         raise HTTPException(status_code=400, detail="User already registered")
#     hashed_password = get_password_hash(user.password)
#     db_user = User(username=user.username, hashed_password=hashed_password)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return {"message": "User registered successfully"}

@app.post("/api/signup", response_model=Token)
async def signup(user: UserCreate, db: Session = Depends(SessionLocal)):
    db_user = get_user(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="User already registered")
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}


# 로그인 엔드포인트
# @app.post("/api/signin")
# async def signin(user: UserSignIn, db: Session = Depends(get_db)):
#     db_user = db.query(User).filter(User.username == user.username).first()
#     if not db_user:
#         raise HTTPException(status_code=400, detail="Invalid username")
#     if not verify_password(user.password, db_user.hashed_password):
#         raise HTTPException(status_code=400, detail="Invalid password")
#     return {"username": db_user.username, "status": db_user.status}

@app.post("/api/signin", response_model=Token)
async def signin(user: UserSignIn, db: Session = Depends(get_db)):
    print("Signin endpoint called")
    db_user = authenticate_user(db, user.username, user.password)
    print(db_user.username, db_user.status)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer", "username": db_user.username, "status": db_user.status}


@app.get("/api/users/me", response_model=UserCreate)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

# 사용자 조회 엔드포인트
@app.get("/api/users", response_model=List[UserOut])
async def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@app.put("/api/users/{username}")
async def update_user_status(username: str, status: UserStatus, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == username).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")
    db_user.status = status
    db.commit()
    db.refresh(db_user)
    return {"username": db_user.username, "status": db_user.status}

# 결제 상태 변경 엔드포인트
@app.post("/api/pay")
async def pay(user: UserSignIn, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    db_user.status = UserStatus.결제
    db.commit()
    db.refresh(db_user)
    return {"status": db_user.status}

@app.post("/api/start-broadcast")
async def start_broadcast(broadcast_data: BroadcastData):
    stream_key = broadcast_data.stream_key
    chat_url = broadcast_data.chat_url

    # 전송된 데이터를 사용하여 방송 시작 로직 처리
    print(f"Stream Key: {stream_key}")
    print(f"Chat URL: {chat_url}")

    return {"message": "방송이 성공적으로 시작되었습니다."}

# 앱 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)