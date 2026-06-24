import { PolicyDocument } from "@/components/public/policies/PolicyDocument";
import { getPolicyContent } from "@/lib/policies/getPolicyContent";
import { createSeoMetadata } from "@/seo/createSeoMetadata";

export const metadata = createSeoMetadata({
  title: "Privacy Policy",
  description: "Learn how this website handles personal information and protects your privacy.",
  path: "/privacy-policy",
});

export default async function PrivacyPolicyPage() {
  const content = await getPolicyContent("privacy-policy.md");
  return <PolicyDocument title="Privacy Policy" content={content} />;
}
