from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Enum, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from passlib.context import CryptContext
import enum

# 데이터베이스 설정
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 비밀번호 해싱 설정
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Enum 클래스 정의
class UserStatus(enum.Enum):
    일반 = "일반"
    결제 = "결제"
    관리자 = "관리자"

# 사용자 모델 정의
class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    hashed_password = Column(String)
    status = Column(Enum(UserStatus), default=UserStatus.일반)

# 데이터베이스 생성
Base.metadata.create_all(bind=engine)

# Pydantic 모델 정의
class UserCreate(BaseModel):
    id: str
    password: str

class UserSignIn(BaseModel):
    id: str
    password: str

# FastAPI 앱 생성
app = FastAPI()

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

# 회원 가입 엔드포인트
@app.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user.id).first()
    if db_user:
        raise HTTPException(status_code=400, detail="User already registered")
    hashed_password = get_password_hash(user.password)
    db_user = User(id=user.id, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User registered successfully"}

# 로그인 엔드포인트
@app.post("/signin")
async def signin(user: UserSignIn, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user.id).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid ID or password")
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid ID or password")
    return {"message": "Login successful"}

# 결제 상태 변경 엔드포인트
@app.post("/pay")
async def pay(user: UserSignIn, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user.id).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid ID or password")
    db_user.status = UserStatus.결제
    db.commit()
    db.refresh(db_user)
    return {"status": db_user.status}

# 앱 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
