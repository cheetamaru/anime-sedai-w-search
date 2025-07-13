import { MainPage } from "@/pages/ui/MainPage"
import Head from 'next/head'
import { siteName } from "@/pages/constants/brand";

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
