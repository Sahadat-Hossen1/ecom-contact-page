// app/contact/page.tsx
"use client";

import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

// --- Type Definitions ---
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// --- Validation Helper ---
const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.subject.trim()) {
    errors.subject = "Subject is required";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required";
  }

  return errors;
};

// --- Main Component ---
export default function ContactPage() {
  // State for form fields
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field has been touched
    if (touched[name]) {
      const fieldErrors = validateForm({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof FormErrors] }));
    }
  };

  // Mark field as touched on blur
  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validateForm(formData);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof FormErrors] }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);

    // Validate all fields
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // If no errors, log the form data to console
    if (Object.keys(validationErrors).length === 0) {
      console.log("Contact Form Submission:", {
        ...formData,
        submittedAt: new Date().toISOString(),
      });
      // Optional: Show success message, reset form, etc.
      alert("Message sent! Check the console for the submitted data.");
      // Reset form (optional)
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      setErrors({});
    } else {
      console.log("Form has errors:", validationErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Get In Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We would love to hear from you! Whether you have a question about products, orders, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT COLUMN: Contact Form */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <form onSubmit={handleSubmit} noValidate>
              {/* Name Field */}
              <div className="mb-5">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your full name"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    touched.name && errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Subject Field */}
              <div className="mb-5">
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="What is this about?"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    touched.subject && errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {touched.subject && errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Write your message here..."
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-y ${
                    touched.message && errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {touched.message && errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: Contact Information (Static) */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              {/* Contact Information Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
                  Contact Information
                </h2>

                {/* Address */}
                <div className="flex items-start space-x-3 mb-4">
                  <FaMapMarkerAlt className=" mt-1 text-xl flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700">Address</p>
                    <p className="text-gray-600">123 Main Street, Dhaka, Bangladesh</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3 mb-4">
                  <FaPhoneAlt className=" mt-1 text-xl flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700">Phone</p>
                    <p className="text-gray-600">+880 1234-567890</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3 mb-4">
                  <FaEnvelope className=" mt-1 text-xl flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700">Email</p>
                    <p className="text-gray-600">info@salimar.com</p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start space-x-3">
                  <FaClock className=" mt-1 text-xl flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700">Office Hours</p>
                    <p className="text-gray-600">Mon-Fri: 9AM-6PM</p>
                  </div>
                </div>
              </div>

              {/* Follow Us Section */}
              <div className="pt-4">
                <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
                  Follow Us
                </h2>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition duration-300"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 hover:bg-blue-400 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition duration-300"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 hover:bg-pink-600 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition duration-300"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 hover:bg-red-600 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition duration-300"
                    aria-label="YouTube"
                  >
                    <FaYoutube />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 hover:bg-blue-700 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition duration-300"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
