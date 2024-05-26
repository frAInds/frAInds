import os
import time
import pygetwindow as gw
import pyautogui
import pyperclip
from obswebsocket import obsws, requests

# 예약된 스트림 : xw7k-uyuz-c27m-k1rg-6rh1
# 기본 스트림 : kfyx-j2vj-5s5c-kqjz-c9rk

class OBSController:
    def __init__(self, host="localhost", port=4455, password="uZ8bWVW50vqNb0vj", obsAddress=r'"C:\Program Files\obs-studio\bin\64bit\obs64.exe"'):
        self.host = host
        self.port = port
        self.password = password
        self.obsAddress = obsAddress
        self.obs_window = 0
        self.ws = self.start_obs(host, port, password, obsAddress)

    def start_obs(self, host, port, password, obsAddress):
        print("Starting OBS...")
        os.system(r'start /d "C:\Program Files\obs-studio\bin\64bit\" obs64.exe')
        print("Waiting for OBS to start...")
        time.sleep(10)  # OBS 시작을 기다리기 위해 잠시 대기
        self.is_obs_start()
        self.obs_window = self.focus_obs_window()
        self.resize_obs_window(self.obs_window)
        ws = obsws(host, port, password)
        ws.connect()
        print(f"Connected to OBS on {host}:{port}")
        return ws
    
    def is_obs_start(self):
        windows = gw.getAllWindows()
        if not windows:
            print("현재 열려 있는 창이 없습니다.")
        else:
            safe_mode_windows = [window for window in windows if "안전 모드" in window.title]
            if safe_mode_windows:
                print("안전 모드 창이 발견되었습니다.")
                # 여기서 안전 모드 창이 있을 때 필요한 작업을 수행합니다.
                pyautogui.click(x=1430, y=725)  # 일반 모드 버튼 클릭
                time.sleep(10)  # OBS 시작을 기다리기 위해 잠시 대기
            else:
                print("안전 모드 창이 발견되지 않았습니다.")
        

    def focus_obs_window(self):
        # OBS 창 찾아서 포커싱
        obs_windows = [w for w in gw.getWindowsWithTitle('OBS 30')]
        try:
            if obs_windows:
                obs_window = obs_windows[0]
            else:
                print("OBS Window not found")
        except gw.PyGetWindowException as e:
            print(f"Failed to activate window: {str(e)}")
        return obs_window

    def resize_obs_window(self, obs_window):
        # OBS 창 찾아서 포커싱
        try:
            if obs_window.isActive == False:
                obs_window.activate()
                time.sleep(1)
            obs_window.resizeTo(800, 600)  # 창의 크기를 800x600으로 조정
            time.sleep(1)
            obs_window.moveTo(0, 0)  # 창을 화면의 (100, 100) 위치로 이동
            time.sleep(1)
        except gw.PyGetWindowException as e:
            print(f"Failed to activate window: {str(e)}")

    def setup_stream(self, stream_key='a81m-cwr7-3ymc-qj3k-28eu'):
        pyautogui.click(x=800, y=500)  # 방송 설정 버튼 클릭
        time.sleep(3)

        pyautogui.click(x=80, y=100)  # 방송 버튼
        time.sleep(2)

        pyautogui.click(x=450, y=210)  # 스트림키 사용
        time.sleep(2)

        pyautogui.click(x=430, y=140)  # 스트림키 누르기
        pyautogui.hotkey('ctrl', 'a')

        pyperclip.copy(stream_key)
        pyautogui.hotkey('ctrl', 'v')
        time.sleep(1)

        pyautogui.click(x=800, y=730)  # 확인 버튼 클릭
        time.sleep(2)

    def setup_chat(self, chat_url='https://studio.youtube.com/live_chat?is_popout=1&v=vQ4WMgAoXpU'):
        pyautogui.click(x=220, y=350)
        time.sleep(0.1)
        pyautogui.click(x=220, y=350)  # 브라우저 더블 클릭
        time.sleep(3)

        pyautogui.click(x=220, y=360)  # url 누르기
        pyautogui.hotkey('ctrl', 'a')    
        pyperclip.copy(chat_url)
        pyautogui.hotkey('ctrl', 'v')
        time.sleep(1)

        pyautogui.click(x=690, y=580)  # 확인 버튼 클릭
        time.sleep(2)

    def disconnect(self):
        self.ws.disconnect()
        print('Disconnected from OBS')

    def start_streaming(self):
        self.ws.call(requests.StartStream())
        print('Streaming started')

    def stop_streaming(self):
        self.ws.call(requests.StopStream())
        print('Streaming stopped')


if __name__ == "__main__":
    obs = OBSController()
    a = True
    while a:
        command = input('어쩔깝숑 : ')
        if command == '3':
            obs.start_streaming()
        elif command == '4':
            obs.stop_streaming()
        elif command == '5':
            obs.setup_stream()
        elif command == '6':
            obs.setup_chat()
        elif command == '7':
            obs.disconnect()
            a = False
        else:
            print('Invalid command')
