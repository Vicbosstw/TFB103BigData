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

from confluent_kafka import Producer


# 用來接收從 Consumer instance 發出的 error 訊息
def error_callback(err):
    sys.stderr.write(f'Error: {err}')
    

# 主程式進入點
if __name__ == '__main__':
    # 步驟1. 設定要連線到 Kafka 集群的相關設定
    props = {
        # Kafka 集群在那裡?
        'bootstrap.servers': 'localhost:9092',    # <-- 置換成要連接的 Kafka 集群
        'error_cb': error_callback                # 設定接收 error 訊息的 callback 函數
    }

    # 步驟2. 產生一個 Kafka 的 Producer 的實例
    producer = Producer(props)

    # 步驟3. 指定想要發佈訊息的 topic 名稱
    topic_name = 'test3'

    try:
        producer.produce(topic=topic_name, value='Hello_1')
        producer.produce(topic=topic_name, value='Hello_2')
        producer.produce(topic=topic_name, value='Hello_3')
        producer.produce(topic=topic_name, value='Hello_4')
        producer.flush()

        print('Send 4 messages to Kafka')

    except BufferError as e:
        # 錯誤處理
        sys.stderr.write(
            f'Local producer queue is full ({len(producer)} messages awaiting delivery): try again\n'
        )

    except Exception as e:
        sys.stderr.write(str(e))

    finally:
        # 步驟5. 確認所在 Buffer 的訊息都己經送出去給 Kafka 了
        producer.flush(5)
