"use client";

import { Music, Play, Download } from "lucide-react";
import { Button } from "~/components/ui/button";

import type { GeneratedAudio, Language } from "~/types/tts";

interface AudioHistoryProps {
  generatedAudios: GeneratedAudio[];
  languages: Language[];
  onPlay: (audio: GeneratedAudio) => void;
  onDownload: (audio: GeneratedAudio) => void;
}

export default function AudioHistory({
  generatedAudios,
  languages,
  onPlay,
  onDownload,
}: AudioHistoryProps) {
  return (
    <div className="border-t border-gray-200 bg-white px-2 py-3 sm:px-4 sm:py-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 text-center">
          <div className="mb-2 inline-flex items-center gap-2">
            <div className="h-6 w-0.5 rounded-full bg-gradient-to-b from-blue-500 to-purple-600"></div>
            <h2 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-xl font-bold text-transparent">
              Recent Generations
            </h2>
            <div className="h-6 w-0.5 rounded-full bg-gradient-to-b from-purple-600 to-blue-500"></div>
          </div>
          <p className="text-muted-foreground mx-auto max-w-md text-sm">
            Your speech generation history
          </p>
        </div>
        {generatedAudios.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {generatedAudios.map((audio, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                        <Music className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">
                          {
                            languages.find((l) => l.code === audio.language)
                              ?.name
                          }
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(audio.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="mb-3 line-clamp-3 text-xs text-gray-700">
                    {audio.text}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onPlay(audio)}
                      variant="outline"
                      size="sm"
                      className="h-7 flex-1 gap-1 px-2 text-xs"
                    >
                      <Play className="h-3 w-3" />
                      Play
                    </Button>
                    <Button
                      onClick={() => onDownload(audio)}
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 px-2 text-xs"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-16 text-center">
            <div className="relative mx-auto mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-blue-100 to-purple-100"></div>
              </div>
              <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-white shadow-lg">
                <Music className="h-10 w-10 text-gray-400" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">
                No generations yet
              </h3>
              <p className="text-muted-foreground mx-auto max-w-md text-lg leading-relaxed">
                Start by entering some text and generating your first speech
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
