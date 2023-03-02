import Image from "next/image";
import Navbar from "../components/Navbar";
import Outputval from "../components/outputval";import type { NextPage } from "next";
import Homepage from "../components/Homepage";
import Head from "next/head";


const Home: NextPage = () => {
  const style = {
    container: "flex min-h-screen flex-col items-center  py-2 bg-white-700",
    title: "text-6l font-bold",
    wrapper:
      "flex flex-col items-center justify-around max-w-4xl mt-6 sm:w-full",
  };

  return (
    <div className={style.container}>
      <Head>
        <title>Inery Testnet Dapp</title>
        <link rel="icon" href="/amirmp.svg" />
      </Head>
      <div className={style.wrapper}>
        <Navbar />
        <Homepage />
        <Outputval />
      </div>
    </div>
  );
};

export default Home;
