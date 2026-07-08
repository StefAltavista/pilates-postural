import { ContactPage as ContactPageContent } from "@/components/public/contact/ContactPage";
import { createSeoMetadata } from "@/seo/createSeoMetadata";

export const metadata = createSeoMetadata({
  title: "Contatti",
  subtitle: "Pilates Postural Studio a Rapallo",
  excerpt: "Contatta lo studio per Pilates, Gyrotonic, massaggi e informazioni.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageContent />;
}
