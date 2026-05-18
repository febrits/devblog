export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-text-primary mb-6">About</h1>

      <div className="bg-dark-card border border-dark-border rounded-xl p-8 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-2xl">
            🦉
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">DevBlog</h2>
            <p className="text-text-muted text-sm">Web development insights</p>
          </div>
        </div>

        <div className="space-y-4 text-text-secondary leading-relaxed">
          <p>
            DevBlog is a space for practical, no-nonsense articles about web development.
            We cover everything from frontend frameworks to API design, with a focus on
            patterns and techniques that work in real production environments.
          </p>
          <p>
            Every article here is written by someone who's shipped and maintained code
            at scale. No tutorial fluff — just lessons learned from building things that
            actually work.
          </p>
        </div>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl p-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Topics We Cover</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['React', 'TypeScript', 'CSS', 'JavaScript', 'API Design', 'Best Practices', 'Frontend', 'Backend', 'Performance'].map(
            (topic) => (
              <div
                key={topic}
                className="px-4 py-2.5 bg-dark-surface border border-dark-border rounded-lg text-sm text-text-secondary text-center hover:border-accent/40 transition-colors"
              >
                {topic}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
