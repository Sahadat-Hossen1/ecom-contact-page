import { contactInfoItems, socialLinks } from "./contact-data";

export function ContactInfo() {
  return (
    <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
            Contact Information
          </h2>
          <div className="space-y-4">
            {contactInfoItems.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start space-x-3">
                <Icon className="text-blue-500 mt-1 text-xl flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-700">{label}</p>
                  <p className="text-gray-600">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pt-4">
          <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
            Follow Us
          </h2>
          <div className="flex space-x-4">
            {socialLinks.map(({ Icon, href, hoverClassName, label }) => (
              <a
                key={label}
                href={href}
                className={`w-10 h-10 bg-gray-100 ${hoverClassName} text-gray-600 hover:text-white rounded-full flex items-center justify-center transition duration-300`}
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
