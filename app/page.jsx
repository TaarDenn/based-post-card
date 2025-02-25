import FrameApp from "@/components/frame-app";

const appUrl = process.env.NEXT_PUBLIC_URL;
const ogImageUrl = `${appUrl}/open-graph/og.png`;
const imageUrl = `${appUrl}/frame-poster/fc.png`;

const frame = {
  version: "next",
  imageUrl: imageUrl,
  button: {
    title: "Post a Card to fren",
    action: {
      type: "launch_frame",
      name: "PostCard.fun",
      url: appUrl,
      splashImageUrl: `${appUrl}/splash/splash.png`,
      splashBackgroundColor: "#0052ff",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata() {
  return {
    title: "Post-Card.fun",
    description: "Post handcrafted NFTs to frens!",
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
  return <FrameApp />;
}
