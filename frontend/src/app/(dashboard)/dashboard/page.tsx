"use client";

import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui";
import {
  Loader2,
  Sparkles,
  Calendar,
  TrendingUp,
  Star,
  ArrowRight,
  Music,
  Mic,
  Settings,
} from "lucide-react";
import { authClient } from "~/lib/auth-client";
import { useEffect, useState } from "react";
import { getUserAudioProjects } from "~/actions/tts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

interface AudioProject {
  id: string;
  name: string | null;
  text: string;
  audioUrl: string;
  s3Key: string;
  language: string;
  voiceS3Key: string;
  exaggeration: number;
  cfgWeight: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserStats {
  totalAudioProjects: number;
  thisMonth: number;
  thisWeek: number;
}
export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [audioProjects, setAudioProjects] = useState<AudioProject[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalAudioProjects: 0,
    thisMonth: 0,
    thisWeek: 0,
  });
  const [user, setUser] = useState<{
    name?: string;
    createdAt?: string | Date;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const [sessionResult, audioResult] = await Promise.all([
          authClient.getSession(),
          getUserAudioProjects(),
        ]);

        if (sessionResult?.data?.user) {
          setUser(sessionResult.data.user);
        }

        if (audioResult.success && audioResult.audioProjects) {
          setAudioProjects(audioResult.audioProjects);
        }

        const audios = audioResult.audioProjects ?? [];

        const now = new Date();
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        setUserStats({
          totalAudioProjects: audios.length,
          thisMonth: audios.filter((p) => new Date(p.createdAt) >= thisMonth)
            .length,
          thisWeek: audios.filter((p) => new Date(p.createdAt) >= thisWeek)
            .length,
        });
      } catch (error) {
        console.error("Dashboard initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void initializeDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          <p className="text-muted-foreground text-sm">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <RedirectToSignIn />
      <SignedIn>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
              Welcome back{user?.name ? `, ${user.name}` : ""}!
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Here&apos;s an overview of your Text-to-Speech workspace
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Audio
                </CardTitle>
                <Music className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {userStats.totalAudioProjects}
                </div>
                <p className="text-muted-foreground text-xs">TTS generations</p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  This Month
                </CardTitle>
                <Calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {userStats.thisMonth}
                </div>
                <p className="text-muted-foreground text-xs">
                  Projects created
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {userStats.thisWeek}
                </div>
                <p className="text-muted-foreground text-xs">Recent activity</p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Member Since
                </CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {user?.createdAt
                    ? new Date(
                        user.createdAt as string | number | Date,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </div>
                <p className="text-muted-foreground text-xs">Account created</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-primary h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Button
                  onClick={() => router.push("/dashboard/create")}
                  className="group h-auto flex-col gap-2 bg-purple-600 p-6 hover:bg-purple-700"
                >
                  <Mic className="h-8 w-8 transition-transform group-hover:scale-110" />
                  <div className="text-center">
                    <div className="font-semibold">Text-to-Speech</div>
                    <div className="text-xs opacity-80">
                      Generate audio with voice cloning
                    </div>
                  </div>
                </Button>
                <Button
                  onClick={() => router.push("/dashboard/projects")}
                  variant="outline"
                  className="group hover:bg-muted h-auto flex-col gap-2 p-6"
                >
                  <Music className="h-8 w-8 transition-transform group-hover:scale-110" />
                  <div className="text-center">
                    <div className="font-semibold">View All Audio</div>
                    <div className="text-xs opacity-70">
                      Browse your audio library
                    </div>
                  </div>
                </Button>
                <Button
                  onClick={() => router.push("/dashboard/settings")}
                  variant="outline"
                  className="group hover:bg-muted h-auto flex-col gap-2 p-6"
                >
                  <Settings className="h-8 w-8 transition-transform group-hover:scale-110" />
                  <div className="text-center">
                    <div className="font-semibold">Account Settings</div>
                    <div className="text-xs opacity-70">
                      Manage your profile
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5 text-purple-600" />
                Recent Audio Projects
              </CardTitle>
              {audioProjects.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/dashboard/projects")}
                  className="text-purple-600 hover:text-purple-700"
                >
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {audioProjects.length === 0 ? (
                <>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="relative mb-4">
                      <div className="border-muted bg-muted/20 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed">
                        <Music className="text-muted-foreground h-8 w-8" />
                      </div>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">
                      No audio projects yet
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      Start generating speech with AI voice cloning
                    </p>
                    <Button
                      onClick={() => router.push("/dashboard/create")}
                      className="gap-2 bg-purple-600 hover:bg-purple-700"
                    >
                      <Mic className="h-4 w-4" />
                      Create Your First Audio
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    {audioProjects.slice(0, 5).map((audio) => (
                      <div
                        key={audio.id}
                        className="group hover:bg-muted/50 flex items-center gap-4 rounded-lg border p-4 transition-all hover:shadow-sm"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100">
                          <Music className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-sm font-medium">
                            {audio.name ??
                              audio.text.substring(0, 50) +
                                (audio.text.length > 50 ? "..." : "")}
                          </h4>
                          <div className="mt-1 flex items-center gap-2">
                            <p className="text-muted-foreground text-xs">
                              {audio.language.toUpperCase()}
                            </p>
                            <span className="text-muted-foreground text-xs">
                              •
                            </span>
                            <p className="text-muted-foreground text-xs">
                              {new Date(audio.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0">
                          <audio
                            src={audio.audioUrl}
                            controls
                            className="h-8"
                            style={{ width: "200px" }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </SignedIn>
    </>
  );
}
