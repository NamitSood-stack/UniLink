export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="mx-auto max-w-7xl px-6 text-center text-neutral-400">
        <p>&copy; {new Date().getFullYear()} UniLink. All rights reserved.</p>
      </div>
    </footer>
  );
}
