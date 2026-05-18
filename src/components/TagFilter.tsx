import clsx from 'clsx';

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export default function TagFilter({ tags, selectedTag, onSelectTag }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectTag(null)}
        className={clsx(
          'px-3 py-1.5 text-xs font-medium rounded-full border transition-colors',
          selectedTag === null
            ? 'bg-accent text-white border-accent'
            : 'bg-dark-surface text-text-secondary border-dark-border hover:border-accent/50 hover:text-text-primary'
        )}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelectTag(tag)}
          className={clsx(
            'px-3 py-1.5 text-xs font-medium rounded-full border transition-colors',
            selectedTag === tag
              ? 'bg-accent text-white border-accent'
              : 'bg-dark-surface text-text-secondary border-dark-border hover:border-accent/50 hover:text-text-primary'
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
