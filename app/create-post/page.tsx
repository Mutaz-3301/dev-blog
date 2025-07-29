"use client"

import { useEffect, useState } from "react"
import { useActionState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createPost } from "@/app/actions/blog"
import { authClient } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export default function CreatePostPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession()
        if (!session.data?.user) {
          router.push("/signin")
          return
        }
        setUser(session.data.user)
      } catch (error) {
        console.error("Error checking auth:", error)
        router.push("/signin")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-14rem)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="mx-auto max-w-2xl w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create New Blog Post</CardTitle>
          <CardDescription className="text-center">Fill in the details to publish a new article.</CardDescription>
        </CardHeader>
        <CardContent>
          <CreatePostForm user={user} />
        </CardContent>
      </Card>
    </div>
  )
}

function CreatePostForm({ user }: { user: any }) {
  const [state, formAction, isPending] = useActionState(createPost, {
    success: false,
    message: "",
  })

  return (
    <form action={formAction} className="grid gap-6">
      
      <input type="hidden" name="authorName" value={user.name || user.email} />
      <input type="hidden" name="authorEmail" value={user.email} />

      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" type="text" placeholder="Your amazing blog post title" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Short Description</Label>
        <Textarea id="description" name="description" placeholder="A brief summary of your post" required rows={3} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="content">Content (HTML or Markdown)</Label>
        <Textarea id="content" name="content" placeholder="Write your post content here..." required rows={10} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" name="category" type="text" placeholder="e.g., Next.js, CSS, UI/UX" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input id="tags" name="tags" type="text" placeholder="React, JavaScript, Tutorial" />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="image">Image URL (Optional)</Label>
        <Input id="image" name="image" type="url" placeholder="https://example.com/image.jpg" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="imageAlt">Image Alt Text (Optional)</Label>
        <Input id="imageAlt" name="imageAlt" type="text" placeholder="Description of the image" />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Publishing..." : "Publish Post"}
      </Button>

      {state?.message && (
        <p
          className={`text-center text-sm mt-2 ${
            state.success ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          }`}
        >
          {state.message}
        </p>
      )}

      <div className="mt-4 text-center text-sm">
        <Link href="/blog" className="underline">
          ← Back to Blog
        </Link>
      </div>
    </form>
  )
}
