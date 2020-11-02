from pprint import pprint
import time
import sys

from rsmq import RedisSMQ

queue = RedisSMQ(host="127.0.0.1", qname="myqueue", port=6379, ns="rsmq")


# Delete Queue if it already exists, ignoring exceptions
queue.deleteQueue().exceptions(False).execute()

# Create Queue with default visibility timeout of 20 and delay of 0
# demonstrating here both ways of setting parameters
queue.createQueue(delay=0).vt(20).execute()

iteration = sys.argv[1]
count = 0
while count < int(iteration):
    count += 1
    message_id = queue.sendMessage(delay=0).message("Task number "+str(count)).execute()
    pprint({'queue_status': queue.getQueueAttributes().execute()})
