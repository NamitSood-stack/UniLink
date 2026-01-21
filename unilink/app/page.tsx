import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/Footer";
import { Users, Ticket, MessageCircle, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden pt-32 pb-24">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-neutral-100 via-neutral-50 to-white rounded-full blur-3xl opacity-60" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm text-neutral-600 shadow-sm">
                <Sparkles className="h-4 w-4 text-neutral-400" />
                <span>Built for students, by students</span>
              </div>

              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl md:text-7xl">
                Find your team.
                <br />
                <span className="text-neutral-400">Build something great.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-neutral-600 leading-relaxed">
                Connect with students who share your passion. Collaborate on projects,
                learn new skills, and create portfolio-worthy work together.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/signup"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/20"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-6 py-3.5 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-50 hover:border-neutral-300"
                >
                  Browse Projects
                </Link>
              </div>

              <div className="mt-16 flex items-center gap-8 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-neutral-200 to-neutral-300"
                      />
                    ))}
                  </div>
                  <span>2,000+ students</span>
                </div>
                <div className="h-4 w-px bg-neutral-200" />
                <span>500+ projects completed</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                Everything you need to collaborate
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
                Simple tools that help you find teammates and build projects together.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="group rounded-2xl border border-neutral-200 bg-white p-8 transition-all hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-200/50">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">Skill-Based Matching</h3>
                <p className="mt-3 text-neutral-600 leading-relaxed">
                  Find teammates with complementary skills. Our matching system connects you with
                  students who have what you need and need what you have.
                </p>
              </div>

              <div className="group rounded-2xl border border-neutral-200 bg-white p-8 transition-all hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-200/50">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                  <Ticket className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">Project Tickets</h3>
                <p className="mt-3 text-neutral-600 leading-relaxed">
                  Post your project idea or browse existing ones. Each ticket shows required skills,
                  team size, and project timeline at a glance.
                </p>
              </div>

              <div className="group rounded-2xl border border-neutral-200 bg-white p-8 transition-all hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-200/50">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">Real-Time Chat</h3>
                <p className="mt-3 text-neutral-600 leading-relaxed">
                  Communicate instantly with your team. Share ideas, coordinate tasks, and keep
                  everyone aligned without leaving the platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-3xl bg-neutral-900 px-8 py-16 text-center sm:px-16">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Ready to start collaborating?
              </h2>
              <p className="mt-4 text-lg text-neutral-400">
                Join thousands of students building their future together.
              </p>
              <Link
                href="/signup"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-100"
              >
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
