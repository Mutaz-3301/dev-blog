import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Users,
  Target,
  Mail,
  Twitter,
  Github,
  Linkedin,
  Calendar,
  MapPin,
  Coffee,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Component() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            About Us
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Stories that{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              inspire
            </span>{" "}
            and inform
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're passionate storytellers dedicated to sharing insights,
            experiences, and knowledge that matter. Our mission is to create
            content that sparks curiosity and drives meaningful conversations.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="text-muted-foreground">Articles Published</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">50K+</h3>
              <p className="text-muted-foreground">Monthly Readers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                <Coffee className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">3</h3>
              <p className="text-muted-foreground">Years Running</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe in the power of well-crafted content to educate,
              inspire, and connect people. Our blog serves as a platform where
              ideas flourish, knowledge is shared freely, and diverse
              perspectives come together to create meaningful dialogue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-3">Quality Content</h3>
                <p className="text-muted-foreground">
                  Every article is carefully researched, thoughtfully written,
                  and thoroughly reviewed to ensure we deliver valuable insights
                  to our readers.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-3">Community Focus</h3>
                <p className="text-muted-foreground">
                  We foster an inclusive community where readers can engage,
                  share ideas, and learn from each other's experiences and
                  perspectives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet the Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind the stories you love to read.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src="/girl cartoon.jpg?height=300&width=300"
                  alt="Sarah Johnson"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
                <p className="text-primary font-medium mb-3">Editor-in-Chief</p>
                <p className="text-sm text-muted-foreground mb-4">
                  With 8+ years in digital publishing, Sarah leads our editorial
                  vision and ensures every piece meets our high standards.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>New York, NY</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Team Member 2 */}
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src="/man cartoon.jpg?height=300&width=300"
                  alt="Michael Chen"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Michael Chen</h3>
                <p className="text-primary font-medium mb-3">Senior Writer</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Tech enthusiast and storyteller who specializes in making
                  complex topics accessible to everyone.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Twitter className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Team Member 3 */}
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src="/woman cartoon.jpg?height=300&width=300"
                  alt="Emma Rodriguez"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Emma Rodriguez</h3>
                <p className="text-primary font-medium mb-3">
                  Creative Director
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Visual storyteller who brings our content to life through
                  thoughtful design and engaging multimedia.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>Austin, TX</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Twitter className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-lg text-muted-foreground">
              From a simple idea to a thriving community of readers and writers.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  2022 - The Beginning
                </h3>
                <p className="text-muted-foreground">
                  Started as a weekend project with a simple goal: share
                  knowledge and connect with like-minded individuals.
                </p>
              </div>
            </div>

            <Separator className="ml-6" />

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  2023 - Growing Community
                </h3>
                <p className="text-muted-foreground">
                  Reached 10,000 monthly readers and expanded our team to
                  include specialized writers and editors.
                </p>
              </div>
            </div>

            <Separator className="ml-6" />

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  2024 - New Horizons
                </h3>
                <p className="text-muted-foreground">
                  Launched premium content, started a newsletter, and built
                  partnerships with industry leaders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have a story idea, feedback, or just want to say hello? We'd love to
            hear from you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="mailto:hello@modernblog.com">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/newsletter">Subscribe to Newsletter</Link>
            </Button>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button variant="ghost" size="sm">
              <Twitter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Github className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
