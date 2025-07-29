"use server"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"

// محاكاة قاعدة بيانات المستخدمين في الذاكرة
interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}

const users: User[] = []

function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email)
}

// Server Action لتسجيل مستخدم جديد
export async function signUp(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { success: false, message: "All fields are required." }
  }

  if (findUserByEmail(email)) {
    return { success: false, message: "User with this email already exists." }
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    users.push(newUser)

    console.log("User signed up:", newUser.email)
    return { success: true, message: "Account created successfully! Please sign in." }
  } catch (error) {
    console.error("Sign up error:", error)
    return { success: false, message: "Failed to create account. Please try again." }
  }
}

// Server Action لتسجيل دخول المستخدم
export async function signIn(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, message: "Email and password are required." }
  }

  const user = findUserByEmail(email)
  if (!user) {
    return { success: false, message: "Invalid credentials." }
  }

  try {
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) {
      return { success: false, message: "Invalid credentials." }
    }

    // استخدام Better Auth لإنشاء جلسة
    // هذا مثال مبسط - في التطبيق الحقيقي، ستحتاج إلى استخدام Better Auth بشكل صحيح
    console.log("User signed in:", user.email)
    redirect("/blog")
  } catch (error) {
    console.error("Sign in error:", error)
    return { success: false, message: "Failed to sign in. Please try again." }
  }
}

// Server Action لطلب إعادة تعيين كلمة المرور
export async function requestPasswordReset(prevState: any, formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    return { success: false, message: "Email is required." }
  }

  const user = findUserByEmail(email)

  if (!user) {
    console.log(`Password reset requested for non-existent email: ${email}`)
    return {
      success: true,
      message: "If an account with that email exists, a password reset link has been sent.",
    }
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log(`Password reset link simulatedly sent to: ${email}`)

    return {
      success: true,
      message: "If an account with that email exists, a password reset link has been sent.",
    }
  } catch (error) {
    console.error("Password reset request error:", error)
    return { success: false, message: "Failed to send reset link. Please try again." }
  }
}
