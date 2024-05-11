from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import os 

current_dir = os.path.dirname(os.path.abspath(__file__))

# the sintax r'"..."' is required because the space in "Program Files" in the chrome path
chrome_path = fr"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

print(current_dir)
print(chrome_path)


# current_dir = os.path.dirname(os.path.abspath(__file__))

print('이 프로그램은 Chatgpt 자동화에 쓰일 계정을 입력하는 프로그램입니다.')
print('!!주의!! 모든 사용자 데이터가 사라집니다!')
if input('진행하시겠습니까? (y/n) : ') == 'y':
    gpt_user_data_dir = fr"{current_dir}\GPTUserData"
    options = webdriver.ChromeOptions()
    options.add_argument(f"user-data-dir={gpt_user_data_dir}")  # 경로의 슬래시를 변경
    options.binary_location = chrome_path  # Chrome 실행 파일 지정
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    # 크롬 버전 페이지로 이동
    driver.get("chrome://version")
    time.sleep(3)

    # 종료
    driver.quit()

    print("사용자 계정 설정 - 로그인한 뒤 챗지피티에 구글 로그인 계속하기를 눌러서 챗지피티 로그인을 성공시켜주세요.")

    chrome_path = fr'"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"'
    print("어디서걸리는거야1")
    chrome_cmd = fr"{chrome_path} --user-data-dir={gpt_user_data_dir} google.com"
    print("어디서걸리는거야2")
    os.system(chrome_cmd)
    print("어디서걸리는거야3")
    while(input("로그인이 끝나셨나요? (y/n): ") != "y"):
        print('다시한번 실행합니다. 챗지피티 로그인을 끝마쳐주세요')
        chrome_cmd = fr"{chrome_path} --user-data-dir={gpt_user_data_dir} google.com"
        os.system(chrome_cmd)

    print('완료')
