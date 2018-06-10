var http = require('http');

class HttpHandler {
    put(options, data) {
        options.method = "PUT";
        return this.handle(options, data);
    }
    post(options, data) {
        options.method = "POST";
        return this.handle(options, data);
    }
    handle(options, data) {
        return new Promise((resolve, reject) => {
            let req = http.request(options, (res) => {
                console.log(`STATUS: ${res.statusCode}`);
                if (res.statusCode !== 200) {
                    console.log(res.statusMessage);
                    reject(res.statusMessage);
                } else {
                    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
                    res.setEncoding('utf8');
                    let returnData = '';
                    res.on('data', (chunk) => {
                        returnData += chunk;
                        console.log(`BODY: ${chunk}`);
                    });
                    res.on('end', () => {
                        console.log('No more data in response.');
                        resolve(returnData);
                    });
                }
            });

            req.on('error', (err) => {
                console.error(`problem with request: ${err.message}`);
                reject(err);
            });

            req.write(data);
            req.end();
        });
    }
    get(url) {
        return new Promise((resolve, reject) => {
            http.get(url, (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    console.log(JSON.parse(data).explanation);
                    resolve(data);
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
                reject(err);
            });
        });
    }
}

module.exports = HttpHandler;
// const options = {
//     hostname: 'www.google.com',
//     port: 80,
//     path: '/upload',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Length': Buffer.byteLength(postData)
//     }
// };
