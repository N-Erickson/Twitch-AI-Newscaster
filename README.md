# twitch-ai-newscaster
Listens for a command in a Twitch Channels chat, sends to OpenAI API, generate vocalized response.

Originally a fork from https://github.com/Pedrolian/twitch-obs-scene-changer
But has become its own thing. 

### Prerequisites
* [NodeJS](https://nodejs.org/en/) - NodeJS v.10
* [OBS-Websocket Plugin](https://obsproject.com/forum/resources/obs-websocket-remote-control-of-obs-studio-made-easy.466/)
* [OpenAI API Key](https://platform.openai.com/account/api-keys)

### Installing
Run npm install to download dependencies.
```
npm install
```
Install VLC player
https://www.videolan.org/vlc/

Configure OBS.
```
Tools -> Websocket server settings
Check "Enable Websocket server"
Check "Enable authentication"
Enter a password
```

Configure .env file
```
TWITCH_CHANNEL="" // <-- Your twitch username
OPENAI_API_KEY="KEY"

OBS_URL="localhost:4444" // <-- OBS Plugin url. "localhost:4444" is the default url:port if connecting to OBS locally and using default port in plugin
OBS_PASSWORD="" // <-- OBS Plugin password
```

Configure line 11 on dynamic.js if you want to use the "!scene <scene name>" command to a different command name
```
const COMMAND_NAME = "!scene"; // Command to type in chat.
```

Configure OpenAI API key in text_to_speech.py
```
openai.api_key = "KEY"
```


To run dynamic.js in cmd promt / terminal
```
node dynamic.js
```
