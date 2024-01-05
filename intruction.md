https://dev.twitch.tv/console

ID Cliente: ykfpn8moa28x9rmvextzcywouytu5o
Secret Key: df9s0ajff76u29ij04wustnjnt90jt

https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=ykfpn8moa28x9rmvextzcywouytu5o&redirect_uri=http://localhost:3000&scope=chat:read+chat:edit+channel:manage:broadcast&state=c3ab8aa609ea11e793ae92361f002671

code: fuie2h85dew88xdga035bknil16j7t

curl -X POST 'https://id.twitch.tv/oauth2/token' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'client_id=ykfpn8moa28x9rmvextzcywouytu5o&client_secret=df9s0ajff76u29ij04wustnjnt90jt&code=fuie2h85dew88xdga035bknil16j7t&grant_type=authorization_code&redirect_uri=http://localhost:3000'

RESPUESTA
{"access_token":"rocjreb5n2murxow2tcawtun5c9mrs","expires_in":14433,"refresh_token":"9nucwpwvpqfgglhlpgz3aod9zpt7c0ta440jzhr3x2tazzrr7x","scope":["channel:manage:broadcast","chat:edit","chat:read"],"token_type":"bearer"}



https://id.twitch.tv/oauth2/authorize?client_id=ykfpn8moa28x9rmvextzcywouytu5o&redirect_uri=http://localhost:3000&response_type=token&scope=chat:read+chat:edit+channel:moderate


https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=60xdja3y8iy87xmwm27spsliedd4cs&redirect_uri=http://localhost&scope=channel:manage:broadcast


