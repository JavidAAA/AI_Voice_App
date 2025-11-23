export interface GeneratedAudio {
  s3_key: string;
  audioUrl: string;
  text: string;
  language: string;
  timestamp: Date;
}


export interface VoiceFile {
  name: string;
  s3_key: string;
}

export interface UploadedVoice {
  id: string;
  name: string;
  s3Key: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface Language {
  code: string;
  name: string;
  flag: string;
}