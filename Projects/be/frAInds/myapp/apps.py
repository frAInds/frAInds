import subprocess
from django.apps import AppConfig

class MyAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'myapp'

    def ready(self):
        subprocess.call(['python', '/Users/baejongchan/Desktop/frAInds/myapp/chatgpt_selenium_automation_test.py'])
        subprocess.call(['python', '/Users/baejongchan/Desktop/frAInds/myapp/chatgpt_mkuserdata.py'])