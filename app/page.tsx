"use client"

import { getBlogPosts } from "@/lib/blog-posts"
import BlogPostCard from "@/components/blog-post-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion" // استيراد motion

export default function HomePage() {
  const posts = getBlogPosts()

  // تعريف متغيرات الرسوم المتحركة لقسم Hero
  const heroVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.6,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <>
      {/* Hero Section */}
      <motion.section
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-gray-900 to-gray-800 text-white"
      >
        <div className="container px-4 md:px-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
            >
              Explore the Latest in Web Development
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="max-w-[600px] text-gray-300 md:text-xl"
            >
              Dive into articles on Next.js, Tailwind CSS, UI design, and more.
            </motion.p>
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2 min-[400px]:flex-row"
            >
              <Link href="/blog">
                <Button variant="secondary" className="px-6 py-3 text-lg">
                  Read Our Blog
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="px-6 py-3 text-lg text-white border-gray-600 hover:bg-gray-700 bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Blog Posts Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-8 text-center">Recent Posts</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post, index) => (
            <BlogPostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </section>
    </>
  )
}
