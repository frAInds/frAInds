# 사용자 권한을 일반 -> 관리자 or 일반 -> 결제 로 변경하는 코드
from main import SessionLocal, User, UserStatus
def update_user_status(username, status):
    db = SessionLocal()
    try:
        db_user = db.query(User).filter(User.username == username).first()
        if db_user:
            db_user.status = status
            db.commit()
            print(f"사용자 {username}의 상태가 {status}로 업데이트되었습니다.")
        else:
            print(f"사용자 {username}을(를) 찾을 수 없습니다.")
    finally:
        db.close()

update_user_status("testadmin1", UserStatus.관리자)
update_user_status("testadmin2", UserStatus.결제)