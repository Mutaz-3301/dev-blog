export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  image?: string;
  imageAlt?: string;
  author: string;
  category: string;

  likes: number;
  dislikes: number;
  views: number;
  comments: Comment[];
  tags: string[];
}

export interface Comment {
  id: string;
  postSlug: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  likes: number;
  replies: Reply[];
}

export interface Reply {
  id: string;
  commentId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface PostInteraction {
  postSlug: string;
  userEmail: string;
  type: "like" | "dislike" | "save";
  createdAt: string;
}

const postInteractions: PostInteraction[] = [];

const blogPosts: BlogPost[] = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js 15",
    date: "July 28, 2025",
    description:
      "A comprehensive guide to setting up your first Next.js 15 project with the App Router.",
    content: `
      <p>Next.js 15 brings exciting new features and improvements, especially with the App Router. This guide will walk you through the initial setup.</p>
      <h2>Project Initialization</h2>
      <p>To start a new Next.js project, use the following command:</p>
      <pre><code>npx create-next-app@latest my-blog-app</code></pre>
      <p>Follow the prompts, ensuring you select 'Yes' for TypeScript, ESLint, Tailwind CSS, and the App Router.</p>
      <h2>App Router Basics</h2>
      <p>The App Router introduces a new file-system based routing paradigm. Pages are defined by <code>page.tsx</code> files inside route segments (folders).</p>
      <p>For example, <code>app/dashboard/page.tsx</code> will be accessible at <code>/dashboard</code>.</p>
      <h3>Server Components</h3>
      <p>By default, components in the App Router are Server Components. This means they render on the server, reducing client-side JavaScript and improving initial page load performance. You can opt into Client Components by adding <code>"use client";</code> at the top of your file.</p>
      <h2>Data Fetching</h2>
      <p>In Server Components, you can directly fetch data using <code>async/await</code>. Next.js automatically caches data fetches, but you can control caching behavior with options like <code>{ cache: 'no-store' }</code> or <code>{ next: { revalidate: 60 } }</code>.</p>
      <p>This blog post is a great example of how to structure content within a Next.js application.</p>
    `,
    image: "/placeholder.svg?height=400&width=800",
    imageAlt: "Abstract Next.js background",
    author: "Mutaz",
    category: "Next.js",
    likes: 42,
    dislikes: 3,
    views: 1250,
    comments: [
      {
        id: "1",
        postSlug: "getting-started-with-nextjs",
        authorName: "John Doe",
        authorEmail: "john@example.com",
        content:
          "Great tutorial! This helped me get started with Next.js 15 quickly.",
        createdAt: "2025-07-29T10:30:00Z",
        likes: 5,
        replies: [
          {
            id: "1-1",
            commentId: "1",
            authorName: "Mutaz",
            authorEmail: "mutaz@gmail.com",
            content: "Thank you! I'm glad it was helpful.",
            createdAt: "2025-07-29T11:00:00Z",
            likes: 2,
          },
        ],
      },
    ],
    tags: ["Next.js", "React", "Tutorial", "Web Development"],
  },
  {
    slug: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS for Rapid UI Development",
    date: "July 20, 2025",
    description:
      "Unlock the power of utility-first CSS to build beautiful and responsive interfaces quickly.",
    content: `
      <p>Tailwind CSS is a utility-first CSS framework that allows you to build custom designs directly in your HTML.</p>
      <h2>Why Tailwind CSS?</h2>
      <p>Unlike traditional CSS frameworks that come with pre-designed components, Tailwind provides low-level utility classes that let you build completely custom designs without ever leaving your HTML.</p>
      <p>For example, to make text bold and large, you'd use:</p>
      <pre><code>&lt;p class="font-bold text-lg"&gt;Hello Tailwind!&lt;/p&gt;</code></pre>
      <h2>Responsive Design</h2>
      <p>Tailwind makes responsive design incredibly easy with its responsive prefixes. For instance, <code>md:text-xl</code> means the text will be 'xl' size on medium screens and up.</p>
      <p>This approach leads to highly optimized CSS and faster development cycles.</p>
    `,
    image: "/placeholder.svg?height=400&width=800",
    imageAlt: "Tailwind CSS abstract pattern",
    author: "Ahmed",
    category: "CSS",
    likes: 38,
    dislikes: 2,
    views: 890,
    comments: [],
    tags: ["Tailwind CSS", "CSS", "Design", "Frontend"],
  },
  {
    slug: "integrating-shadcn-ui",
    title: "Integrating shadcn/ui into Your Next.js Project",
    date: "July 15, 2025",
    description:
      "Learn how to easily add beautiful, accessible UI components to your Next.js application.",
    content: `
      <p>shadcn/ui is a collection of re-usable components that you can copy and paste into your apps. It's not a component library in the traditional sense, but rather a set of well-designed, accessible components built with Radix UI and Tailwind CSS.</p>
      <h2>Installation</h2>
      <p>After setting up your Next.js project with Tailwind CSS, you can initialize shadcn/ui:</p>
      <pre><code>npx shadcn@latest init</code></pre>
      <p>Then, add components:</p>
      <pre><code>npx shadcn@latest add button card</code></pre>
      <h2>Usage</h2>
      <p>Once added, you can import and use components like any other React component:</p>
      <pre><code>import { Button } from "@/components/ui/button";</code></pre>
      <p>This approach gives you full control over the components, allowing for easy customization.</p>
    `,
    image: "/placeholder.svg?height=400&width=800",
    imageAlt: "shadcn/ui components abstract",
    author: "Ali",
    category: "UI/UX",
    likes: 29,
    dislikes: 1,
    views: 654,
    comments: [],
    tags: ["shadcn/ui", "UI Components", "React", "Design System"],
  },
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function addBlogPost(newPost: BlogPost) {
  blogPosts.push(newPost);
  console.log("New post added (in-memory):", newPost.title);
}


export function togglePostInteraction(
  postSlug: string,
  userEmail: string,
  type: "like" | "dislike" | "save"
): boolean {
  const existingInteraction = postInteractions.find(
    (interaction) =>
      interaction.postSlug === postSlug &&
      interaction.userEmail === userEmail &&
      interaction.type === type
  );

  if (existingInteraction) {
    
    const index = postInteractions.indexOf(existingInteraction);
    postInteractions.splice(index, 1);

    
    const post = getBlogPostBySlug(postSlug);
    if (post) {
      if (type === "like") post.likes--;
      else if (type === "dislike") post.dislikes--;
    }
    return false;
  } else {
    
    postInteractions.push({
      postSlug,
      userEmail,
      type,
      createdAt: new Date().toISOString(),
    });

    
    if (type === "like" || type === "dislike") {
      const oppositeType = type === "like" ? "dislike" : "like";
      const oppositeInteraction = postInteractions.find(
        (interaction) =>
          interaction.postSlug === postSlug &&
          interaction.userEmail === userEmail &&
          interaction.type === oppositeType
      );
      if (oppositeInteraction) {
        const index = postInteractions.indexOf(oppositeInteraction);
        postInteractions.splice(index, 1);

        const post = getBlogPostBySlug(postSlug);
        if (post) {
          if (oppositeType === "like") post.likes--;
          else if (oppositeType === "dislike") post.dislikes--;
        }
      }
    }

    
    const post = getBlogPostBySlug(postSlug);
    if (post) {
      if (type === "like") post.likes++;
      else if (type === "dislike") post.dislikes++;
    }
    return true;
  }
}

export function getUserInteraction(
  postSlug: string,
  userEmail: string,
  type: "like" | "dislike" | "save"
): boolean {
  return postInteractions.some(
    (interaction) =>
      interaction.postSlug === postSlug &&
      interaction.userEmail === userEmail &&
      interaction.type === type
  );
}

export function addComment(
  postSlug: string,
  authorName: string,
  authorEmail: string,
  content: string
): Comment {
  const newComment: Comment = {
    id: Date.now().toString(),
    postSlug,
    authorName,
    authorEmail,
    content,
    createdAt: new Date().toISOString(),
    likes: 0,
    replies: [],
  };

  const post = getBlogPostBySlug(postSlug);
  if (post) {
    post.comments.push(newComment);
  }

  return newComment;
}

export function addReply(
  commentId: string,
  authorName: string,
  authorEmail: string,
  content: string
): Reply | null {
  const newReply: Reply = {
    id: Date.now().toString(),
    commentId,
    authorName,
    authorEmail,
    content,
    createdAt: new Date().toISOString(),
    likes: 0,
  };

 
  for (const post of blogPosts) {
    const comment = post.comments.find((c) => c.id === commentId);
    if (comment) {
      comment.replies.push(newReply);
      return newReply;
    }
  }

  return null;
}

export function incrementPostViews(postSlug: string): void {
  const post = getBlogPostBySlug(postSlug);
  if (post) {
    post.views++;
  }
}


function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
