# import flask related
from flask import Flask, request, abort
# import linebot related
from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage, AudioMessage,
    LocationSendMessage, ImageSendMessage, StickerSendMessage
)

import time



# create flask server
app = Flask(__name__)
# your linebot message API - Channel access token (from LINE Developer)
line_bot_api = LineBotApi('iMLHzRaN3RsuvlS3Duuv1IZ3bzhLk9h+1+oY76e94MoTPz4Jw8EfJgb02u82aCflsAPjzteWZR7FGoIAcut4i31HX4For09UDxIPD/sO78DEDAmgdiKmCePYfUAly2HxKaX7C2BHpmqrLgO7ECxi7AdB04t89/1O/w1cDnyilFU=')
# your linebot message API - Channel secret
handler = WebhookHandler('c061bcda0c7c050b3ab15bd399fd4e0f')

@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        print("Invalid signature. Please check your channel access token/channel secret.")
        abort(400)
    return 'OK'

# handle msg
import os
import speech_recognition as sr

def transcribe(wav_path):
    '''
    Speech to Text by Google free API
    language: en-US, zh-TW
    '''
    
    r = sr.Recognizer()
    with sr.AudioFile(wav_path) as source:
        audio = r.record(source)
    try:
        return r.recognize_google(audio, language="zh-TW")
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
    except sr.RequestError as e:
        print("Could not request results from Google Speech Recognition service; {0}".format(e))
    return None
    
@handler.add(MessageEvent, message=AudioMessage)
def handle_audio(event):

    name_mp3 = 'recording.mp3'
    name_wav = 'recording.wav'
    message_content = line_bot_api.get_message_content(event.message.id)
    
    with open(name_mp3, 'wb') as fd:
        for chunk in message_content.iter_content():
            fd.write(chunk)
    
    os.system('ffmpeg -y -i ' + name_mp3 + ' ' + name_wav + ' -loglevel quiet')
    text = transcribe(name_wav)
    
    if '現在幾點' in text:
        # 取得 struct_time 格式的時間
        t = time.localtime()

        # 依指定格式輸出
        res_text = time.strftime("%H:%M:%S", t)
        res_text = '現在時間：'+str(res_text)

        line_bot_api.reply_message(event.reply_token, TextSendMessage(text = res_text))

    elif '今天星期幾' in text:
        # 取得 struct_time 格式的時間
        t = time.localtime()
        # 依指定格式輸出
        res_text = int(t.tm_wday)+ 1
        
        if res_text == 1:
            res_text = '一'
        elif res_text == 2:
            res_text = '二'        
        elif res_text == 3:
            res_text = '三'            
        elif res_text == 4:
            res_text = '四'    
        elif res_text == 5:
            res_text = '五'    
        elif res_text == 6:
            res_text = '六'    
        elif res_text == 7:
            res_text = '日'
            
        res_text = '今天星期'+res_text
 
        line_bot_api.reply_message(event.reply_token, TextSendMessage(text = res_text))
    else:
        res_text = '不好意思，請再說一次您的問題'
 
        line_bot_api.reply_message(event.reply_token, TextSendMessage(text = res_text))    


# run app
if __name__ == "__main__":
    app.run(host='127.0.0.1', port=12345)