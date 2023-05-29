# twitch-ai-newscaster
Listens for a command in a Twitch Channels chat, sends to OpenAI API, generate vocalized response.

Originally a fork from https://github.com/Pedrolian/twitch-obs-scene-changer
But has become its own thing. 

This will listen to a twitch channel's chat for the !talk command. It will take everything after that and send it to OpenAI's API. The response will be saved in a text file, then converted to speech and automatically played back. 

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

  
## Create Elements and Configure OBS
  
I created the background images, logos, and presenter images with Midjourney
  https://www.midjourney.com/
  
  
To animate them, I used D-ID
  https://www.d-id.com/
  
  
Create an animated face at rest, and a second video of text to speech.  Alternatively you could create a paid account and connect requests to the D-ID API. 
  
Create a scene in OBS at rest and a Scene with the speaking face. 
  
Configure OBS to change scenes when sound is active. 
  
![Settings](/advSceneswitch.PNG "Settings")
  


https://github.com/N-Erickson/Twitch-AI-Newscaster/assets/16261609/ba15a541-f8d3-4e5a-b532-59bfe13aff8a

