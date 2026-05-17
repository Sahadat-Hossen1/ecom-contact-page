import { ContactForm, ContactHeader, ContactInfo } from "@/components/contact";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <ContactHeader />
        <div className="flex flex-col lg:flex-row gap-8">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </main>
  );
}
