import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import type { BlogPost } from '../types';

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      to={`/post/${post.id}`}
      className="block bg-dark-card border border-dark-border rounded-xl p-6 hover:border-accent/40 hover:bg-dark-hover transition-all duration-200 group"
    >
      <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
        <time dateTime={post.date}>{format(new Date(post.date), 'MMM d, yyyy')}</time>
        <span>·</span>
        <span>{post.readTime} min read</span>
      </div>
      <h2 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors mb-2">
        {post.title}
      </h2>
      <p className="text-text-secondary text-sm leading-relaxed mb-4">
        {post.excerpt}
      </p>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-medium bg-accent/10 text-accent-light rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
