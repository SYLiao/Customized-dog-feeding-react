const Kafka = require('kafka-node');
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const jsonData = require('./app_json');

const Producer = Kafka.Producer;
const client = new Kafka.KafkaClient({ kafkaHost: config.KafkaHost });
const producer = new Producer(client, { requireAcks: 0, partitionerType: 2 });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const initiateDataToKafka = (dataToPush) => {
    try {
        let payloadToKafkaTopic = [{ topic: config.KafkaTopic, messages: JSON.stringify(dataToPush) }];
        console.log(`producer sent ${JSON.stringify(payloadToKafkaTopic)}`);
        producer.on('ready', async function () {
            producer.send(payloadToKafkaTopic, (err, data) => {
                console.log('data: ', data);
            });

            producer.on('error', function (err) {
                //  handle error cases here
                console.log(err)
            })
        })
    }
    catch (error) {
        console.log(error);
    }
};

const pushDataToKafka = (dataToPush) => {
    try {
        let payloadToKafkaTopic = [{ topic: config.KafkaTopic, messages: JSON.stringify(dataToPush) }];
        console.log(`producer sent ${JSON.stringify(payloadToKafkaTopic)}`);
        producer.send(payloadToKafkaTopic, (err, data) => {
            console.log('data: ', data);
        });

        producer.on('error', function (err) {
            //  handle error cases here
            console.log(err)
        })
    }
    catch (error) {
        console.log(error);
    }
};


initiateDataToKafka(jsonData);

app.get('/test', (req, res) => {
    const url = req.query.url || 'none';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ url: `received ${url}!` }));
    pushDataToKafka({
        "url": url
    });
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);