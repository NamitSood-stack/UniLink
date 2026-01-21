import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { Plus, FolderOpen, Users, Clock, ArrowRight, LucideIcon } from "lucide-react";

interface Project {
    id: number;
    title: string;
    description: string;
    status: "active" | "completed";
    lastActive: string;
    skills: string[];
    members: number;
    maxMembers: number;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Eco-friendly Packaging",
        description: "Developing sustainable packaging solutions for local businesses using biodegradable materials.",
        status: "active",
        lastActive: "2h ago",
        skills: ["Design", "Sustainability", "Research"],
        members: 3,
        maxMembers: 5,
    },
    {
        id: 2,
        title: "Community Garden App",
        description: "A platform to coordinate local gardening efforts and share surplus produce with neighbors.",
        status: "active",
        lastActive: "5h ago",
        skills: ["React", "Node.js", "UI/UX"],
        members: 4,
        maxMembers: 4,
    },
    {
        id: 3,
        title: "Student Mentorship",
        description: "Connecting senior students with freshmen to help them navigate university life.",
        status: "completed",
        lastActive: "2d ago",
        skills: ["Leadership", "Communication"],
        members: 2,
        maxMembers: 2,
    },
];

const StatCard = ({ icon: Icon, value, label }: { icon: LucideIcon; value: string | number; label: string }) => (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
                <Icon className="h-6 w-6 text-neutral-600" />
            </div>
            <div>
                <p className="text-2xl font-semibold text-neutral-900">{value}</p>
                <p className="text-sm text-neutral-600">{label}</p>
            </div>
        </div>
    </div>
);

const ProjectCard = ({ project }: { project: Project }) => (
    <div className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-200/50">
        <div className="mb-4 flex items-start justify-between">
            <div
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${project.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-600"
                    }`}
            >
                {project.status === "active" ? "Active" : "Completed"}
            </div>
            <span className="text-xs text-neutral-500">{project.lastActive}</span>
        </div>

        <h3 className="mb-2 text-lg font-semibold text-neutral-900">{project.title}</h3>
        <p className="mb-4 text-sm text-neutral-600 line-clamp-2">{project.description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
            {project.skills.map((skill) => (
                <span key={skill} className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
                    {skill}
                </span>
            ))}
        </div>

        <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
            <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                    {Array.from({ length: project.members }).map((_, i) => (
                        <div
                            key={i}
                            className="h-7 w-7 rounded-full border-2 border-white bg-gradient-to-br from-neutral-200 to-neutral-300"
                        />
                    ))}
                </div>
                <span className="text-xs text-neutral-500">
                    {project.members}/{project.maxMembers}
                </span>
            </div>
            <button className="flex items-center gap-1 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
                View
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
        </div>
    </div>
);

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-neutral-50">
            <Navbar />

            <main className="mx-auto max-w-7xl px-6 pt-24 pb-16">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Dashboard</h1>
                        <p className="mt-1 text-sm text-neutral-600">Welcome back! Here&apos;s an overview of your projects.</p>
                    </div>
                    <Link
                        href="/projects"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                    >
                        <Plus className="h-4 w-4" />
                        New Project
                    </Link>
                </div>

                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                    <StatCard icon={FolderOpen} value={3} label="Active Projects" />
                    <StatCard icon={Users} value={12} label="Team Members" />
                    <StatCard icon={Clock} value={1} label="Completed" />
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-neutral-900">Your Projects</h2>
                    <Link href="/projects" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                        View all
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </main>
        </div>
    );
}