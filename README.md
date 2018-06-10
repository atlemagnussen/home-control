# Telldus Tellstick Znet Lite v2

curl -i -d app="Example app" -X PUT http://0.0.0.0/api/token
HTTP/1.1 200 OK
Date: Fri, 15 Jan 2016 13:33:54 GMT
Content-Length: 148
Content-Type: text/html;charset=utf-8
Server: CherryPy/3.8.0

{
  "authUrl": "http://0.0.0.0/api/authorize?token=0996b21ee3f74d2b99568d8207a8add9",
  "token": "0996b21ee3f74d2b99568d8207a8add9"
}
