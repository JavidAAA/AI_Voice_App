import type { ReactNode } from "react";
import { Providers } from "~/components/providers";
import { Sparkles, Mic, Zap, Target } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className="auth-page flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 lg:flex lg:w-1/2">
          <div className="bg-grid-white/[0.1] absolute inset-0 bg-[size:30px_30px]" />
          <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
            {/* Logo */}
            <Link
              href="/"
              className="mb-12 flex cursor-pointer items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/20 backdrop-blur-sm">
                <Sparkles className="h-7 w-7 text-violet-300" />
              </div>
              <span className="text-2xl font-bold text-violet-50">
                AI Voice Studio
              </span>
            </Link>

            {/* Hero Content */}
            <div className="max-w-md">
              <h1 className="mb-6 text-4xl leading-tight font-bold text-violet-50 xl:text-5xl">
                Transform Text into{" "}
                <span className="text-violet-200">Natural Speech</span>
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-violet-100/90">
                Join thousands of creators using advanced AI to generate
                realistic, natural-sounding voices in seconds.
              </p>

              {/* Feature List */}
              <div className="space-y-4">
                {[
                  {
                    icon: Mic,
                    text: "AI Voice Cloning",
                    color:
                      "bg-emerald-500/20 border-emerald-400/30 text-emerald-300",
                  },
                  {
                    icon: Zap,
                    text: "Lightning Fast Processing",
                    color: "bg-amber-500/20 border-amber-400/30 text-amber-300",
                  },
                  {
                    icon: Target,
                    text: "Professional Quality Audio",
                    color: "bg-pink-500/20 border-pink-400/30 text-pink-300",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border backdrop-blur-sm ${feature.color}`}
                    >
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-violet-100">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-200">10K+</div>
                <div className="text-sm text-violet-300/70">
                  Voices Generated
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-200">2.5K+</div>
                <div className="text-sm text-violet-300/70">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-300">4.8★</div>
                <div className="text-sm text-violet-300/70">Rating</div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-violet-400/20 blur-3xl" />
          <div className="absolute right-32 bottom-20 h-24 w-24 rounded-full bg-pink-400/15 blur-2xl" />
          <div className="absolute top-1/2 right-10 h-16 w-16 rounded-full bg-indigo-400/20 blur-xl" />
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex flex-1 flex-col justify-center bg-gradient-to-br from-slate-50 to-violet-50/30 px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 text-center lg:hidden">
              <Link
                href="/"
                className="inline-flex cursor-pointer items-center gap-2"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                  AI Voice Studio
                </span>
              </Link>
            </div>

            {/* Auth Form Container */}
            <div>{children}</div>

            {/* Footer Link */}
            <p className="mt-6 text-center text-sm text-slate-600">
              Back to{" "}
              <Link
                href="/"
                className="cursor-pointer font-medium text-violet-600 transition-colors hover:text-violet-500"
              >
                homepage
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Providers>
  );
}
