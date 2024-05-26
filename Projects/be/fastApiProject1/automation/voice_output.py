import os
import time
import pyautogui
import pygetwindow as gw
import pyperclip
import subprocess

# 실행 파일 경로
# C:\Users\Public\tts-server\run-server.bat
# 20초
# http://localhost:5000/tts-server/text-inference
class VoiceController:
    def __init__(self):
        self.window = 0
        self.open_voice()

    def open_voice(self):
        def wait_for_window(title, timeout=30):
            start_time = time.time()
            while time.time() - start_time < timeout:
                # Windows의 경우 Chrome 경로
                chrome_path = fr'"C:\Program Files\Google\Chrome\Application\chrome.exe"'
                # 크롬을 시크릿 모드로 실행
                os.system(f'"{chrome_path}" --incognito --new-window http://localhost:5000/tts-server/text-inference') #--start-maximized
                time.sleep(2)
                windows = gw.getWindowsWithTitle(title)
                if windows:
                    return windows[0]  # 창이 있으면 해당 창을 반환
                time.sleep(2)  # 1초 대기 후 다시 확인
            raise Exception(f"Timeout: '{title}' 창을 {timeout}초 내에 찾지 못했습니다.")

        batch_file_path = r'C:\Users\Public\tts-server\run-server.bat'
        try:
            # 배치 파일 실행
            process = subprocess.Popen(batch_file_path, shell=True)
            print("Batch file executed successfully.")
        except subprocess.CalledProcessError as e:
            print(f"An error occurred while executing the batch file: {e}")
        time.sleep(25)

        # try:
        #     # 배치 파일 실행
        #     process = subprocess.Popen(batch_file_path, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        #     print("Batch file executed successfully.")
        #     while True:
        #         output = process.stdout.readline()
        #         if output:
        #             print(output.strip())  # 출력 내용을 터미널에 표시

        #             # 특정 문자열이 출력되면 다음 코드 실행
        #             if "Running on" in output:
        #                 # Windows의 경우 Chrome 경로
        #                 chrome_path = fr'"C:\Program Files\Google\Chrome\Application\chrome.exe"'
        #                 # 크롬을 시크릿 모드로 실행
        #                 os.system(f'"{chrome_path}" --incognito --new-window http://localhost:5000/tts-server/text-inference') #--start-maximized
        #                 time.sleep(5)  # 브라우저가 완전히 열릴 때까지 기다림
        #                 break
        # except subprocess.CalledProcessError as e:
        #     print(f"An error occurred while executing the batch file: {e}")

        # Windows의 경우 Chrome 경로
        chrome_path = fr'"C:\Program Files\Google\Chrome\Application\chrome.exe"'
        # 크롬을 시크릿 모드로 실행
        os.system(f'"{chrome_path}" --incognito --new-window http://localhost:5000/tts-server/text-inference') #--start-maximized
        time.sleep(5)  # 브라우저가 완전히 열릴 때까지 기다림
        self.window = wait_for_window('SCE-TTS', timeout=30)
        self.window.maximize()
        print('번역 틀기')

    def voice_out(self, input_text):
        time.sleep(3) #손으로 할때
        # self.resize_voice_window()
        pyperclip.copy(input_text)
        
        # 텍스트 입력 위치 찾기
        pyautogui.click(950, 540)  # 구글 번역기의 텍스트 입력 박스 위치 (조정 필요)
        pyautogui.hotkey('ctrl', 'a')
        pyautogui.hotkey('ctrl', 'v')
        print('--',input_text)
        # time.sleep(3)
        
        # 소리 클릭
        pyautogui.click(1140, 785)  # 버튼 위치 (조정 필요)
        time.sleep(len(input_text)/3)  # 목소리 출력을 기다림 3글자당 1초


if __name__ == "__main__":
    v = VoiceController()
    a= True
    while a:
        input_text = input('입력')
        if input_text == '0':
            break
        v.voice_out(input_text)
