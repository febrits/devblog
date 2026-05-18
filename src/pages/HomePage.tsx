import { useState, useMemo } from 'react';
import { posts } from '../data/posts';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        search === '' ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase());

      const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [search, selectedTag]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Welcome to DevBlog
        </h1>
        <p className="text-text-secondary">
          Thoughts on web development, from someone who ships code for a living.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <SearchBar value={search} onChange={setSearch} />
        <TagFilter tags={allTags} selectedTag={selectedTag} onSelectTag={setSelectedTag} />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-text-muted text-lg">No posts found.</p>
          <p className="text-text-muted text-sm mt-1">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
