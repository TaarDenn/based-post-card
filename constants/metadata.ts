const appUrl = process.env.NEXT_PUBLIC_URL;
const ogImageUrl = `${appUrl}/open-graph/og.png`;

export const METADATA = {
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
};

export const FRAMEDATA = {
  version: "next",
  imageUrl: ogImageUrl,
  button: {
    title: "Launch Post-card.fun",
    action: {
      type: "launch_frame",
      name: "POST your handcrafted NFT to a fren!",
      url: appUrl,
      splashImageUrl: `${appUrl}/splash/splash.png`,
      splashBackgroundColor: "#0052ff",
    },
  },
};
