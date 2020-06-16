const express = require('express');
const redis = require('redis');

const app = express();

const client = redis.createClient({
    host: 'redis-server', // connected behind the scenes to Redis container
    port: 6379, // default Redis port number
});
client.set('visits', '0');

app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send(`Number of visits: ${visits}`);

        // The second argument might not work, check it later
        client.set('visits', `${parseInt(visits) + 1}`);
    });
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});
