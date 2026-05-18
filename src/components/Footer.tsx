export default function Footer() {
  return (
    <footer className="border-t border-dark-border mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} DevBlog. Built with React, TypeScript & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
