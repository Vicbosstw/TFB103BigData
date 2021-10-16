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

import sys
import time

from confluent_kafka import Producer

'''
* 示範: Fire-and-forget
'''


# 用來接收從 Consumer instance 發出的 error 訊息
def error_cb(err):
    sys.stderr.write(f'Error: {err}')
    

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
    topicName = 'ak03.fire_and_forget'
    msgCount = 100000  # 10 萬筆

    try:
        print('Start sending messages ...')

        time_start = int(round(time.time() * 1000))

        # produce(topic, [value], [key], [partition], [on_delivery], [timestamp], [headers])

        # ** 示範: Fire - and -forget **
        # 在以下的"produce()"過程, 我們並沒有去檢查訊息發佈的結果
        # 因此這種方法的 throughput 最高, 但也不知道訊息是否發佈成功或失敗

        for i in range(msgCount):
            producer.produce(topicName,
                             key=str(i), value=f'msg_{i}')

            producer.poll(0)  # <-- (重要) 呼叫poll來讓client程式去檢查內部的Buffer

            if i % 10000 == 0:
                print(f'Send {i} messages')

        time_spend = int(round(time.time() * 1000)) - time_start

        print(f'Send        : {msgCount} messages to Kafka')
        print(f'Total spend : {time_spend} millis-seconds')
        print(f'Throughput  : {msgCount/time_spend * 1000} msg/sec')

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

