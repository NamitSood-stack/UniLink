import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full">
      {/* TOP CONTACT STRIP */}
      <div className="bg-white border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-10 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Heard enough?
            </p>
            <h2 className="text-4xl font-semibold text-black mt-2">
              Contact us
            </h2>
            <div className="w-16 h-0.5 bg-yellow-400 mt-3" />
          </div>

          <Link
            href="/contact"
            className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-black text-2xl hover:scale-105 transition"
          >
            →
          </Link>
        </div>
      </div>

      {/* DARK FOOTER */}
      <div className="bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* LEFT */}
          <div>
            <h3 className="text-2xl font-semibold leading-snug">
              Your gateway to <br /> opportunity
            </h3>
          </div>

          {/* CENTER */}
          <div className="text-sm text-neutral-300 space-y-3">
            <p>
              <span className="block uppercase text-xs text-neutral-400">
                Contact
              </span>
              contact@unilink.app
            </p>
            <p>+91 98765 43210</p>
            <p>Chitkara University, Rajpura, Punjab</p>

            <Link
              href="https://www.google.com/maps?q=Chitkara+University+Rajpura+Punjab"
              target="_blank"
              className="inline-block mt-2 underline underline-offset-4 hover:text-yellow-400 transition"
            >
              See on map →
            </Link>
          </div>

          {/* RIGHT */}
          <div>
            <p className="uppercase text-xs tracking-widest text-neutral-400 mb-4">
              Follow us
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.linkedin.com"
                target="_blank"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-yellow-400 hover:text-yellow-400 transition"
              >
                in
              </Link>

              <Link
                href="https://www.instagram.com"
                target="_blank"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-yellow-400 hover:text-yellow-400 transition"
              >
                ig
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM LINE */}
        <div className="border-t border-white/10 py-6 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} UniLink. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
