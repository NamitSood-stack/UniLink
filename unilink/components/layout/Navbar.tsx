"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();

    // Don't show navbar on auth pages
    const isAuthPage = pathname === "/login" || pathname === "/signup";
    if (isAuthPage) return null;

    // Check if we're on dashboard/app pages
    const isDashboard = pathname?.startsWith("/dashboard") ||
        pathname?.startsWith("/projects") ||
        pathname?.startsWith("/profile");

    // Landing page navbar
    if (!isDashboard) {
        return (
            <nav className="flex items-center justify-between px-8 py-4 border-b border-neutral-200/50 bg-neutral-900 backdrop-blur-sm">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={150}
                        height={100}
                        className="object-contain"
                        priority
                    />
                </Link>

                <div className="flex gap-6 text-sm">
                    <Link
                        href="/signup"
                        className="px-4 py-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-all duration-200"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>
        );
    }

    // Dashboard navbar
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
                    <Link
                        href="/dashboard"
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${pathname === "/dashboard"
                            ? "bg-neutral-100 text-neutral-900"
                            : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                            }`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/projects"
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${pathname === "/projects"
                            ? "bg-neutral-100 text-neutral-900"
                            : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                            }`}
                    >
                        Projects
                    </Link>
                    <Link
                        href="/profile"
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${pathname === "/profile"
                            ? "bg-neutral-100 text-neutral-900"
                            : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                            }`}
                    >
                        Profile
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                    >
                        Sign Out
                    </Link>
                </div>
            </div>
        </nav>
    );
}
