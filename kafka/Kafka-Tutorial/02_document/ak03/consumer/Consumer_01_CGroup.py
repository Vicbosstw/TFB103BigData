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

from confluent_kafka import Consumer, KafkaException, KafkaError


# 用來接收從 Consumer instance 發出的 error 訊息
def error_cb(err):
    sys.stderr.write(f'Error: {err}')


# 轉換 msg_key 或 msg_value 成為 utf-8 的字串
def try_decode_utf8(data):
    return data.decode('utf-8') if data else None


# 當發生 Re-balance 時, 如果有 partition 被 assign 時被呼叫
def print_assignment(consumer, partitions):
    result = '[{}]'.format(
        ','.join([f'{p.topic}-{p.partition}' for p in partitions])
    )

    print(f'Setting newly assigned partitions: {result}')


# 當發生 Re-balance 時, 之前被 assigned 的 partition 會被移除
def print_revoke(consumer, partitions):
    result = '[{}]'.format(
        ','.join([f'{p.topic}-{p.partition}' for p in partitions])
    )

    print(f'Revoking previously assigned partitions: {result}')


if __name__ == '__main__':
    # 步驟1.設定要連線到 Kafka 集群的相關設定
    # Consumer configuration
    # See https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md
    props = {
        'bootstrap.servers': 'localhost:9092',         # Kafka 集群在那裡? (置換成要連接的 Kafka 集群)
        'group.id': 'iii',                             # ConsumerGroup 的名稱 (置換成你/妳的學員 ID)
        'auto.offset.reset': 'earliest',               # Offset 從最前面開始
        'error_cb': error_cb                           # 設定接收 error 訊息的 callback 函數
    }

    # 步驟2. 產生一個 Kafka 的 Consumer 的實例
    consumer = Consumer(props)

    # 步驟3. 指定想要訂閱訊息的 topic 名稱
    topicName = 'ak03.four_partition'

    # 步驟4. 讓 Consumer 向 Kafka 集群訂閱指定的 topic
    consumer.subscribe([topicName],
                       on_assign=print_assignment, on_revoke=print_revoke)

    # 步驟5. 持續的拉取 Kafka 有進來的訊息
    try:
        while True:
            # 請求 Kafka 把新的訊息吐出來
            records = consumer.consume(num_messages=500, timeout=1.0)  # 批次讀取

            if not records:
                continue

            for record in records:
                if not record:
                    continue

                # 檢查是否有錯誤
                if record.error() and record.error().code() != KafkaError._PARTITION_EOF:
                    raise KafkaException(record.error())

                else:
                    # ** 在這裡進行商業邏輯與訊息處理 **

                    # 取出相關的 metadata
                    topic = record.topic()
                    partition = record.partition()
                    offset = record.offset()
                    timestamp = record.timestamp()

                    # 取出 msg_key 與 msg_value
                    msg_key = try_decode_utf8(record.key())
                    msg_value = try_decode_utf8(record.value())

                    # 秀出 metadata 與 msg_key & msg_value 訊息
                    print('{}-{}-{} : ({} , {})'.format(
                        topic, partition, offset, msg_key, msg_value)
                    )

    except KeyboardInterrupt as e:
        sys.stderr.write('Aborted by user\n')

    except Exception as e:
        sys.stderr.write(str(e))

    finally:
        # 步驟6.關掉 Consumer 實例的連線
        consumer.close()
