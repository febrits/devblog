import { useParams, Link, Navigate } from 'react-router-dom';
import { format } from 'date-fns';
import { posts } from '../data/posts';

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const contentLines = post.content.split('\n');

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to posts
      </Link>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-3 text-sm text-text-muted mb-4">
            <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent-light rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose-custom">
          {contentLines.map((line, i) => {
            if (line.startsWith('# ')) {
              return (
                <h2 key={i} className="text-2xl font-bold text-text-primary mt-10 mb-4">
                  {line.slice(2)}
                </h2>
              );
            }
            if (line.startsWith('## ')) {
              return (
                <h3 key={i} className="text-xl font-semibold text-text-primary mt-8 mb-3">
                  {line.slice(3)}
                </h3>
              );
            }
            if (line.startsWith('```')) {
              return null; // handled by code block logic below
            }
            if (line.startsWith('- **')) {
              const match = line.match(/^- \*\*(.+?)\*\*(.*)/);
              if (match) {
                return (
                  <li key={i} className="text-text-secondary ml-4 mb-1 list-disc list-inside">
                    <strong className="text-text-primary">{match[1]}</strong>
                    {match[2]}
                  </li>
                );
              }
            }
            if (line.startsWith('- ')) {
              return (
                <li key={i} className="text-text-secondary ml-4 mb-1 list-disc list-inside">
                  {line.slice(2)}
                </li>
              );
            }
            if (line.trim() === '') {
              return <div key={i} className="h-3" />;
            }
            // Handle inline code and bold
            const formatted = line
              .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-dark-surface text-accent-light rounded text-sm font-mono">$1</code>')
              .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-text-primary font-semibold">$1</strong>');
            return (
              <p
                key={i}
                className="text-text-secondary leading-relaxed mb-2"
                dangerouslySetInnerHTML={{ __html: formatted }}
              />
            );
          })}
        </div>

        {/* Render code blocks */}
        {(() => {
          const elements: React.ReactNode[] = [];
          let inCodeBlock = false;
          let codeLines: string[] = [];
          let codeKey = 0;

          contentLines.forEach((line) => {
            if (line.startsWith('```')) {
              if (inCodeBlock) {
                elements.push(
                  <pre
                    key={`code-${codeKey++}`}
                    className="bg-dark-surface border border-dark-border rounded-lg p-4 my-4 overflow-x-auto"
                  >
                    <code className="text-sm font-mono text-text-secondary leading-relaxed">
                      {codeLines.join('\n')}
                    </code>
                  </pre>
                );
                codeLines = [];
                inCodeBlock = false;
              } else {
                inCodeBlock = true;
              }
            } else if (inCodeBlock) {
              codeLines.push(line);
            }
          });

          return elements;
        })()}
      </article>
    </div>
  );
}
