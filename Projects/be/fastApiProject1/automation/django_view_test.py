from streamchat import *
from chatgpt_selenium_automation_test import *
import time

# 둘 중에 한개만 켜야함.
#챗봇
chrome_path = fr'"C:\Program Files\Google\Chrome\Application\chrome.exe"'
GlobalChatgpt = ChatGPTAutomation(chrome_path, user_data_path_name = 'GPTUserData1')

#스트리밍
# GlobalStream = MainController(user_data_path_name = 'GPTUserData')

a = True
stream_key = 'a81m-cwr7-3ymc-qj3k-28eu' # 스트림 키 입력
chat_url = 'https://studio.youtube.com/live_chat?is_popout=1&v=DyBjUnLfM7g' # 채팅 url 입력

while a:
    e = input('명령어를 입력하세요 : ')
    if e == '1':
        time.sleep(1)
        GlobalChatgpt.select_chatbot('태민형님')
        time.sleep(5)
        GlobalChatgpt.send_prompt_to_chatgpt_and_return('너는 지금부터 여러 사람들이 말하는 내용을 들으면서 너가 알맞은 답변을 유태민처럼 해주면 돼.')
    # elif e == '2':
        # GlobalChatgpt.obs_start(stream_key, chat_url)
        # obs_start(stream_key, chat_url)
    elif e == '3':
        GlobalChatgpt.send_prompt_to_chatgpt_and_return(input('물어보고 싶은거 말해봐'))
    # elif e == '4':
    #     return_front(response)
    elif e == '5':
        GlobalChatgpt.stream_stop()


    elif e == '11':
        GlobalStream.chatbot_start('태민형님')
    elif e == '22':
        GlobalStream.obs_start(stream_key, chat_url)
        # obs_start(stream_key, chat_url)
    elif e == '33':
        GlobalStream.stream_start()
    # elif e == '4':
    #     return_front(response)
    elif e == '55':
        GlobalStream.stream_stop()

        
    else:
        print('다시')