require('dotenv').config();

const config = {
  KafkaHost:process.env.KAFKA_HOST,
  KafkaTopic: "dog-food-client-rounter-listener-topic"
};

module.exports = config;