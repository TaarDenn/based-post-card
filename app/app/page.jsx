import MainApp from "@/components/main-app";

const appUrl = process.env.NEXT_PUBLIC_URL;
const ogImageUrl = `${appUrl}/open-graph/og.png`;

export async function generateMetadata() {
  return {
    title: "Post-Card.fun",
    openGraph: {
      title: "Post-Card.fun",
      description: "Post handcrafted NFTs to frens!",
      type: "website",
      siteName: "Post-card.fun",
      url: appUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "post-card.fun og",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Post-Card.fun",
      description: "Post handcrafted NFTs to frens!",
      creator: "@taardenn",
      images: [ogImageUrl],
    },
  };
}

export default function Home() {
  return <MainApp />;
}
