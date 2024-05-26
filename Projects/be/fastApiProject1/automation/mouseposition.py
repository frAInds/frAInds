import pyautogui
import time

try:
    x, y = pyautogui.position()
    while True:
        x1, y1 = pyautogui.position()
        if x != x1 or y != y1:
            print(f"Mouse X: {x} Y: {y}")
        x = x1
        y = y1
except KeyboardInterrupt:
    print("\nExit.")
