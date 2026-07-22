import { PrenotazioniPage as PrenotazioniPageContent } from "@/components/public/prenotazioni/prenotazioniPage";
import { createSeoMetadata } from "@/seo/createSeoMetadata";

export const metadata = createSeoMetadata({
  title: "Prenotazioni",
  subtitle: "Prenota la tua lezione di Pilates Reformer.",
  excerpt:
    "Calendario online per prenotare una lezione di Pilates Reformer presso lo studio.",
  path: "/prenotazioni",
});

export default function PrenotazioniPage() {
  return <PrenotazioniPageContent />;
}
