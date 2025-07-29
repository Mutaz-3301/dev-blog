"use server"

import { addBlogPost } from "@/lib/blog-posts"
import { redirect } from "next/navigation"


function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export async function createPost(prevState: any, formData: FormData) {
  

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string
  const image = formData.get("image") as string
  const imageAlt = formData.get("imageAlt") as string
  const category = formData.get("category") as string
  const tags = formData.get("tags") as string
  const authorName = formData.get("authorName") as string
  const authorEmail = formData.get("authorEmail") as string

  if (!title || !description || !content || !category || !authorName) {
    return { success: false, message: "Title, description, content, category, and author are required." }
  }

  const slug = createSlug(title) + "-" + Date.now().toString().slice(-5)

  const newPost = {
    slug,
    title,
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    description,
    content,
    image: image || "/placeholder.svg?height=400&width=800",
    imageAlt: imageAlt || `Image for ${title}`,
    author: authorName,
    category,
    likes: 0,
    dislikes: 0,
    views: 0,
    comments: [],
    tags: tags
      ? tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : [],
  }

  try {
    addBlogPost(newPost)
    redirect(`/blog/${newPost.slug}`)
  } catch (error) {
    console.error("Error creating post:", error)
    return { success: false, message: "Failed to create post. Please try again." }
  }
}
