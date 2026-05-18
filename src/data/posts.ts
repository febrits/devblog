import type { BlogPost } from '../types';

export const posts: BlogPost[] = [
  {
    id: 'react-19-new-features',
    title: 'React 19: The Features That Actually Change How You Code',
    excerpt:
      'A practical breakdown of React 19\'s most impactful features — Server Components, Actions, use() hook, and the new compiler. No fluff, just what matters.',
    content: `# React 19: The Features That Actually Change How You Code

React 19 isn't just an incremental update — it fundamentally shifts how we think about building React applications. After spending weeks with the stable release, here are the features that genuinely changed my day-to-day coding.

## Server Components Go Mainstream

Server Components are no longer experimental. They're the default mental model for data-heavy components. The key insight: **you don't ship component code to the client if it doesn't need interactivity**.

\`\`\`jsx
// This runs on the server. Zero client JS.
async function BlogPost({ id }) {
  const post = await db.post.findUnique({ where: { id } });
  return <article>{post.title}</article>;
}
\`\`\`

The beauty is that Server Components can be async and talk directly to your database or API — no useEffect, no loading states.

## Actions: Form Handling, Simplified

Remember writing \`onSubmit\` handlers with \`e.preventDefault()\`, manual loading states, and optimistic updates? Actions replace all of that:

\`\`\`jsx
function CommentForm() {
  async function addComment(formData) {
    'use server';
    const comment = formData.get('comment');
    await db.comment.create({ data: { comment } });
  }

  return (
    <form action={addComment}>
      <textarea name="comment" />
      <button type="submit">Post</button>
    </form>
  );
}
\`\`\`

## The use() Hook

The \`use()\` hook lets you read resources (promises, context) conditionally — something you couldn't do before:

\`\`\`jsx
function Comments({ commentsPromise }) {
  // Suspends until the promise resolves
  const comments = use(commentsPromise);
  return comments.map(c => <div key={c.id}>{c.text}</div>);
}
\`\`\`

## Automatic Memoization via the Compiler

The new React Compiler automatically memoizes components and values. This means **you can delete most of your \`useMemo\` and \`useCallback\` calls**. The compiler analyzes your code at build time and inserts memoization where React's heuristic would bail out.

## My Honest Take

Not everything is perfect. Server Components introduce a mental split between "server" and "client" code that takes time to internalize. The \`'use server'\` directive feels a bit magical at first. But overall, React 19 removes ceremony and lets you focus on features.

**Bottom line:** If you're starting a new React project, go with React 19 and forget the old patterns. The ergonomics improvement is significant.`,
    date: '2025-01-15',
    tags: ['React', 'JavaScript', 'Frontend'],
    readTime: 6,
  },
  {
    id: 'tailwind-css-v4-guide',
    title: 'Tailwind CSS v4: What\'s New and Why It\'s a Big Deal',
    excerpt:
      'Tailwind CSS v4 introduces a CSS-first configuration, Oxide engine, and first-class Vite plugin. Here\'s everything you need to migrate and what to watch out for.',
    content: `# Tailwind CSS v4: What's New and Why It's a Big Deal

Tailwind CSS v4 represents the biggest architectural shift since Tailwind v3. The internals have been rewritten from the ground up, and the DX improvements are immediately noticeable.

## Goodbye tailwind.config.js, Hello CSS Config

The most visible change: **configuration lives in CSS, not JavaScript**. Your \`tailwind.config.js\` is replaced by CSS-native theme definitions:

\`\`\`css
@import "tailwindcss";

@theme {
  --color-brand: #8b5cf6;
  --font-display: "Inter", sans-serif;
  --breakpoint-3xl: 1920px;
}
\`\`\`

This isn't just syntax sugar. CSS-first config means your theme values participate in the CSS cascade, work with CSS tooling, and don't require a build step for configuration.

## Oxide Engine: 10x Faster Builds

The new Oxide engine (written in Rust) replaces PostCSS. In real-world projects:

- **Full builds:** 3-5x faster
- **Incremental builds:** Up to 10x faster
- **Memory usage:** Significantly reduced

Hot reload in development feels nearly instant on even large codebates.

## First-Class Vite Plugin

Instead of the PostCSS workaround, v4 ships a dedicated Vite plugin:

\`\`\`ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
\`\`\`

This enables features that weren't possible with the PostCSS approach, like faster HMR and better source maps.

## Container Queries, Native

Container queries are built-in — no \`@container\` plugin needed:

\`\`\`html
<div class="@container">
  <div class="@lg:text-xl @lg:flex-row">
    <!-- Adapts based on container, not viewport -->
  </div>
</div>
\`\`\`

## Migration Notes

- **Plugin ecosystem:** Not all plugins are updated yet. Check compatibility before migrating.
- **\`content\` array:** No longer needed — v4 auto-detects template files.
- **Some utilities renamed:** Check the migration guide for details.

The bottom line? Tailwind v4 feels like the version the team wanted to build all along. The CSS-first approach is more intuitive, the speed is transformative, and the modern CSS features (container queries, cascade layers, custom properties as API) make it feel future-proof.`,
    date: '2025-02-08',
    tags: ['CSS', 'Tailwind', 'Frontend'],
    readTime: 7,
  },
  {
    id: 'typescript-strict-mode-guide',
    title: 'TypeScript Strict Mode: A Survival Guide for React Developers',
    excerpt:
      'Turning on \`strict: true\` in tsconfig.json will break your build. Here\'s a practical guide to fixing every error you\'ll encounter and why it\'s worth it.',
    content: `# TypeScript Strict Mode: A Survival Guide for React Developers

I turned on strict mode in a 200k-line React codebase. Within 15 minutes, TypeScript found 847 errors. Within a week, it had caught three bugs that would have made it to production. Here's how to make the transition.

## What Strict Mode Actually Enables

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
}
\`\`\`

This is shorthand for: \`strictNullChecks\`, \`strictFunctionTypes\`, \`strictBindCallApply\`, \`strictPropertyInitialization\`, \`noImplicitAny\`, \`noImplicitThis\`, and \`alwaysStrict\`. The big ones are \`strictNullChecks\` and \`noImplicitAny\`.

## Error #1: Object is Possibly 'undefined'

This is the most common error by far:

\`\`\`ts
// ❌ Error: Object is possibly 'undefined'
function getUserName(user?: User) {
  return user.name;
}

// ✅ Fix it with proper narrowing
function getUserName(user?: User) {
  return user?.name ?? 'Anonymous';
}
\`\`\`

## Error #2: Parameter Has an 'any' Implicit Type

\`\`\`ts
// ❌ Error: Parameter 'e' implicitly has an 'any' type
const handleChange = (e) => {
  console.log(e.target.value);
};

// ✅ Be explicit about event types
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};
\`\`\`

## Error #3: Type 'null' is Not Assignable

\`\`\`ts
// ❌ Error after adding state
const [user, setUser] = useState<User>(null);

// ✅ Allow null in the type
const [user, setUser] = useState<User | null>(null);
\`\`\`

## Error #4: Props Not Matching Interface

\`\`\`ts
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
}

// ❌ Missing required props
<Button />

// ✅ Provide all required props
<Button variant="primary" onClick={() => {}} />
\`\`\`

## The Payoff

After the initial pain, strict mode pays for itself many times over:

1. **Refactoring becomes safe** — rename a prop and TypeScript shows every usage
2. **Bugs caught at compile time** — null checks, missing props, wrong types
3. **Better IDE experience** — autocomplete actually knows what's available
4. **Self-documenting code** — types serve as living documentation

**My recommendation:** Turn on strict mode in new projects from day one. For existing projects, enable it incrementally — fix one category of errors at a time. The investment pays for itself within the first sprint.`,
    date: '2025-02-22',
    tags: ['TypeScript', 'React', 'Best Practices'],
    readTime: 8,
  },
  {
    id: 'modern-css-layout-techniques',
    title: 'Modern CSS Layout Techniques Every Developer Should Know in 2025',
    excerpt:
      'Stop reaching for CSS frameworks for layout. Subgrid, container queries, :has(), and modern flexbox/grid patterns can handle 95% of your layout needs with pure CSS.',
    content: `# Modern CSS Layout Techniques Every Developer Should Know in 2025

CSS has evolved dramatically. Many patterns that required JavaScript or complex hacks are now solvable with pure CSS. Here are the techniques I use daily.

## The Holy Grail Layout (Without the Struggle)

\`\`\`css
.page {
  display: grid;
  grid-template: auto 1fr auto / 250px 1fr;
  min-height: 100vh;
}

header { grid-column: 1 / -1; }
aside   { grid-row: 2; }
main    { grid-row: 2; }
footer  { grid-column: 1 / -1; }
\`\`\`

That's it. No floats, no flexbox hacks, no absolute positioning.

## Subgrid: The Feature We've Been Waiting For

Subgrid lets nested grid items align with the parent grid:

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3; /* spans image + title + description */
}
\`\`\`

This solves the age-old problem of card headers and footers not aligning across cards of different content heights.

## Container Queries: Component-Responsive Design

Instead of media queries (which respond to the viewport), container queries respond to the parent container:

\`\`\`css
.card-wrapper {
  container-type: inline-size;
}

.card {
  display: grid;
  gap: 1rem;
}

@container (min-width: 400px) {
  .card {
    grid-template-columns: 150px 1fr;
  }
}
\`\`\`

This means a card component can adapt its layout based on where it's placed — sidebar vs. main content — without knowing anything about the page layout.

## :has() — The "Parent Selector" (Finally)

\`\`\`css
/* Style a form differently when it contains invalid fields */
form:has(:invalid) {
  border-color: red;
}

/* Style a card differently when it has an image */
.card:has(img) {
  padding-top: 0;
}
\`\`\`

## The Intrinsic Sizing Revolution

\`\`\`css
/* Text wrapping that actually works */
h1 {
  text-wrap: balance;
}

/* Prevent orphan words */
p {
  text-wrap: pretty;
}
\`\`\`

## Practical Advice

1. **Start with Grid for page layout** — it's the most powerful layout tool CSS has
2. **Use Flexbox for component-level layout** — nav bars, button groups, inline items
3. **Reach for container queries** when building reusable components
4. **Use subgrid** when you need alignment across nested items
5. **Drop the framework** for layout — CSS can handle it natively now

The modern CSS layout toolkit is incredibly powerful. Most developers I talk to are still using techniques from 2015. It's time to level up.`,
    date: '2025-03-10',
    tags: ['CSS', 'Frontend', 'Design'],
    readTime: 7,
  },
  {
    id: 'api-design-best-practices',
    title: 'REST API Design Best Practices: Lessons from Building Production APIs',
    excerpt:
      'After building and maintaining APIs serving millions of requests, here are the patterns that actually matter — naming, versioning, error handling, pagination, and more.',
    content: `# REST API Design Best Practices: Lessons from Building Production APIs

I've designed and maintained REST APIs that handle millions of requests per day. The difference between a good API and a great one isn't the technology — it's the design decisions. Here's what I've learned.

## Naming Conventions Matter More Than You Think

\`\`\`http
# ❌ Inconsistent and vague
GET /getUsers
POST /createNewUser
DELETE /user/delete/123

# ✅ Consistent and predictable
GET    /users
POST   /users
DELETE /users/123
\`\`\`

Rules:
- **Use plural nouns** for resources (\`/users\`, not \`/user\`)
- **Use HTTP methods** for actions (GET, POST, PATCH, DELETE)
- **Never put verbs in URLs** — the HTTP method is the verb
- **Use kebab-case** for multi-word paths (\`/order-items\`)

## Versioning: Do It From Day One

\`\`\`http
# URL path versioning (my preference)
GET /v1/users

# Or via header
Accept: application/vnd.myapp.v1+json
\`\`\`

Versioning from the start means you can make breaking changes without disrupting existing clients. I've seen too many teams skip this and regret it.

## Error Handling: Be Consistent and Helpful

\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      },
      {
        "field": "password",
        "message": "Must be at least 8 characters"
      }
    ],
    "request_id": "req_abc123"
  }
}
\`\`\`

Key principles:
- **Always return structured errors** — never plain text
- **Include a machine-readable error code** for programmatic handling
- **Include a request ID** for debugging
- **Use appropriate HTTP status codes** (400, 401, 403, 404, 409, 422, 500)

## Pagination: Cursor-Based Wins at Scale

\`\`\`http
# Offset pagination (simple, but breaks at scale)
GET /users?page=3&limit=20

# Cursor pagination (recommended)
GET /users?limit=20&cursor=eyJpZCI6MTAwfQ==
\`\`\`

Cursor pagination is stable (no duplicate/missing items when data changes) and performant (no OFFSET in SQL).

## Filtering, Sorting, and Field Selection

\`\`\`http
GET /users
  ?status=active
  &role=admin
  &sort=-created_at
  &fields=id,name,email
  &limit=20
  &cursor=abc123
\`\`\`

- **Filter** with query parameters
- **Sort** with a \`sort\` param, prefix with \`-\` for descending
- **Select fields** with a \`fields\` param to reduce payload size

## Rate Limiting: Tell Clients What's Happening

\`\`\`http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1710000000
\`\`\`

Always include rate limit headers. When clients exceed limits, return \`429 Too Many Requests\` with a \`Retry-After\` header.

## The Meta-Principle

**Be consistent.** Whatever patterns you choose, apply them everywhere. An API that's 90% consistent is 100% confusing. Your future self (and your API consumers) will thank you.`,
    date: '2025-03-25',
    tags: ['API', 'Backend', 'Best Practices'],
    readTime: 9,
  },
];
