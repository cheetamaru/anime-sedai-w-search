import Head from 'next/head'
import { siteName } from "@/modules/constants/brand";
import dynamic from "next/dynamic";

const MainPage = dynamic(() => import("@/modules/ui/MainPage"), {ssr: false})

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteName}</title>
      </Head>
      <MainPage />
    </>

  );
}
