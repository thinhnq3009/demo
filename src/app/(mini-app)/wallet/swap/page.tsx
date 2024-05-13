
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { MdSwapVert } from 'react-icons/md';
import WalletHeader from '@/components/common/header/Wallet';


export default function SwapWalletPage() {
  const [isSwapped, setIsSwapped] = useState(false);

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };
  
  interface CurrencyBorderProps {
    currency: string;
  }

  const CurrencyBorder: React.FC<CurrencyBorderProps> = ({ currency }) => {
    return (
    <div
      className={`border-${currency} bg-[#4E1724] rounded-3xl px-8 pt-3 pb-12 gap-6 flex flex-col`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <p className="text-base text-[#FFFF] font-mochi ">from</p>
          <Image
            width={28}
            height={32}
            src={`/assets/item/${currency.toLowerCase()}.svg`}
            objectFit="contain"
            alt={'Coin'}
          />
          <p className="text-base text-[#FFFF] font-mochi  ">{currency}</p>
        </div>
        <p className="text-xl text-[#D9D9D9] font-mochi"> max 0.0 {currency.toLowerCase()}</p>
      </div>
      <div className="flex gap-2 items-end">
        <p className="text-3xl text-[#D9D9D9] font-mochi">0.00 </p>
        <p className="text-base text-[#D9D9D9] font-mochi">{currency} </p>
      </div>
    </div>
    );
  };
  return (
    <main className="px-2 gap-12 flex flex-col relative">
      <WalletHeader title="Exchange" href="/wallet" />
      <div className="w-full flex flex-col gap-6 mt-6">
        <CurrencyBorder currency={isSwapped ? 'TON' : 'NUD'}  />
        <div
          className="border-swap bg-[#751D1D] rounded-2xl w-16 h-16 flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer"
          onClick={handleSwap}
        >
          <MdSwapVert className="w-9 h-9 text-white" />
        </div>
        <CurrencyBorder currency={isSwapped ? 'NUD' : 'TON'}  />
      </div>
      <div className="rounded-2xl bg-[#4E1724] flex px-6 py-6 items-center justify-center   ">
        <p className="text-base text-[#FFFFFF] font-mochi  ">Exchange</p>
      </div>
    </main>
  );
}




