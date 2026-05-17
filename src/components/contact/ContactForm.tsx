"use client";

import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import type { ContactFormData, ContactFormField, ContactFormErrors } from "./types";
import { validateContactForm } from "./validation";

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

interface ContactInputProps {
  error?: string;
  label: string;
  name: ContactFormField;
  onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  touched?: boolean;
  type?: string;
  value: string;
}

function ContactInput({
  error,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  touched,
  type = "text",
  value,
}: ContactInputProps) {
  const hasError = touched && error;

  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
          hasError ? "border-red-500" : "border-gray-300"
        }`}
      />
      {hasError && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

interface ContactTextareaProps extends Omit<ContactInputProps, "type"> {
  rows?: number;
}

function ContactTextarea({
  error,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  rows = 4,
  touched,
  value,
}: ContactTextareaProps) {
  const hasError = touched && error;

  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-y ${
          hasError ? "border-red-500" : "border-gray-300"
        }`}
      />
      {hasError && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Record<ContactFormField, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const fieldName = name as ContactFormField;
    const nextFormData = { ...formData, [fieldName]: value };

    setFormData(nextFormData);

    if (touched[fieldName]) {
      const fieldErrors = validateContactForm(nextFormData);
      setErrors((previousErrors) => ({
        ...previousErrors,
        [fieldName]: fieldErrors[fieldName],
      }));
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = event.target.name as ContactFormField;
    const fieldErrors = validateContactForm(formData);

    setTouched((previousTouched) => ({ ...previousTouched, [fieldName]: true }));
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: fieldErrors[fieldName],
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const allTouched: Record<ContactFormField, boolean> = {
      name: true,
      email: true,
      subject: true,
      message: true,
    };
    const validationErrors = validateContactForm(formData);

    setTouched(allTouched);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Contact Form Submission:", {
        ...formData,
        submittedAt: new Date().toISOString(),
      });
      alert("Message sent! Check the console for the submitted data.");
      setFormData(initialFormData);
      setTouched({
        name: false,
        email: false,
        subject: false,
        message: false,
      });
      setErrors({});
    } else {
      console.log("Form has errors:", validationErrors);
    }
  };

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <form onSubmit={handleSubmit} noValidate>
        <ContactInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your full name"
          touched={touched.name}
          error={errors.name}
        />
        <ContactInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="your.email@example.com"
          touched={touched.email}
          error={errors.email}
        />
        <ContactInput
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="What is this about?"
          touched={touched.subject}
          error={errors.subject}
        />
        <ContactTextarea
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Write your message here..."
          touched={touched.message}
          error={errors.message}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
