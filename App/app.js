const http = require('http');
const mqtt = require('mqtt');

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let rawbody = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    rawbody.push(chunk);
  }).on('end', async () => {
    rawbody = Buffer.concat(rawbody).toString();
    console.log("rawbody",rawbody)
    const jsonData = JSON.parse(rawbody)
    

    const client  = mqtt.connect(process.env.MQTTLOCAL);
    client.on('connect', function () {
      console.log('entered');
        client.publish(jsonData.topic,jsonData.message);
        client.end();
        response.end();
    })
    
    
    
  });
}).listen(80);



