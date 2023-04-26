import { Kafka } from "kafkajs"

const kafka = new Kafka({
	clientId: "my-app",
	brokers: ["localhost:9092"],
})

const consumer = kafka.consumer({ groupId: "kafka-testing-group" })

const run = async () => {
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

run().catch(console.error)
