'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { MdSwapVert } from 'react-icons/md';
import WalletHeader from '@/components/common/header/Wallet';

interface CurrencyBorderProps {
  currency: string;
  isChange: boolean;
}

const CurrencyBorder: React.FC<CurrencyBorderProps> = ({ currency, isChange }) => {
  return (
    <div
      className={`border-${currency} bg-[#4E1724] rounded-3xl px-8 py-6 h-[138px] gap-6 flex flex-col`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <p className="text-base text-[#FFFF] font-mochi">from</p>
          <Image
            width={24}
            height={24}
            src={`/assets/item/${currency.toLowerCase()}.svg`}
            objectFit="contain"
            alt={'Coin'}
          />
          <p className="text-base text-[#FFFF] font-mochi">{currency}</p>
        </div>
        {isChange && (
          <p className="text-base text-[#D9D9D9] font-mochi">
            max 0.0 {currency.toLowerCase()}
          </p>
        )}
      </div>
      <div className="flex gap-2 items-end">
        <p className="text-3xl text-[#D9D9D9] font-mochi">0.00</p>
        <p className="text-base text-[#D9D9D9] font-mochi">{currency}</p>
      </div>
    </div>
  );
};

export default function SwapWalletPage() {
  const [isSwapped, setIsSwapped] = useState(false);

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };

  return (
    <main className="px-2 gap-12 flex flex-col relative">
      <WalletHeader title="Exchange" href="/wallet" />
      <div className="w-full flex flex-col gap-6 mt-6">
        <CurrencyBorder currency={isSwapped ? 'TON' : 'NUD'} isChange={true} />
        <div
          className="border-swap bg-[#751D1D] rounded-2xl w-16 h-16 flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onClick={handleSwap}
        >
          <MdSwapVert className="w-9 h-9 text-white" />
        </div>
        <CurrencyBorder currency={isSwapped ? 'NUD' : 'TON'} isChange={false} />
      </div>
      <div className="rounded-2xl bg-[#E81919] flex px-6 h-[62px] items-center justify-center">
        <p className="text-lg text-[#FFFFFF] font-mochi">Exchange</p>
      </div>
    </main>
  );
}
