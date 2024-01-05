https://dev.twitch.tv/console

ID Cliente: ykfpn8moa28x9rmvextzcywouytu5o
Secret Key: df9s0ajff76u29ij04wustnjnt90jt

https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=ykfpn8moa28x9rmvextzcywouytu5o&redirect_uri=http://localhost:3000&scope=chat:read+chat:edit&state=c3ab8aa609ea11e793ae92361f002671

code: w1v6ci5qkegfa74eeos2699bad82n2

curl -X POST 'https://id.twitch.tv/oauth2/token' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'client_id=ykfpn8moa28x9rmvextzcywouytu5o&client_secret=df9s0ajff76u29ij04wustnjnt90jt&code=w1v6ci5qkegfa74eeos2699bad82n2&grant_type=authorization_code&redirect_uri=http://localhost:3000'

RESPUESTA
{"access_token":"yn0u9yslq9w7r42wzih60ktclpoy3b","expires_in":13889,"refresh_token":"r8rfgvix4cl2256nn417emr95wawbj0133kvf3fq12zocz0yen","scope":["chat:edit","chat:read"],"token_type":"bearer"}



https://id.twitch.tv/oauth2/authorize?client_id=ykfpn8moa28x9rmvextzcywouytu5o&redirect_uri=http://localhost:3000&response_type=token&scope=chat:read+chat:edit+channel:moderate



