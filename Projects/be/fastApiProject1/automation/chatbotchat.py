from chatgpt_selenium_automation_test import *
from obsconnect_test1 import *
from voice_output import *
import time
import pytchat

class MainController:
    def __init__(self):
        self.obs = 0
        self.stream_key = 'kfyx-j2vj-5s5c-kqjz-c9rk' # 스트림 키 입력
        self.chat_url = 'https://studio.youtube.com/live_chat?is_popout=1&v=7K-MU4v6W80' # 채팅 url 입력

    # 챗봇
    def chatbot_start(self):
        select_chatbot('태민형님') #어떤 챗봇 쓸것인지
        time.sleep(1)

    # obs 실행
    def obs_start(self, stream_key, chat_url):
        self.obs = OBSController() # obs 실행
        time.sleep(1)

        self.stream_key = stream_key
        self.obs.setup_stream(stream_key)

        self.chat_url = chat_url
        self.obs.setup_chat(chat_url)

    # 방송 시작
    def stream_start(self):
        self.obs.start_streaming()
        chat = pytchat.create(video_id=self.chat_url.split('=')[-1])
        messages = ''
        isTalking = False
        print(chat.is_alive())
        voice = VoiceController()

        while chat.is_alive():
            for c in chat.get().sync_items():
                messages += f"{c.datetime}시간에 {c.author.name} 라는 사람이 {c.message} 라고 답변했어.   "

            if messages: #and not isTalking:  # 채팅이 있을 경우에만 처리
                response = send_prompt_to_chatgpt_and_return(messages+'이 중에서 대답하기 좋은 것이나 전에 대한 대답과 문맥상 잘 맞는 문장이나 문장들을 골라서 가장 잘 맞는 답변으로 대답해줘.')
                #여기서 response - 감정이나 감정표현 없애기
                # self.return_front(response) # 백엔드에서 프론트로 전달
                voice.voice_out(response)  # 응답을 음성으로 출력
                messages = ''  # 메시지 초기화

    # def return_front(self, response):
    #     #백엔드에서 프론트로
    #     return response

    # 방송 종료
    def stream_stop(self):
        self.obs.stop_streaming()


main = MainController()

# 챗봇
def chatbot_start():
    main.chatbot_start()

# obs 실행
def obs_start(stream_key, chat_url):
    main.obs_start(stream_key, chat_url)

# 방송 시작
def stream_start():
    main.stream_start()

# def return_front(response):
#     #백엔드에서 프론트로
#     return response

# 방송 종료
def stream_stop():
    main.stream_stop()