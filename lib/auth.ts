import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"

// محاكاة قاعدة بيانات المستخدمين في الذاكرة
// في تطبيق حقيقي، ستكون هذه قاعدة بيانات (مثل PostgreSQL, MongoDB, Supabase)
interface UserInterface {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}

const users: UserInterface[] = [] // تخزين المستخدمين هنا مؤقتًا

// إعداد Better Auth
export const auth = betterAuth({
  database: {
    // محاكاة قاعدة البيانات في الذاكرة
    // في تطبيق حقيقي، ستستخدم قاعدة بيانات حقيقية
    provider: "memory", // أو يمكنك استخدام "postgres", "mysql", "sqlite"
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // تعطيل التحقق من البريد الإلكتروني للبساطة
  },
  plugins: [
    nextCookies(), // إضافة دعم ملفات تعريف الارتباط لـ Next.js
  ],
  secret: process.env.BETTER_AUTH_SECRET!, // مفتاح سري للتشفير
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000", // عنوان URL الأساسي
})

// تصدير الأنواع للاستخدام في TypeScript
export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.User
