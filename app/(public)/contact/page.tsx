import { ContactPage as ContactPageContent } from "@/components/public/contact/ContactPage";
import { createSeoMetadata } from "@/seo/createSeoMetadata";

export const metadata = createSeoMetadata({
  title: "Contact",
  subtitle: "Get in touch",
  excerpt: "Contact the studio for collaborations, projects, and general inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageContent />;
}
