import { Kafka } from "kafkajs"

const kafka = new Kafka({
	clientId: "my-app",
	brokers: ["localhost:9092"],
})

const producer = kafka.producer()

const produce = async () => {
	await producer.connect()
	await producer.send({
		topic: "test-topic",
		messages: [
			{
				value: "Hello From Producer!",
			},
		],
	})
}

// produce after every 3 seconds
setInterval(() => {
	produce().catch(console.error)
}, 3000)
