import { PalestraPage as PalestraPageContent } from "@/components/public/palestra/PalestraPage";
import { createSeoMetadata } from "@/seo/createSeoMetadata";

export const metadata = createSeoMetadata({
  title: "Palestra",
  subtitle: "Pilates posturale e Gyrotonic a Rapallo.",
  excerpt:
    "Scopri lo spazio dedicato a Reformer, Barrel, Cadillac e Gyrotonic machine.",
  path: "/palestra",
});

export default function PalestraPage() {
  return <PalestraPageContent />;
}

