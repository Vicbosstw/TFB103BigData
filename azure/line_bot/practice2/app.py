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
    MessageEvent, TextMessage, TextSendMessage,
    LocationSendMessage, ImageSendMessage, StickerSendMessage
)
from azure.core.credentials import AzureKeyCredential
from azure.ai.textanalytics import TextAnalyticsClient

key = "ca679339054044e094c771380c0c4612"
endpoint = "https://textisaac.cognitiveservices.azure.com/"

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
        print('receive msg')
        handler.handle(body, signature)
    except InvalidSignatureError:
        print("Invalid signature. Please check your channel access token/channel secret.")
        abort(400)
    return 'OK'

# handle msg
@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    # get user info & message
    user_id = event.source.user_id
    msg = event.message.text
    user_name = line_bot_api.get_profile(user_id).display_name
    
    # get msg details
    print('msg from [', user_name, '](', user_id, ') : ', msg)
    
    text_analytics_client = TextAnalyticsClient(endpoint=endpoint, credential=AzureKeyCredential(key))
    msg_list = []
    msg_list.append(msg)
    
    # https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support?tabs=sentiment-analysis
    
    result = text_analytics_client.analyze_sentiment(msg_list, language="zh-hant")
    #result = text_analytics_client.analyze_sentiment(msg_list)

    docs = [doc for doc in result if not doc.is_error]

    sentiment_result = docs[0].sentiment

        
    line_bot_api.reply_message(event.reply_token, TextSendMessage(text = sentiment_result))
    

# run app
if __name__ == "__main__":
    app.run(host='127.0.0.1', port=12345)