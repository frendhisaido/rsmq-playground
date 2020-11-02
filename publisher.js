const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

for (let step = 0; step < 5000; step++) {
	rsmq.sendMessage({ qname: "myqueue", message: `Task number #${step}`}, function (err, resp) {
		if (err) {
			console.error(err)
			return
		}

		console.log("Message sent. ID:", resp);
	});
}