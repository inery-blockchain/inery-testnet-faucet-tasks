import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Homepage from "../components/Homepage";
import Navbar from "../components/Navbar";
import Outputval from "../components/outputval";

const Home: NextPage = () => {
  const style = {
    container: "flex min-h-screen flex-col items-center  py-2 bg-gray-900",
    title: "text-6l font-bold",
    wrapper:
      "flex flex-col items-center justify-around max-w-4xl mt-6 sm:w-full",
  };

  return (
    <div className={style.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
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
