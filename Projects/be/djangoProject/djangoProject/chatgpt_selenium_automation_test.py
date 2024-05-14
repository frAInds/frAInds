import os
import socket
import threading
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class ChatGPTAutomation:

    def __init__(self, chrome_path):
        self.chrome_path = chrome_path

        url = "https://chat.openai.com"
        print("find_available_port 사용가능포트반환 시작")
        free_port = self.find_available_port()
        print("launch_chrome_with_remote_debugging(free_port, url) 시작")
        self.launch_chrome_with_remote_debugging(free_port, url)
        print("setup_webdriver(free_port) 시작")
        self.driver = self.setup_webdriver(free_port)
        print("init 끝")
        
    @staticmethod
    def find_available_port(): 
        """사용가능포트반환"""

        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind(('', 0))
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            return s.getsockname()[1]

    def launch_chrome_with_remote_debugging(self, port, url): 
        """cmd로 chrome을 원하는 사용자 계정으로 사용가능한 포트에 실행"""

        def open_chrome():
            current_dir = os.path.dirname(os.path.abspath(__file__))
            user_data_dir = fr"{current_dir}\GPTUserData"
            chrome_cmd = fr"{self.chrome_path} --remote-debugging-port={port} --user-data-dir={user_data_dir} {url}"
            os.system(chrome_cmd)

        chrome_thread = threading.Thread(target=open_chrome)
        chrome_thread.start()
        time.sleep(3)

    def setup_webdriver(self, port):
        """ chrome과 selenium 연결"""

        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_experimental_option("debuggerAddress", f"127.0.0.1:{port}")
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
        return driver

    def url(self, url):
        self.driver.get(url)
        print(f'{url}로 이동')

    def quit(self):
        """ Closes the browser and terminates the WebDriver session."""
        print("Closing the browser...")
        self.driver.close()
        self.driver.quit()
    
    def select_chatbot(self, chatbot_name):
        """ chatbot_name으로 챗봇을 선택합니다. 선택되었다면 True를, 아니면 False를 반환합니다 """
        isclick = False
        try:
            print(chatbot_name, "챗봇 선택하기")
            taemin_button = WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH, f"//div[contains(text(), '{chatbot_name}')]")))
            taemin_button.click() # 요소가 클릭 가능해지면 클릭합니다.
            isclick = True
        except Exception as e:
            print("오류 발생:", e)
        finally:
            return isclick
    
    def send_prompt_to_chatgpt_and_return(self, prompt):
        """ ChatGPT에 메시지를 보내고 응답을 최대 2분 동안 기다립니다 """

        try:
            print('입력', prompt)
            input_box = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//textarea[contains(@id, 'prompt-textarea')]"))
            )
            self.driver.execute_script(f"arguments[0].value = '{prompt}';", input_box)
            input_box.send_keys(Keys.RETURN)
            input_box.submit()
            WebDriverWait(self.driver, 20).until(
                EC.visibility_of_element_located((By.XPATH, "//button[@aria-label='Stop generating']"))
            )

            print("기다리는중...")
            # 시스템 응답 완료 대기 (일시 중지 버튼이 사라질 때까지)
            WebDriverWait(self.driver, 120).until(
                EC.invisibility_of_element((By.XPATH, "//button[@aria-label='Stop generating']"))
            )
            # print("완료")
            # response_elements = self.driver.find_elements(by=By.CSS_SELECTOR, value='div.text-base')
            response_elements = self.driver.find_elements(By.CSS_SELECTOR, "div[data-message-author-role='assistant'] .markdown")
            print(response_elements)
            print('답변', response_elements[-1].text) # 가장 마지막 답변
        except Exception as e:
            print("오류 발생:", e)
        finally:
            return response_elements[-1].text
        
        
    # def return_chatgpt_conversation(self):
    #     """ ChatGPT와 한 모든 대화 반환 """
    #     conversation_elements = self.driver.find_elements(By.CSS_SELECTOR, "div[data-message-author-role] .markdown")
    #     # conversation_elements = self.driver.find_elements(by=By.CSS_SELECTOR, value='div.text-base')
    #     return conversation_elements






chrome_path = fr'"C:\Program Files\Google\Chrome\Application\chrome.exe"'

driver = ChatGPTAutomation(chrome_path)

def url(url):
    driver.url(url)

def quit():
    return driver.quit()

def select_chatbot(chatbot_name): #반드시 처음에 해줘야함
    return driver.select_chatbot(chatbot_name)

def send_prompt_to_chatgpt_and_return(prompt):
    """ ChatGPT에 메시지를 보내고 응답을 최대 2분 동안 기다립니다 """
    return driver.send_prompt_to_chatgpt_and_return(prompt)

    
# 예시
# select_chatbot('태민형님')
# while input('끝낼래? (y/n)')!='y':
#     send_prompt_to_chatgpt_and_return(input('물어보고 싶은거 말해봐'))













# def return_chatgpt_conversation():
#     """ ChatGPT와 한 모든 대화 반환 """
#     return driver.return_chatgpt_conversation()


# while True:
#     a = input('1/2/3/4/5')
#     if a=='1':
#         send_prompt_to_chatgpt_and_return(input('물어보고 싶은거 말해봐'))
#     elif a=='2':
#         return_chatgpt_conversation()
#     if a=='3':
#         driver.send_prompt_to_chatgpt_and_return1(input('물어보고 싶은거 말해봐'))
#     elif a=='4':
#         driver.return_chatgpt_conversation1()
#     elif a=='5':
#         break





















# 여러개 할 때 - 새 탭으로 열림 - 새 창으로 열려면 사용자 폴더 복사 후 이름변경 GPTUserData{index} 필요
# driver_list = []
# for i in range(3):
#     driver_list.append(ChatGPTAutomation(chrome_path))
# url_list = ['naver.com', 'daum.com', 'google.com']
# for i in range(3):
#     driver_list[i].url(url_list[i])
# def change_url(i, url):
#     driver_list[i].url(url)
