import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Output from "../components/Output";
import baal from "../assets/baal.jpg";
import Dahboard from "../components/dashboard";

const Home: NextPage = () => {
  const style = {
    container:
      "flex min-h-screen flex-col items-center justify-center py-2 bg-[#0d202f]",
    title: "text-6l font-bold",
    wrapper: "flex flex-col items-center max-w-4xl sm:w-full gap-[120px]",
  };

  return (
    <div className={style.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.wrapper}>
        <Dahboard />
        <Output />
      </div>
    </div>
  );
};

export default Home;
