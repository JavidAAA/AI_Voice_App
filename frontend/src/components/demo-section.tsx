"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Play, Pause, Sparkles } from "lucide-react";
import Link from "next/link";
export default function DemoSection() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const naturalSpeechSamples = [
    {
      id: "friendly-female",
      text: "Hi there! I'm excited to help you create amazing voice content today.",
      voiceType: "Friendly Female",
      audioUrl: "/audio/friendly-female.wav",
    },
    {
      id: "news-anchor",
      text: "Introducing the next generation of refreshment. Duff Beer just got bolder, smoother, and brewed to perfection.",
      voiceType: "Stewie Voice Clone",
      audioUrl: "/audio/duff_stewie.wav",
    },
    {
      id: "conan-protest",
      text: "So I want you to get up now. I want all of you to get up out of your chairs. I want you to go to the window, open it, and stick your head out and yell 'I'M MAD AS HELL!",
      voiceType: "Conan Voice - Passionate Protest",
      audioUrl: "/audio/network_conan.wav",
    },
  ];

  const multilingualSamples = [
    {
      id: "hindi",
      language: "Indian 🇮🇳",
      text: "नमस्कार! हमारे मंच पर आपका स्वागत है।",
      audioUrl: "/audio/hindi.wav",
    },
    {
      id: "spanish",
      language: "Spanish 🇪🇸",
      text: "¡Hola! Bienvenido a nuestra plataforma.",
      audioUrl: "/audio/spanish.wav",
    },
    {
      id: "french",
      language: "French 🇫🇷",
      text: "Bonjour! Bienvenue sur notre plateforme.",
      audioUrl: "/audio/french.wav",
    },
    {
      id: "japanese",
      language: "Japanese 🇯🇵",
      text: "こんにちは！私たちのプラットフォームへようこそ。",
      audioUrl: "/audio/japanese.wav",
    },
  ];

  const handlePlay = (id: string, audioUrl: string) => {
    if (playingId === id) {
      const audio = document.getElementById(id) as HTMLAudioElement;
      audio?.pause();
      setPlayingId(null);
      return;
    }

    if (playingId) {
      const currentAudio = document.getElementById(
        playingId,
      ) as HTMLAudioElement;
      currentAudio?.pause();
      currentAudio.currentTime = 0;
    }

    const audio = document.getElementById(id) as HTMLAudioElement;
    if (audio) {
      audio
        .play()
        .then(() => {
          setPlayingId(id);
        })
        .catch((error) => {
          console.error("Audio playback failed:", error);
          alert(
            "Unable to play audio. Please check the audio file or try generating your own speech in the dashboard!",
          );
        });

      audio.onended = () => {
        setPlayingId(null);
      };

      audio.onerror = () => {
        setPlayingId(null);
      };
    }
  };
  return (
    <section className="bg-gradient-to-br from-indigo-50/50 to-cyan-50/30 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            Experience the{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Difference
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Listen to real examples of our AI voice technology in action
          </p>
        </div>
        <div className="mb-16">
          <h3 className="mb-6 text-center text-2xl font-semibold text-slate-800">
            Natural & Expressive Speech
          </h3>
          <Card className="overflow-hidden border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Text Sample
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Voice Type
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                      Audio Output
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {naturalSpeechSamples.map((sample) => (
                    <tr key={sample.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 text-sm text-slate-600">
                        &ldquo;{sample.text}&rdquo;
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">
                        {sample.voiceType}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
                            onClick={() =>
                              handlePlay(sample.id, sample.audioUrl)
                            }
                          >
                            {playingId === sample.id ? (
                              <>
                                <Pause className="h-4 w-4" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4" />
                                Play
                              </>
                            )}
                          </Button>
                          {sample.audioUrl && (
                            <audio
                              id={sample.id}
                              src={sample.audioUrl}
                              preload="metadata"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        {/* Multilingual Support Demo */}
        <div>
          <h3 className="mb-6 text-center text-2xl font-semibold text-slate-800">
            Multilingual Support
          </h3>
          <Card className="overflow-hidden border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Language
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Text Sample
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                      Audio Output
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {multilingualSamples.map((sample) => (
                    <tr key={sample.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">
                        {sample.language}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        &ldquo;{sample.text}&rdquo;
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
                            onClick={() =>
                              handlePlay(sample.id, sample.audioUrl)
                            }
                          >
                            {playingId === sample.id ? (
                              <>
                                <Pause className="h-4 w-4" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4" />
                                Play
                              </>
                            )}
                          </Button>
                          {sample.audioUrl && (
                            <audio
                              id={sample.id}
                              src={sample.audioUrl}
                              preload="metadata"
                              crossOrigin="anonymous"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <div className="mt-12 text-center">
          <p className="mb-6 text-slate-600">
            Ready to create your own AI-generated voices?
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="cursor-pointer gap-2 bg-gradient-to-r from-indigo-500 to-cyan-600 hover:from-indigo-600 hover:to-cyan-700"
            >
              <Sparkles className="h-5 w-5" />
              Try It Free Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
