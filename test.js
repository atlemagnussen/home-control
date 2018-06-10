const HttpHandler = require('./HttpHandler.js');
const serverIp = "192.168.1.10";
let httpHandler = new HttpHandler();

var options = {
    host: serverIp,
    path: 'api/token',
    port: 80,
};
var data = `app="Atle home app"`;

httpHandler.put(options, data)
.then(res => {
    console.log(res);
    console.log(JSON.stringify(res));
    if (res && res.token) {
        return `http://${serverIp}/api/token?token=${res.token}`;
    }
    return "no token";
}, err => {
    console.log(err);
    return "no token";
})
.then(retval => {
    if (retval === "no token") {
        console.error("got no token");
    } else {
        return httpHandler.get(retval);
    }
})
.then(res => {
    console.log(res);
    console.log(JSON.stringify(res));
    if(res && res.token) {
        return `${serverIp}/api/devices/list?supportedMethods=3 -H "Authorization: Bearer ${res.token}`;
    } else {
        return "no token";
    }
})
.then(retval => {
    if (retval === "no token") {
        console.error("got no token");
    } else {
        return httpHandler.get(retval);
    }
})
.then(res => {
    console.log(res);
    console.log(JSON.stringify(res));
});
