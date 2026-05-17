import {
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import type { IconType } from "react-icons";

export interface ContactInfoItem {
  label: string;
  value: string;
  Icon: IconType;
}

export interface SocialLink {
  label: string;
  href: string;
  hoverClassName: string;
  Icon: IconType;
}

export const contactInfoItems: ContactInfoItem[] = [
  {
    label: "Address",
    value: "123 Main Street, Dhaka, Bangladesh",
    Icon: FaMapMarkerAlt,
  },
  {
    label: "Phone",
    value: "+880 1234-567890",
    Icon: FaPhoneAlt,
  },
  {
    label: "Email",
    value: "info@salimar.com",
    Icon: FaEnvelope,
  },
  {
    label: "Office Hours",
    value: "Mon-Fri: 9AM-6PM",
    Icon: FaClock,
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "#",
    hoverClassName: "hover:bg-blue-600",
    Icon: FaFacebookF,
  },
  {
    label: "Twitter",
    href: "#",
    hoverClassName: "hover:bg-blue-400",
    Icon: FaTwitter,
  },
  {
    label: "Instagram",
    href: "#",
    hoverClassName: "hover:bg-pink-600",
    Icon: FaInstagram,
  },
  {
    label: "YouTube",
    href: "#",
    hoverClassName: "hover:bg-red-600",
    Icon: FaYoutube,
  },
  {
    label: "LinkedIn",
    href: "#",
    hoverClassName: "hover:bg-blue-700",
    Icon: FaLinkedinIn,
  },
];
