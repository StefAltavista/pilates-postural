import { PolicyDocument } from "@/components/public/policies/PolicyDocument";
import { getPolicyContent } from "@/lib/policies/getPolicyContent";
import { createSeoMetadata } from "@/seo/createSeoMetadata";

export const metadata = createSeoMetadata({
  title: "Cookie Policy",
  description:
    "Informazioni sui cookie essenziali e facoltativi utilizzati dal sito di Pilates Postural Studio.",
  path: "/cookie-policy",
});

export default async function CookiePolicyPage() {
  const content = await getPolicyContent("cookie-policy.md");
  return <PolicyDocument title="Cookie Policy" content={content} />;
}
