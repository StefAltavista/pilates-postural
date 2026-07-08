import { MassaggiPage as MassaggiPageContent } from "@/components/public/massaggi/MassaggiPage";
import { createSeoMetadata } from "@/seo/createSeoMetadata";

export const metadata = createSeoMetadata({
  title: "Massaggi",
  subtitle: "Trattamenti per benessere, recupero e leggerezza.",
  excerpt:
    "Massoterapia e trattamenti manuali integrati al percorso di movimento dello studio.",
  path: "/massaggi",
});

export default function MassaggiPage() {
  return <MassaggiPageContent />;
}

