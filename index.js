const RedisSMQ = require("rsmq");
const rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

rsmq.createQueue({ qname: "myqueue" }, function (err, resp) {
	if (err) {
		console.error(err)
		return
	}

	if (resp === 1) {
		console.log("queue created")
	}
});