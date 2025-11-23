"use client";

import { X, Download } from "lucide-react";

import { Card, CardContent } from "~/components/ui/card";

import { Button } from "~/components/ui/button";

import type { GeneratedAudio } from "~/types/tts";

interface TextInputProps {
  text: string;
  setText: (text: string) => void;
  currentAudio: GeneratedAudio | null;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  onDownload: (audio: GeneratedAudio) => void;
}

export default function TextInput({
  text,
  setText,
  currentAudio,
  audioRef,
  onDownload,
}: TextInputProps) {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-2 sm:p-3">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="mb-0.5 text-sm font-bold">Your Text</h3>
            <p className="text-muted-foreground text-xs">
              Enter the text you want to convert to speech
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here... Maximum 500 characters."
            maxLength={500}
            rows={8}
            className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{text.length}/500 characters</span>
            {text.length > 0 && (
              <Button
                onClick={() => setText("")}
                variant="ghost"
                size="sm"
                className="h-6 gap-1 px-2"
              >
                <X className="h-3 w-3" />
                Clear
              </Button>
            )}
          </div>
          {currentAudio && (
            <div className="rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-xs font-bold text-blue-900">
                  Latest Generation
                </h4>
                <Button
                  onClick={() => onDownload(currentAudio)}
                  variant="ghost"
                  size="sm"
                  className="h-6 gap-1 px-2 text-blue-700 hover:bg-blue-100"
                >
                  <Download className="h-3 w-3" />
                  <span className="text-xs">Download</span>
                </Button>
              </div>
              <p className="mb-2 text-xs text-blue-800">
                {currentAudio.text.substring(0, 100)}
                {currentAudio.text.length > 100 && "..."}
              </p>
              <div className="rounded-md bg-white/50 p-2">
                <audio
                  ref={audioRef}
                  controls
                  className="w-full"
                  style={{ height: "32px" }}
                  key={currentAudio.s3_key}
                >
                  <source src={currentAudio.audioUrl} type="audio/wav" />
                </audio>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
