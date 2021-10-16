#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

import json
import sys
import time

from confluent_kafka import Producer

from model.Employee import Employee

'''
* 示範: 如何將資料包成物件並轉換成JSON字串送入Kafka
'''


# 用來接收從 Consumer instance 發出的 error 訊息
def error_cb(err):
    sys.stderr.write(f'Error: {err}')


# 回傳現在的時間(epoch in millis)
def epoch_now_mills():
    return int(round(time.time() * 1000))


# Optional per-message delivery callback (triggered by poll() or flush())
# when a message has been successfully delivered or permanently
# failed delivery (after retries).
def delivery_callback(err, msg):
    if err:
        sys.stderr.write(f'Message failed delivery: {err}\n')
    else:
        # 為了不讓打印訊息拖慢速度, 我們每1萬打印一筆 record Metadata 來看
        if int(msg.key()) % 10000 == 0:
            print(f'Message delivered to topic: {msg.topic()}')


# 主程式進入點
if __name__ == '__main__':
    # 步驟1. 設定要連線到 Kafka 集群的相關設定
    props = {
        # Kafka 集群在那裡?
        'bootstrap.servers': 'localhost:9092',    # <-- 置換成要連接的 Kafka 集群
        'error_cb': error_cb                      # 設定接收 error 訊息的 callback 函數
    }

    # 步驟2. 產生一個 Kafka 的 Producer 的實例
    producer = Producer(props)

    # 步驟3. 指定想要發佈訊息的 topic 名稱
    topicName = 'ak03.json'
    msgCount = 100000  # 10 萬筆

    try:
        print('Start sending messages ...')
        time_start = int(round(time.time() * 1000))

        # produce(topic, [value], [key], [partition], [on_delivery], [timestamp], [headers])
        '''
        / ** 示範: 如何將資料包成物件並轉換成JSON字串送入Kafka **
        // 由於一般應用場景的資料都是包括了很多的資料欄位及不同的資料型別。通常都會使用一個類別物件來做為資料傳遞的容器。
        // 因此如何把一個Data Transfer Object (DTO)序列化送進Kafka是相當關鍵的步驟
        '''
        for i in range(msgCount):
            fakeNumber = i

            # 讓我們產生假的 Employee 資料
            employee = Employee(id_=f'emp_id_{fakeNumber}',
                                first_name=f'fn_{fakeNumber}',
                                last_name=f'ln_{fakeNumber}',
                                dept_id=f'dept_id_{fakeNumber % 10}',
                                hire_date=epoch_now_mills(),
                                wage=float(i),
                                sex=True)

            # 轉換成 JSON 字串
            employeeJson = json.dumps(employee.__dict__)

            # 送出訊息
            producer.produce(topicName,
                             key=str(i), value=employeeJson,
                             callback=delivery_callback)

            producer.poll(0)  # 呼叫 poll 來讓 client 程式去檢查內部的 Buffer, 並觸發 callback

            if i % 10000 == 0:
                print(f'Send {i} messages')

        time_spend = int(round(time.time() * 1000)) - time_start

        print(f'Send        : {msgCount} messages to Kafka')
        print(f'Total spend : {time_spend} millis-seconds')
        print(f'Throughput  : {msgCount / time_spend * 1000} msg/sec')

    except BufferError as e:
        # 錯誤處理
        sys.stderr.write(
            f'Local producer queue is full ({len(producer)} messages awaiting delivery): try again\n'
        )

    except Exception as e:
        sys.stderr.write(str(e))

    # 步驟5. 確認所有在 Buffer 裡的訊息都己經送出去給 Kafka 了
    producer.flush(10)
    print('Message sending completed!')
