import openai
import os
import time
import requests
import subprocess

# Read the text file containing the prompt
with open("prompt.txt", "r") as file:
    prompt = file.read()

# Send the prompt to OpenAI
openai.api_key = "KEY"
response = openai.Completion.create(
    engine="text-davinci-003",
    prompt=prompt,
    max_tokens=800,
    n=1,
    stop=None,
    temperature=0.5,
)

#img
def generate_image(prompt):
    model_engine = "image-alpha-001"
    response = requests.post(
        f"https://api.openai.com/v1/images/generations",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {openai.api_key}"
        },
        json={
            "model": model_engine,
            "prompt": prompt,
            "num_images":1,
            "size":"1024x1024"
        }
    )

    if response.status_code == 200:
        image = response.json()["data"][0]["url"]
        image_response = requests.get(image)
        with open("generated_image.jpg", "wb") as f:
            f.write(image_response.content)
        return True
    else:
        print(f"Failed to generate image. Response: {response.text}")
        return False


# Convert the response to speech using gTTS
from gtts import gTTS
response_text = response["choices"][0]["text"]
speech = gTTS(response_text)
speech.save("response.mp3")

# Play the response using VLC
import vlc
player = vlc.MediaPlayer("response.mp3")
if player.get_state() != vlc.State.Playing:
    generate_image(prompt)
    player.play()

#player.play()
#generate_image(prompt)
while True:
    if player.get_state() == vlc.State.Ended:
        break
