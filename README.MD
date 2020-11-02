### Setup 
```
//Requirements: nodejs & python3
npm install
python -m venv env
source env/bin/activate
pip install -r requirements.txt
// docker run redis at 6379 if needed
docker-compose up -d
```

### Demo Queue/Workers
A python producer will push *n* messages to a queue on a redis instance marked by a namespace. 
The node js workers/consumers will retrieve the next message on the queue that ready to be processed.
The queue messages are evenly distributed to each consumers. 

Run each lines on seperate terminals (start worker.js scripts before publisher.py scripts)
```
node worker.js // terminal#1
node worker.js // terminal#2
node worker.js // terminal#3

python publisher.py 800 // terminal#4
```

Notes:

> Messages have a property of "visibility" - where any "visible" message may be consumed, but "invisbile" messages stay in the queue until they become visible or deleted.

> When using popMessage() the message is automatically deleted at the same time it is received.

> When using receiveMessage(), the message is kept in the queue, but is marked "invisible" for some amount of time. The amount of time is specified by queue attribute vt(visibility timeout), which may also be overridden by specifying a custom vt value in receiveMessage() call.

> A “Realtime” mode can be specified when using the RSMQ queue. “Realtime” mode adds a Redis PUBSUB based notification that would allow Consumers to be notified whenever a new message is added to the queue. This can remove the need for Consumer to constantly poll the queue when it is empty (NOTE: as of this writing, “Realtime” is not yet implemented in python version)

The rsmq-worker module is possibly abandoned https://github.com/mpneuried/rsmq-worker 
(this module is recommended in the RSMQ github page https://github.com/smrchy/rsmq)