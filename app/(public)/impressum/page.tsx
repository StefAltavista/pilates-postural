import { PolicyDocument } from "@/components/public/policies/PolicyDocument";
import { getPolicyContent } from "@/lib/policies/getPolicyContent";
import { createSeoMetadata } from "@/seo/createSeoMetadata";

export const metadata = createSeoMetadata({
  title: "Impressum",
  description: "Publisher and business information for this website.",
  path: "/impressum",
});

export default async function ImpressumPage() {
  const content = await getPolicyContent("impressum.md");
  return <PolicyDocument title="Impressum" content={content} />;
}
