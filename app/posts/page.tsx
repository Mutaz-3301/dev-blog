import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export default async function PostsPage() {
  let posts: Post[] = []
  let error: string | null = null

  try {
   
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
     
    })

    if (!response.ok) {
      
      throw new Error(`Failed to fetch posts: ${response.statusText}`)
    }

    posts = await response.json()
  } catch (err: any) {
    error = err.message || "An unknown error occurred while fetching posts."
    console.error("Error fetching posts:", err)
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 text-center">
        Posts from JSONPlaceholder
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.length > 0
          ? posts.map((post) => (
              <Link href={`/posts/${post.id}`} key={post.id} className="block h-full">
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-base text-gray-700 dark:text-gray-300 line-clamp-4">
                      {post.body}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))
          : !error && <p className="col-span-full text-center text-muted-foreground">No posts found.</p>}
      </div>
    </main>
  )
}
