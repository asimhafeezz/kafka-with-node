import { Kafka, Partitioners } from "kafkajs"

const kafka = new Kafka({
	clientId: "my-producer",
	brokers: ["localhost:9092"],
})

const producer = kafka.producer({
	createPartitioner: Partitioners.DefaultPartitioner,
})

const produce = async () => {
	await producer.connect()
	await producer.send({
		topic: "my-topic",
		messages: [
			{
				value: "Hello From Producer!",
			},
		],
	})
}

// produce after every 3 seconds
setInterval(() => {
	produce()
		.then(() => console.log("Message Produced!"))
		.catch(console.error)
}, 3000)
