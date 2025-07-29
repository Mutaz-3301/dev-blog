import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { notFound } from "next/navigation"

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface PostPageProps {
  params: {
    id: string
  }
}


export default async function PostPage({ params }: PostPageProps) {
  const postId = params.id

  let post: Post | null = null
  let error: string | null = null

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)

    if (!response.ok) {
      if (response.status === 404) {
        notFound() 
      }
      throw new Error(`Failed to fetch post: ${response.statusText}`)
    }

    post = await response.json()
  } catch (err: any) {
    error = err.message || "An unknown error occurred while fetching the post."
    console.error("Error fetching single post:", err)
  }

  if (!post) {
    
    return (
      <main className="container mx-auto px-4 py-8 md:py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Post Not Found or Error</h1>
        {error && <p className="text-red-500">{error}</p>}
        <Link href="/posts" className="text-primary hover:underline mt-4 block">
          ← Back to all posts
        </Link>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <article className="prose prose-gray mx-auto dark:prose-invert max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Post ID: {post.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">{post.body}</p>
          </CardContent>
        </Card>
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link href="/posts" className="text-primary hover:underline">
            ← Back to all posts
          </Link>
        </div>
      </article>
    </main>
  )
}
