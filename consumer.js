import { Kafka } from "kafkajs"

const kafka = new Kafka({
	clientId: "my-first-app",
	brokers: ["localhost:9092"],
})

const consumer = kafka.consumer({ groupId: "kafka-testing-group" })

const consume = async () => {
	await consumer.connect()
	await consumer.subscribe({ topic: "test-topic", fromBeginning: true })

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			console.log({
				value: message.value.toString(),
			})
		},
	})
}

consume().catch(console.error)
