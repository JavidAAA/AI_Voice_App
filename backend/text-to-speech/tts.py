import io
import os
import sys
from typing import Optional
import uuid

import modal 

from pydantic import BaseModel 

import torch
import torchaudio

app = modal.App("ai-voice-studio-sahand")

image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install("numpy==1.26.0", "torch==2.6.0")
    .pip_install_from_requirements("requirements.txt")
    .apt_install("ffmpeg")
)

volume = modal.Volume.from_name("hf-cache-ai-voice-studio", create_if_missing=True)

s3_secret = modal.Secret.from_name("ai-voice-studio-aws-secret")

class TextToSpeechRequest(BaseModel):
    text: str
    voice_s3_key: Optional[str] = None
    language: str = "en"
    exaggeration: float = 0.5
    cfg_weight: float = 0.5


class TextToSpeechResponse(BaseModel):
    s3_Key: str

@app.cls(
    image=image,
    gpu="L40S",
    volumes={
        "/root/.cache/huppingface": volume,
        "/s3-mount": modal.CloudBucketMount("ai-voice-studio-sahand", secret=s3_secret)
    },
    scaledown_window=120,
    secrets=[s3_secret]
)

class TextToSpeachServer:
    @modal.enter()
    def load_model(self):
        from chatterbox.mtl_tts import ChatterboxMultilingualTTS
        self.model = ChatterboxMultilingualTTS.from_pretrained(device="cuda")

    @modal.fastapi_endpoint(method="POST", requires_proxy_auth=True)
    def generate_speech(self, request: TextToSpeechRequest) -> TextToSpeechResponse:
        with torch.no_grad():
            if request.voice_s3_key:
                audio_prompt_path = f"/s3-mount/{request.voice_s3_key}"

                if not os.path.exists(audio_prompt_path):
                    raise FileNotFoundError(
                        f"Prompt audio not found at {audio_prompt_path}")
                wav = self.model.generate(
                    request.text, 
                    audio_prompt_path=audio_prompt_path,
                    language_id=request.language,
                    exaggeration=request.exaggeration,
                    cfg_weight=request.cfg_weight
                )
            else:
                wav = self.model.generate(
                    request.text,
                    language_id=request.language,
                    exaggeration=request.exaggeration,
                    cfg_weight=request.cfg_weight
                )
            wav_cpu = wav.cpu()

        # Convert the audio tensor to WAV format bytes
        buffer = io.BytesIO()  # Create an in-memory buffer
        torchaudio.save(buffer, wav_cpu, self.model.sr, format="wav")  # Save as WAV
        buffer.seek(0)  # Reset buffer position to start
        audio_bytes = buffer.read()  # Read all bytes            


        audio_uuid = str(uuid.uuid4())  
        s3_key = f"tts/{audio_uuid}.wav"


        s3_path = f"/s3-mount/{s3_key}" 
        os.makedirs(os.path.dirname(s3_path), exist_ok=True)
        with open(s3_path, "wb") as f:
            f.write(audio_bytes)
        print(f"Saved audio to S3: {s3_key}")
        return TextToSpeechResponse(s3_Key=s3_key)
