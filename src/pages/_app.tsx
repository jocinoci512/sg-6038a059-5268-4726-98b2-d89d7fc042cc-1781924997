import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChatWidgetLoader } from "@/components/ChatWidgetLoader";

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Component {...pageProps} />
      <ChatWidgetLoader />
    </>
  );
}
