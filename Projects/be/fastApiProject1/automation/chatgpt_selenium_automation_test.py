import os
import socket
import threading
import time
import pyperclip

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException


class ChatGPTAutomation:

    def __init__(self, chrome_path, user_data_path_name = 'GPTUserData'):
        self.chrome_path = chrome_path
        self.input_count = 0
        self.response_count = 0

        url = "https://chat.openai.com"
        print("find_available_port 사용가능포트반환 시작")
        free_port = self.find_available_port()
        print("launch_chrome_with_remote_debugging(free_port, url) 시작")
        self.launch_chrome_with_remote_debugging(free_port, url, user_data_path_name)
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

    def launch_chrome_with_remote_debugging(self, port, url, user_data_path_name): 
        """cmd로 chrome을 원하는 사용자 계정으로 사용가능한 포트에 실행"""

        def open_chrome():
            current_dir = os.path.dirname(os.path.abspath(__file__))
            user_data_dir = fr"{current_dir}\{user_data_path_name}"
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
        time.sleep(1)
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

        def check_print():
            try:
                print('버튼 찾기')
                
                # 버튼 상태 확인을 위한 XPath 목록
                button_xpaths_no_input = [
                    "//button[contains(@data-testid, 'send-button') and @disabled]",
                    "//button[contains(@data-testid, 'fruitjuice-send-button') and @disabled]"
                ]
                button_xpaths_with_input = [
                    "//button[contains(@data-testid, 'send-button') and not(@disabled)]",
                    "//button[contains(@data-testid, 'fruitjuice-send-button') and not(@disabled)]"
                ]
                button_xpaths_stop = [
                    "//button[contains(@aria-label, '생성 중단하기')]",
                    "//button[contains(@data-testid, 'fruitjuice-stop-button')]"
                ]
                
                # 각각의 상태에 대한 XPath 결합
                combined_xpath_no_input = " | ".join(button_xpaths_no_input)
                combined_xpath_with_input = " | ".join(button_xpaths_with_input)
                combined_xpath_stop = " | ".join(button_xpaths_stop)
                
                # 요소 찾기 및 상태 출력
                def print_button_state(xpath, state_description):
                    buttons = self.driver.find_elements(By.XPATH, xpath)
                    for button in buttons:
                        if button:
                            print(f'{button.get_attribute("data-testid")} 버튼이 {state_description} 있습니다.')
                            return True
                        else:
                            print(f'{button.get_attribute("data-testid")} 버튼이 {state_description} 없습니다.')
                            return False
                    return False
                            
                # 상태 확인
                a = print_button_state(combined_xpath_no_input, '비활성화된 상태로')
                b = print_button_state(combined_xpath_with_input, '활성화된 상태로')
                c = print_button_state(combined_xpath_stop, '생성 중단 버튼으로')

                if a:
                    return '비활성화버튼'
                if b:
                    return '활성화버튼'
                if c:
                    return '중지버튼'
                raise Exception("아무것도 없음")
            except Exception as e:
                print("오류 발생:", e)
                return '오류발생'

        def input_text():
            try:
                input_box = WebDriverWait(self.driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, "//textarea[contains(@id, 'prompt-textarea')]"))
                )
                if not input_box:
                    raise Exception("아무것도 없음")
                return input_box
            except Exception as e:
                print("오류 발생:", e)
                return '오류발생'
            
        def is_stop_button():
            try:
                WebDriverWait(self.driver, 4).until(
                    EC.visibility_of_element_located((By.CSS_SELECTOR, "button.bg-black.text-white.rounded-full:has(svg[viewBox='0 0 24 24'] > rect[width='10'])"))
                )
                return True
            except TimeoutException:
                return False

        try:
            print('입력', prompt)
            input_box = input_text() #
            if input_box == "오류발생":
                raise Exception("새로고침 필요")

            input_box.clear()
            input_box.send_keys(''.join(char for char in prompt if ord(char) <= 0xFFFF))
            input_box.send_keys(Keys.RETURN)
            input_box.submit()

            print("기다리는중...1")
            if is_stop_button():
                print("기다리는중...2")
                # 시스템 응답 완료 대기 (일시 중지 버튼이 사라질 때까지)
                WebDriverWait(self.driver, 120).until(
                    EC.invisibility_of_element_located((By.CSS_SELECTOR, "button.bg-black.text-white.rounded-full:has(svg[viewBox='0 0 24 24'] > rect[width='10'])"))
                )
            else:
                check = check_print()
                if "중지버튼":
                    while True:
                        check = check_print()
                        if check == '비활성화버튼':
                            break
                elif check == "오류발생":
                    raise Exception('새로고침 필요') #

            response_elements = self.driver.find_elements(By.CSS_SELECTOR, "div[data-message-author-role='assistant']")
            print(response_elements)
            if response_elements:
                print('답변', response_elements[-1].text) # 가장 마지막 답변
                return response_elements[-1].text
            else:
                try:
                    buttons = self.driver.find_elements(By.XPATH, "//button[contains(., '코드 복사')]")
                    print('버튼', buttons)
                    buttons[-1].click()
                    clipboard_content = pyperclip.paste()
                    print('답변', clipboard_content)
                    return clipboard_content
                except:
                    print('버튼 없음')
            return '오류가 났습니다. 다시 질문해주세요.'

            # top_div_html = last_response_element.get_attribute('outerHTML').split('</div>')[0] + '</div>'
            # print('최상단 div:', top_div_html)

            # print('답변:', last_response_element.text)  # 가장 마지막 답변
            # return last_response_element.text

        except Exception as e:
            print("오류 발생:", e)
            if str(e) == "새로고침 필요":
                self.driver.refresh()
                time.sleep(1)
            # else:
            #     print("오류 발생:", e)
            #     # 다른 예외 처리
        
        
    # def return_chatgpt_conversation(self):
    #     """ ChatGPT와 한 모든 대화 반환 """
    #     conversation_elements = self.driver.find_elements(By.CSS_SELECTOR, "div[data-message-author-role] .markdown")
    #     # conversation_elements = self.driver.find_elements(by=By.CSS_SELECTOR, value='div.text-base')
    #     return conversation_elements






# chrome_path = fr'"C:\Program Files\Google\Chrome\Application\chrome.exe"'

# driver = ChatGPTAutomation(chrome_path, 'GPTUserData1')

# def url(url):
#     driver.url(url)

# def quit():
#     return driver.quit()

# def select_chatbot(chatbot_name): #반드시 처음에 해줘야함
#     return driver.select_chatbot(chatbot_name)

# def send_prompt_to_chatgpt_and_return(prompt):
#     """ ChatGPT에 메시지를 보내고 응답을 최대 2분 동안 기다립니다 """
#     return driver.send_prompt_to_chatgpt_and_return(prompt)


# if __name__ == "__main__":
#     select_chatbot('태민형님')
#     time.sleep(5)
#     while input('끝낼래? (y/n)')!='y':
#         send_prompt_to_chatgpt_and_return(input('물어보고 싶은거 말해봐'))

    
# 예시
# select_chatbot('태민형님')

# while input('끝낼래? (y/n)')!='y':
#     send_prompt_to_chatgpt_and_return(input('물어보고 싶은거 말해봐'))


# 여러개 할 때 - 새 탭으로 열림 - 새 창으로 열려면 사용자 폴더 복사 후 이름변경 GPTUserData{index} 필요
# driver_list = []
# for i in range(3):
#     driver_list.append(ChatGPTAutomation(chrome_path))
# url_list = ['naver.com', 'daum.com', 'google.com']
# for i in range(3):
#     driver_list[i].url(url_list[i])
# def change_url(i, url):
#     driver_list[i].url(url)


# 1921 x 1170