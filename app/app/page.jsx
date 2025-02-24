import MainApp from "@/components/main-app";
import { METADATA } from "@/constants/metadata";

export const revalidate = 300;

export async function generateMetadata() {
  return METADATA;
}

export default function Home() {
  return <MainApp />;
}
