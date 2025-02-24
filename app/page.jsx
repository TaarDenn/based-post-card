import Frame from "@/components/frame";

export const revalidate = 300;

import { METADATA, FRAMEDATA } from "@/constants/metadata";

export async function generateMetadata() {
  return {
    ...METADATA,
    other: {
      "fc:frame": JSON.stringify(FRAMEDATA),
    },
  };
}

export default function Page() {
  return <Frame />;
}
