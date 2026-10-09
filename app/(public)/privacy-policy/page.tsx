import { PolicyDocument } from "@/components/public/policies/PolicyDocument";
import { getPolicyContent } from "@/lib/policies/getPolicyContent";
import { createSeoMetadata } from "@/seo/createSeoMetadata";

export const metadata = createSeoMetadata({
  title: "Privacy Policy",
  description:
    "Informazioni sul trattamento dei dati personali e sulla tutela della privacy nel sito di Pilates Postural Studio.",
  path: "/privacy-policy",
});

export default async function PrivacyPolicyPage() {
  const content = await getPolicyContent("privacy-policy.md");
  return <PolicyDocument title="Privacy Policy" content={content} />;
}
