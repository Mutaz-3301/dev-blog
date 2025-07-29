"use server"

import { togglePostInteraction, addComment, addReply, incrementPostViews, getUserInteraction } from "@/lib/blog-posts"
import { revalidatePath } from "next/cache"


export async function handlePostInteraction(
  postSlug: string,
  interactionType: "like" | "dislike" | "save",
  userEmail: string,
) {
  try {
    const isActive = togglePostInteraction(postSlug, userEmail, interactionType)

    
    revalidatePath(`/blog/${postSlug}`)
    revalidatePath("/blog")

    return { success: true, isActive }
  } catch (error) {
    console.error("Error handling post interaction:", error)
    return { success: false, message: "Failed to update interaction" }
  }
}


export async function addPostComment(prevState: any, formData: FormData) {
  const postSlug = formData.get("postSlug") as string
  const content = formData.get("content") as string
  const authorName = formData.get("authorName") as string
  const authorEmail = formData.get("authorEmail") as string

  if (!postSlug || !content || !authorName || !authorEmail) {
    return { success: false, message: "All fields are required" }
  }

  if (content.trim().length < 10) {
    return { success: false, message: "Comment must be at least 10 characters long" }
  }

  try {
    const newComment = addComment(postSlug, authorName, authorEmail, content.trim())

    revalidatePath(`/blog/${postSlug}`)

    return {
      success: true,
      message: "Comment added successfully!",
      comment: newComment,
    }
  } catch (error) {
    console.error("Error adding comment:", error)
    return { success: false, message: "Failed to add comment" }
  }
}


export async function addCommentReply(prevState: any, formData: FormData) {
  const commentId = formData.get("commentId") as string
  const postSlug = formData.get("postSlug") as string
  const content = formData.get("content") as string
  const authorName = formData.get("authorName") as string
  const authorEmail = formData.get("authorEmail") as string

  if (!commentId || !postSlug || !content || !authorName || !authorEmail) {
    return { success: false, message: "All fields are required" }
  }

  if (content.trim().length < 5) {
    return { success: false, message: "Reply must be at least 5 characters long" }
  }

  try {
    const newReply = addReply(commentId, authorName, authorEmail, content.trim())

    if (!newReply) {
      return { success: false, message: "Comment not found" }
    }

    revalidatePath(`/blog/${postSlug}`)

    return {
      success: true,
      message: "Reply added successfully!",
      reply: newReply,
    }
  } catch (error) {
    console.error("Error adding reply:", error)
    return { success: false, message: "Failed to add reply" }
  }
}


export async function incrementViews(postSlug: string) {
  try {
    incrementPostViews(postSlug)
    return { success: true }
  } catch (error) {
    console.error("Error incrementing views:", error)
    return { success: false }
  }
}


export async function getInteractionStatus(postSlug: string, userEmail: string) {
  try {
    return {
      liked: getUserInteraction(postSlug, userEmail, "like"),
      disliked: getUserInteraction(postSlug, userEmail, "dislike"),
      saved: getUserInteraction(postSlug, userEmail, "save"),
    }
  } catch (error) {
    console.error("Error getting interaction status:", error)
    return { liked: false, disliked: false, saved: false }
  }
}
