// WalletBalancePage.tsx
import React from 'react';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';

export type WalletProps = {
  title: string;
  srcImage: string;
  close:()=> void;
};

export default function WalletBalancePage({ title, srcImage, close }: WalletProps) {
  return (
    <header className=" gap-4 flex flex-col px-4">
      <div className=" flex items-center">
      <button
        className="border border-[#4E1724] bg-[#4E1724] rounded-2xl w-14 h-10 flex items-center justify-center"
        onClick={close}
      >
        <FaArrowLeft className="w-6 h-5 text-white" />
      </button>
      <p className="text-2xl font-mochi text-[#FFFFFF] flex-1 text-center">
        {title} balance
      </p>
    </div>
      <main className="border border-[#4E1724] bg-[#4E1724] rounded-2xl gap-6 justify-center px-5 py-6 flex flex-col ">
        <p className="text-center text-xl font-mochi text-[#FFFFFF]">
          {title} balance
        </p>
        <div className="flex justify-center">
          <Image width={72} height={72} src={srcImage} alt="Coin" />
        </div>
        <p className="text-center text-3xl font-mochi text-[#FFFFFF]">
          0.00$
        </p>
        <p className="text-center text-base font-mochi text-[#9F4C4C]">
          0 {title}
        </p>
        
      </main>
    </header>
  );
}
