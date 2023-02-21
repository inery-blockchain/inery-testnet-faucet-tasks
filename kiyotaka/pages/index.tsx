import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Output from "../components/Output";
import Profile from "../components/Profile";
import Transaction from "../components/Transaction";
import Modal from "../modal/Modal";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center mt-[34px] p-[24px] py-2 gap-[54px]">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Profile />
      <Transaction />
      <Output />
      <Modal />
    </div>
  );
};

export default Home;
