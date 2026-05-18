"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ============================
// ZOD SCHEMA
// ============================

const contactSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    subject: z
      .string()
      .min(5, "Subject must be at least 5 characters"),

    message: z
      .string()
      .min(20, "Message must be at least 20 characters"),

    preferredContact: z.enum(["email", "phone"]),

    phone: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // CONDITIONAL VALIDATION
    if (data.preferredContact === "phone") {
      if (!data.phone || data.phone.length < 11) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: "Phone number is required",
        });
      }
    }
  });

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      preferredContact: "email",
    },
  });

  const preferredContact = watch("preferredContact");

  const onSubmit = async (data: ContactFormData) => {
    console.log(data);

    // API CALL HERE
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Message Sent Successfully");
  };

  return (
    <section className="w-full bg-background py-14">
      <div className="container mx-auto px-4">
        {/* TOP */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold md:text-5xl">
            Get In Touch
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We would love to hear from you! Whether you have a question
            about products, orders, or anything else.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* NAME */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Name *
                  </label>

                  <Input
                    placeholder="Your full name"
                    {...register("name")}
                  />

                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Email *
                  </label>

                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...register("email")}
                  />

                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* PREFERRED CONTACT */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Preferred Contact
                  </label>

                  <select
                    {...register("preferredContact")}
                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                  </select>
                </div>

                {/* CONDITIONAL PHONE FIELD */}
                {preferredContact === "phone" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Phone Number *
                    </label>

                    <Input
                      placeholder="+8801XXXXXXXXX"
                      {...register("phone")}
                    />

                    {errors.phone && (
                      <p className="text-sm text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                )}

                {/* SUBJECT */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Subject *
                  </label>

                  <Input
                    placeholder="What is this about?"
                    {...register("subject")}
                  />

                  {errors.subject && (
                    <p className="text-sm text-red-500">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* MESSAGE */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Message *
                  </label>

                  <Textarea
                    rows={7}
                    placeholder="Write your message here..."
                    {...register("message")}
                  />

                  {errors.message && (
                    <p className="text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* BUTTON */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  <Send className="mr-2 h-4 w-4" />

                  {isSubmitting
                    ? "Sending..."
                    : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* RIGHT SIDE */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">
                Contact Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* INFO ITEMS */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-black p-3 text-white">
                    <MapPin className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold">Address</h3>

                    <p className="text-sm text-muted-foreground">
                      123 Main Street, Dhaka, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-black p-3 text-white">
                    <Phone className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold">Phone</h3>

                    <p className="text-sm text-muted-foreground">
                      +880 1234-567890
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-black p-3 text-white">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold">Email</h3>

                    <p className="text-sm text-muted-foreground">
                      info@example.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-black p-3 text-white">
                    <Clock className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Office Hours
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Mon-Fri: 9AM-6PM
                    </p>
                  </div>
                </div>
              </div>

              {/* SOCIAL */}
              <div>
                <h3 className="mb-4 font-semibold">Follow Us</h3>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <FaFacebookF className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <FaTwitter className="mr-2 h-4 w-4" />
                    Twitter
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <FaInstagram className="mr-2 h-4 w-4" />
                    Instagram
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <FaYoutube className="mr-2 h-4 w-4" />
                    YouTube
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <FaLinkedinIn className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
