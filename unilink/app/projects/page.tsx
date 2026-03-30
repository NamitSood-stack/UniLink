"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Plus,
    Search,
    X,
    ArrowLeft,
    Mail,
    Phone,
    Linkedin,
    Trash2,
    ChevronDown,
    Users,
    Lightbulb,
    BookOpen,
    Briefcase,
    Clock,
    Tag,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type TicketType = "Collaboration" | "Hiring" | "Idea Partner" | "Learning";
export type Availability =
    | "Flexible"
    | "Part-time (5–10 hrs/week)"
    | "Part-time (10–20 hrs/week)"
    | "Full-time";

export interface Ticket {
    id: string;
    title: string;
    type: TicketType;
    description: string;
    skills: string[];
    availability: Availability;
    author: string;
    initials: string;
    postedAt: string;
    contact: {
        email: string;
        phone: string;
        linkedin: string;
    };
    isMine?: boolean;
}

// ─── Constants ───────────────────────────────────────────────────────────────

export const TICKET_TYPES: TicketType[] = [
    "Collaboration",
    "Hiring",
    "Idea Partner",
    "Learning",
];

export const AVAILABILITY_OPTIONS: Availability[] = [
    "Flexible",
    "Part-time (5–10 hrs/week)",
    "Part-time (10–20 hrs/week)",
    "Full-time",
];

export const SKILLS = [
    "React", "Node.js", "Python", "TypeScript", "PostgreSQL",
    "MongoDB", "Firebase", "TensorFlow", "FastAPI", "React Native",
    "Flutter", "AWS", "Docker", "Figma", "UI/UX", "Machine Learning",
    "Next.js", "GraphQL", "Tailwind CSS", "DevOps",
];

const TYPE_STYLES: Record<TicketType, { bg: string; text: string; icon: React.ReactNode }> = {
    Collaboration: {
        bg: "bg-blue-50 text-blue-700",
        text: "text-blue-700",
        icon: <Users className="h-3 w-3" />,
    },
    Hiring: {
        bg: "bg-emerald-50 text-emerald-700",
        text: "text-emerald-700",
        icon: <Briefcase className="h-3 w-3" />,
    },
    "Idea Partner": {
        bg: "bg-amber-50 text-amber-700",
        text: "text-amber-700",
        icon: <Lightbulb className="h-3 w-3" />,
    },
    Learning: {
        bg: "bg-purple-50 text-purple-700",
        text: "text-purple-700",
        icon: <BookOpen className="h-3 w-3" />,
    },
};

// ─── Seed data ────────────────────────────────────────────────────────────────

const SEED_TICKETS: Ticket[] = [
    {
        id: "1",
        title: "Need a UI/UX designer for EdTech app",
        type: "Collaboration",
        description:
            "Building a learning platform for rural students. Looking for someone who can create intuitive, accessible interfaces. We have the backend ready — just need design help and someone who cares about the problem.",
        skills: ["UI/UX", "Figma"],
        availability: "Part-time (10–20 hrs/week)",
        author: "Arjun Singh",
        initials: "AS",
        postedAt: "2h ago",
        contact: {
            email: "arjun@chitkara.edu",
            phone: "+91 98100 12345",
            linkedin: "linkedin.com/in/arjunsingh",
        },
    },
    {
        id: "2",
        title: "ML engineer for plant disease detection",
        type: "Collaboration",
        description:
            "Working on an AI model to identify crop diseases from smartphone photos. Need someone experienced with TensorFlow or PyTorch. Exciting agri-tech project with real-world impact.",
        skills: ["Machine Learning", "Python", "TensorFlow"],
        availability: "Part-time (5–10 hrs/week)",
        author: "Priya Nair",
        initials: "PN",
        postedAt: "5h ago",
        contact: {
            email: "priya.nair@example.com",
            phone: "+91 97300 55678",
            linkedin: "linkedin.com/in/priyanair",
        },
    },
    {
        id: "3",
        title: "Flutter dev for community garden app",
        type: "Hiring",
        description:
            "Have a working React web version and want to extend it as a mobile app. Looking for someone to join as a co-founder / tech lead. Equity-based for now with revenue-sharing once we scale.",
        skills: ["Flutter", "Firebase", "React Native"],
        availability: "Part-time (10–20 hrs/week)",
        author: "Meera Joshi",
        initials: "MJ",
        postedAt: "1d ago",
        contact: {
            email: "meera.j@gmail.com",
            phone: "",
            linkedin: "linkedin.com/in/meerajoshi",
        },
    },
    {
        id: "4",
        title: "Looking for a co-founder with business acumen",
        type: "Idea Partner",
        description:
            "I have a solid technical background and a product idea in the fintech space. Need someone who can handle market research, investor pitching, and GTM. Let's build together — I write code, you write decks.",
        skills: [],
        availability: "Flexible",
        author: "Ravi Kumar",
        initials: "RK",
        postedAt: "2d ago",
        contact: {
            email: "ravi.k@startup.in",
            phone: "+91 96200 99001",
            linkedin: "",
        },
    },
    {
        id: "5",
        title: "AWS certification study group",
        type: "Learning",
        description:
            "Preparing for AWS Solutions Architect exam. Want to form a small group (3–4 people) to study together, share notes, and do mock tests. Starting next week, flexible timing.",
        skills: ["AWS", "DevOps"],
        availability: "Flexible",
        author: "Sneha Reddy",
        initials: "SR",
        postedAt: "3d ago",
        contact: {
            email: "sneha.reddy@edu.in",
            phone: "+91 90001 77432",
            linkedin: "linkedin.com/in/snehareddy",
        },
    },
    {
        id: "6",
        title: "React + Node.js dev for volunteer platform",
        type: "Collaboration",
        description:
            "Building a platform that connects NGOs with volunteers. Currently solo, need a full-stack developer who cares about social good. Open source, with room to grow into a nonprofit product.",
        skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
        availability: "Part-time (5–10 hrs/week)",
        author: "Kabir Mehta",
        initials: "KM",
        postedAt: "4d ago",
        contact: {
            email: "kabir.m@devs.org",
            phone: "",
            linkedin: "linkedin.com/in/kabirmehta",
        },
    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Navbar() {
    const pathname = usePathname();
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200/80 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900">
                        <span className="text-sm font-bold text-white">U</span>
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-neutral-900">UniLink</span>
                </Link>
                <div className="flex items-center gap-1">
                    {[
                        { href: "/dashboard", label: "Dashboard" },
                        { href: "/projects", label: "Projects" },
                        { href: "/profile", label: "Profile" },
                    ].map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${pathname === href
                                    ? "bg-neutral-100 text-neutral-900"
                                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
                <Link
                    href="/"
                    className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                    Sign Out
                </Link>
            </div>
        </nav>
    );
}

function TypeBadge({ type }: { type: TicketType }) {
    const style = TYPE_STYLES[type];
    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${style.bg}`}>
            {style.icon}
            {type}
        </span>
    );
}

function InitialsAvatar({ initials }: { initials: string }) {
    return (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-xs font-medium text-neutral-600 border border-neutral-200">
            {initials}
        </div>
    );
}

function TicketCard({
    ticket,
    onContact,
    onDelete,
    isMine = false,
}: {
    ticket: Ticket;
    onContact: (t: Ticket) => void;
    onDelete?: (id: string) => void;
    isMine?: boolean;
}) {
    return (
        <div className="group flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:border-neutral-300 hover:shadow-md hover:shadow-neutral-100">
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-neutral-900 leading-snug">{ticket.title}</h3>
                <TypeBadge type={ticket.type} />
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3">{ticket.description}</p>

            {ticket.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {ticket.skills.map((skill) => (
                        <span
                            key={skill}
                            className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <Clock className="h-3 w-3" />
                {ticket.availability}
            </div>

            <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                <div className="flex items-center gap-2">
                    <InitialsAvatar initials={ticket.initials} />
                    <span className="text-xs text-neutral-500">{ticket.author}</span>
                    <span className="text-xs text-neutral-300">·</span>
                    <span className="text-xs text-neutral-400">{ticket.postedAt}</span>
                </div>
                <div className="flex items-center gap-2">
                    {isMine && onDelete && (
                        <button
                            onClick={() => onDelete(ticket.id)}
                            className="flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1 text-xs text-red-500 transition-colors hover:bg-red-50"
                        >
                            <Trash2 className="h-3 w-3" />
                            Delete
                        </button>
                    )}
                    <button
                        onClick={() => onContact(ticket)}
                        className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:border-neutral-300"
                    >
                        Contact
                    </button>
                </div>
            </div>
        </div>
    );
}

function ContactPanel({
    ticket,
    onBack,
}: {
    ticket: Ticket;
    onBack: () => void;
}) {
    const hasContact =
        ticket.contact.email || ticket.contact.phone || ticket.contact.linkedin;

    return (
        <div className="mx-auto max-w-lg">
            <button
                onClick={onBack}
                className="mb-6 inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to tickets
            </button>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="mb-5">
                    <TypeBadge type={ticket.type} />
                    <h2 className="mt-3 text-lg font-semibold text-neutral-900">{ticket.title}</h2>
                    <p className="mt-1 text-sm text-neutral-500">
                        Posted by {ticket.author} · {ticket.postedAt}
                    </p>
                </div>

                <p className="mb-5 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-5">
                    {ticket.description}
                </p>

                {ticket.skills.length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-1.5">
                        {ticket.skills.map((s) => (
                            <span key={s} className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                                {s}
                            </span>
                        ))}
                    </div>
                )}

                <div className="border-t border-neutral-100 pt-5">
                    <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-400">
                        Contact info
                    </p>
                    {hasContact ? (
                        <div className="space-y-3">
                            {ticket.contact.email && (
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100">
                                        <Mail className="h-4 w-4 text-neutral-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-400">Email</p>
                                        <p className="text-sm text-neutral-900">{ticket.contact.email}</p>
                                    </div>
                                </div>
                            )}
                            {ticket.contact.phone && (
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100">
                                        <Phone className="h-4 w-4 text-neutral-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-400">WhatsApp / Phone</p>
                                        <p className="text-sm text-neutral-900">{ticket.contact.phone}</p>
                                    </div>
                                </div>
                            )}
                            {ticket.contact.linkedin && (
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100">
                                        <Linkedin className="h-4 w-4 text-neutral-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-400">LinkedIn</p>
                                        <p className="text-sm text-neutral-900">{ticket.contact.linkedin}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-sm text-neutral-400">No contact info provided.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Create Ticket Form ───────────────────────────────────────────────────────

interface CreateFormProps {
    onSubmit: (ticket: Omit<Ticket, "id" | "author" | "initials" | "postedAt" | "isMine">) => void;
    onCancel: () => void;
}

function CreateTicketForm({ onSubmit, onCancel }: CreateFormProps) {
    const [title, setTitle] = useState("");
    const [type, setType] = useState<TicketType | "">("");
    const [description, setDescription] = useState("");
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState("");
    const [availability, setAvailability] = useState<Availability>("Flexible");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [error, setError] = useState("");

    const addSkill = (skill: string) => {
        if (skill && !selectedSkills.includes(skill)) {
            setSelectedSkills((prev) => [...prev, skill]);
        }
        setSkillInput("");
    };

    const removeSkill = (skill: string) =>
        setSelectedSkills((prev) => prev.filter((s) => s !== skill));

    const handleSubmit = () => {
        if (!title.trim() || !type || !description.trim() || !email.trim()) {
            setError("Please fill in all required fields (title, type, description, email).");
            return;
        }
        setError("");
        onSubmit({
            title: title.trim(),
            type: type as TicketType,
            description: description.trim(),
            skills: selectedSkills,
            availability,
            contact: {
                email: email.trim(),
                phone: phone.trim(),
                linkedin: linkedin.trim(),
            },
        });
    };

    return (
        <div className="mx-auto max-w-2xl">
            <button
                onClick={onCancel}
                className="mb-6 inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to tickets
            </button>

            <div className="rounded-2xl border border-neutral-200 bg-white p-8">
                <h2 className="mb-1 text-xl font-semibold text-neutral-900">Create a ticket</h2>
                <p className="mb-6 text-sm text-neutral-500">
                    Describe what you&apos;re looking for and let others reach out to you.
                </p>

                <div className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                            Ticket title <span className="text-red-500">*</span>
                        </label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Looking for a React developer for my startup idea"
                            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-colors"
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                            Type <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as TicketType | "")}
                                className="w-full appearance-none rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-colors bg-white"
                            >
                                <option value="">Select type</option>
                                {TICKET_TYPES.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            placeholder="Describe your project, what you're looking for, expected time commitment, goals, what's in it for them..."
                            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-colors resize-none"
                        />
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                            Skills needed
                        </label>
                        <div className="flex gap-2 mb-2">
                            <div className="relative flex-1">
                                <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                                <select
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    className="w-full appearance-none rounded-xl border border-neutral-200 py-3 pl-10 pr-4 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-colors bg-white"
                                >
                                    <option value="">Pick a skill</option>
                                    {SKILLS.filter((s) => !selectedSkills.includes(s)).map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={() => addSkill(skillInput)}
                                className="inline-flex items-center gap-1 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                Add
                            </button>
                        </div>
                        {selectedSkills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {selectedSkills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1 text-sm text-neutral-700"
                                    >
                                        {skill}
                                        <button
                                            onClick={() => removeSkill(skill)}
                                            className="text-neutral-400 hover:text-neutral-700 transition-colors"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Availability */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                            Availability needed
                        </label>
                        <div className="relative">
                            <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                            <select
                                value={availability}
                                onChange={(e) => setAvailability(e.target.value as Availability)}
                                className="w-full appearance-none rounded-xl border border-neutral-200 py-3 pl-10 pr-4 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-colors bg-white"
                            >
                                {AVAILABILITY_OPTIONS.map((a) => (
                                    <option key={a} value={a}>{a}</option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-neutral-100 pt-2">
                        <p className="mb-4 text-sm font-medium text-neutral-700">Your contact info</p>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl border border-neutral-200 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Phone + LinkedIn */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                                    WhatsApp / Phone
                                </label>
                                <div className="relative">
                                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                                    <input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+91 98765 43210"
                                        className="w-full rounded-xl border border-neutral-200 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                                    LinkedIn
                                </label>
                                <div className="relative">
                                    <Linkedin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                                    <input
                                        value={linkedin}
                                        onChange={(e) => setLinkedin(e.target.value)}
                                        placeholder="linkedin.com/in/you"
                                        className="w-full rounded-xl border border-neutral-200 py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            onClick={onCancel}
                            className="rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            Post Ticket
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type View = "list" | "create" | "contact";

export default function ProjectsPage() {
    const [view, setView] = useState<View>("list");
    const [activeTab, setActiveTab] = useState<"browse" | "mine">("browse");
    const [tickets, setTickets] = useState<Ticket[]>(SEED_TICKETS);
    const [myTickets, setMyTickets] = useState<Ticket[]>([]);
    const [contactTicket, setContactTicket] = useState<Ticket | null>(null);
    const [search, setSearch] = useState("");
    const [skillFilter, setSkillFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState<TicketType | "">("");

    const filteredTickets = useMemo(() => {
        return tickets.filter((t) => {
            const q = search.toLowerCase();
            const matchQ =
                !q ||
                t.title.toLowerCase().includes(q) ||
                t.description.toLowerCase().includes(q) ||
                t.skills.some((s) => s.toLowerCase().includes(q));
            const matchSkill = !skillFilter || t.skills.includes(skillFilter);
            const matchType = !typeFilter || t.type === typeFilter;
            return matchQ && matchSkill && matchType;
        });
    }, [tickets, search, skillFilter, typeFilter]);

    const handleCreate = (
        data: Omit<Ticket, "id" | "author" | "initials" | "postedAt" | "isMine">
    ) => {
        const newTicket: Ticket = {
            ...data,
            id: Date.now().toString(),
            author: "You",
            initials: "ME",
            postedAt: "just now",
            isMine: true,
        };
        setTickets((prev) => [newTicket, ...prev]);
        setMyTickets((prev) => [newTicket, ...prev]);
        setView("list");
        setActiveTab("mine");
    };

    const handleDelete = (id: string) => {
        setTickets((prev) => prev.filter((t) => t.id !== id));
        setMyTickets((prev) => prev.filter((t) => t.id !== id));
    };

    const handleContact = (ticket: Ticket) => {
        setContactTicket(ticket);
        setView("contact");
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            <Navbar />

            <main className="mx-auto max-w-7xl px-6 pt-24 pb-16">
                {/* ── Create view ── */}
                {view === "create" && (
                    <CreateTicketForm
                        onSubmit={handleCreate}
                        onCancel={() => setView("list")}
                    />
                )}

                {/* ── Contact view ── */}
                {view === "contact" && contactTicket && (
                    <ContactPanel
                        ticket={contactTicket}
                        onBack={() => setView("list")}
                    />
                )}

                {/* ── List view ── */}
                {view === "list" && (
                    <>
                        {/* Page header */}
                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                                    Project Tickets
                                </h1>
                                <p className="mt-1 text-sm text-neutral-500">
                                    Find collaborators, or post your requirements and let others reach out.
                                </p>
                            </div>
                            <button
                                onClick={() => setView("create")}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                            >
                                <Plus className="h-4 w-4" />
                                New Ticket
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="mb-6 flex border-b border-neutral-200">
                            {(["browse", "mine"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${activeTab === tab
                                            ? "border-neutral-900 text-neutral-900"
                                            : "border-transparent text-neutral-500 hover:text-neutral-900"
                                        }`}
                                >
                                    {tab === "browse" ? "Browse tickets" : "My tickets"}
                                    {tab === "mine" && myTickets.length > 0 && (
                                        <span className="ml-2 rounded-full bg-neutral-900 px-2 py-0.5 text-xs text-white">
                                            {myTickets.length}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Browse tab */}
                        {activeTab === "browse" && (
                            <>
                                {/* Filters */}
                                <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                                    <div className="relative flex-1">
                                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                                        <input
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search by keyword, skill, or description..."
                                            className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-colors"
                                        />
                                    </div>
                                    <div className="relative">
                                        <select
                                            value={skillFilter}
                                            onChange={(e) => setSkillFilter(e.target.value)}
                                            className="h-full appearance-none rounded-xl border border-neutral-200 bg-white py-2.5 pl-4 pr-9 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none transition-colors"
                                        >
                                            <option value="">All skills</option>
                                            {SKILLS.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                                    </div>
                                    <div className="relative">
                                        <select
                                            value={typeFilter}
                                            onChange={(e) => setTypeFilter(e.target.value as TicketType | "")}
                                            className="h-full appearance-none rounded-xl border border-neutral-200 bg-white py-2.5 pl-4 pr-9 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none transition-colors"
                                        >
                                            <option value="">All types</option>
                                            {TICKET_TYPES.map((t) => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                                    </div>
                                    {(search || skillFilter || typeFilter) && (
                                        <button
                                            onClick={() => { setSearch(""); setSkillFilter(""); setTypeFilter(""); }}
                                            className="inline-flex items-center gap-1 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                            Clear
                                        </button>
                                    )}
                                </div>

                                {filteredTickets.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-24 text-center">
                                        <div className="mb-3 text-3xl">🔍</div>
                                        <p className="text-sm font-medium text-neutral-700">No tickets found</p>
                                        <p className="mt-1 text-sm text-neutral-400">Try adjusting your filters</p>
                                    </div>
                                ) : (
                                    <>
                                        <p className="mb-4 text-xs text-neutral-400">
                                            {filteredTickets.length} ticket{filteredTickets.length !== 1 ? "s" : ""} found
                                        </p>
                                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {filteredTickets.map((ticket) => (
                                                <TicketCard
                                                    key={ticket.id}
                                                    ticket={ticket}
                                                    onContact={handleContact}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        )}

                        {/* My tickets tab */}
                        {activeTab === "mine" && (
                            <>
                                {myTickets.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-24 text-center">
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100">
                                            <Plus className="h-7 w-7 text-neutral-400" />
                                        </div>
                                        <p className="text-sm font-medium text-neutral-700">No tickets yet</p>
                                        <p className="mt-1 max-w-xs text-sm text-neutral-400">
                                            Post your first ticket to find the right collaborator, co-founder, or teammate.
                                        </p>
                                        <button
                                            onClick={() => setView("create")}
                                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                            New Ticket
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {myTickets.map((ticket) => (
                                            <TicketCard
                                                key={ticket.id}
                                                ticket={ticket}
                                                onContact={handleContact}
                                                onDelete={handleDelete}
                                                isMine
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
