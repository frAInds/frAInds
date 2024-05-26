import pygetwindow as gw

# 모든 창의 타이틀을 가져와 출력하는 함수
def list_all_window_titles():
    windows = gw.getAllWindows()
    if not windows:
        print("현재 열려 있는 창이 없습니다.")
    else:
        for window in windows:
            print(window.title)

# 함수 호출
list_all_window_titles()
