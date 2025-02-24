import Frame from "@/components/frame";

export const revalidate = 300;

const appUrl = process.env.NEXT_PUBLIC_URL;
const frameUrl = `${appUrl}/frame`;
const ogImageUrl = `${appUrl}/open-graph/og.png`;

const frame = {
  version: "next",
  imageUrl: ogImageUrl,
  button: {
    title: "Launch Post-card.fun",
    action: {
      type: "launch_frame",
      name: "POST your handcrafted NFT to a fren!",
      url: frameUrl,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

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
      images: [ogImageUrl], // Must be an absolute URL
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Page() {
  return <Frame />;
}
