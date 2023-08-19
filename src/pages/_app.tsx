import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Bai_Jamjuree } from "next/font/google";

const baiJamjuree = Bai_Jamjuree({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return <Component className={`${baiJamjuree.className}`} {...pageProps} />;
}
