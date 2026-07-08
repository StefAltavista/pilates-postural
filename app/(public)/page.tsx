import { HomePage } from "@/components/public/home/HomePage";
import { createSeoMetadata } from "@/seo/createSeoMetadata";

export const metadata = createSeoMetadata({
  title: "Pilates Postural Studio",
  subtitle: "Pilates, Gyrotonic e massaggi a Rapallo.",
  description:
    "Pilates Postural Studio a Rapallo: lezioni su Reformer, Barrel, Cadillac, Gyrotonic e trattamenti di massoterapia.",
  excerpt: "Uno spazio per movimento, postura, respiro e benessere.",
  path: "/",
});

export default function Home() {
  return <HomePage />;
}
