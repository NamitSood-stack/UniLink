import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b">
            <Link href="http://localhost:3000/" className="flex items-center">
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
                <Link href="/connect" className="px-4 py-2 rounded-full text-white 
             hover:text-orange-500 hover:bg-white/10 
             transition-all duration-200">
                    Connect
                </Link>
                <Link href="/about" className="px-4 py-2 rounded-full text-white 
             hover:text-orange-500 hover:bg-white/10 
             transition-all duration-200" >
                    About Us
                </Link>
                <Link href="/auth" className="px-4 py-2 rounded-full text-white 
             hover:text-orange-500 hover:bg-white/10 
             transition-all duration-200">
                    Sign In
                </Link>
                <Link href="/auth" className="px-4 py-2 rounded-full text-white 
             hover:text-orange-500 hover:bg-white/10 
             transition-all duration-200">
                    Sign Up
                </Link>
            </div>
        </nav>
    );
}

