import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppContainer } from "@/components/common/AppContainer";
import { AppSection } from "@/components/common/AppSection";
import { PostList } from "@/components/public/PostList";
import { getPublishedPostsByCategorySlug } from "@/lib/data/posts";
import { createSeoMetadata } from "@/seo/createSeoMetadata";

export const dynamic = "force-dynamic";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getPublishedPostsByCategorySlug(slug);

  if (!category) {
    return createSeoMetadata({ title: "Categoria non trovata", noIndex: true });
  }

  return createSeoMetadata({
    title: category.name,
    excerpt: `Leggi gli articoli pubblicati in ${category.name}.`,
    path: `/category/${slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getPublishedPostsByCategorySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <AppSection>
      <AppContainer maxWidth="md">
        <Box
          component="header"
          sx={{ mb: 5, borderBottom: 1, borderColor: "divider", pb: 3 }}
        >
          <Link href="/news" className="text-sm font-medium underline">
            Novita
          </Link>
          <Typography component="h1" variant="h3" sx={{ mt: 2 }}>
            {category.name}
          </Typography>
        </Box>
        <PostList posts={category.posts} emptyMessage="Nessun articolo pubblicato in questa categoria." />
      </AppContainer>
    </AppSection>
  );
}
