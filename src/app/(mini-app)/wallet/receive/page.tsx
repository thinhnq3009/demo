'use client';
import { FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import WalletHeader from '@/components/common/header/Wallet';
import { useTonAddress } from '@tonconnect/ui-react';

export default function ReceiveWalletPage() {
  const walletAddress = useTonAddress();
  return (
    <main className=" px-2 gap-6 flex flex-col ">
      <WalletHeader title="Deposits" href="/wallet" />
      <p className="text-lg font-mochi text-[#FFFFFF]">Your wallet address</p>
      <div className="w-full rounded-3xl bg-[#4E1724] flex px-6 items-center justify-between gap-3 h-[91px]">
        <div className="justify-start">
          <p className="text-base text-[#FFFFFF] font-mochi ">
            {walletAddress
              ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-8)}`
              : 'Wallet Address'}
          </p>
        </div>
        <p className="text-base text-[#EF831F] font-mochi ">Copy</p>
      </div>

      <p className="text-xs text-[#9F4C4C] font-mochi text-center">
        Send only TON or $PUNK to this address. The wallet does not support
        other network & currencies
      </p>
      <p className="text-lg font-mochi text-[#FFFFFF] ">Deposit methods</p>
      <div className=" flex flex-col gap-4 ">
        <WalletMethods img="/assets/icon/wallet.png" text="@Wallet" />
        <WalletMethods img="/assets/icon/rocket.png" text="xRocket" />
        <WalletMethods img="/assets/icon/tonkeeper.png" text="Tonkeeper" />
        <WalletMethods img="/assets/icon/tonhub.png" text="Tonhub" />
        <WalletMethods img="/assets/icon/neoCrypto.png" text="NeoCrypto" />
      </div>
    </main>
  );
}

interface WalletMethodsProps {
  img: string;
  text: string;
}

const WalletMethods: React.FC<WalletMethodsProps> = ({ img, text }) => (
  <div className="w-full rounded-2xl bg-[#4E1724] flex px-2 h-[91px] items-center justify-between gap-3">
    <div className="flex items-center gap-3">
      <Image width={24} height={24} src={img} alt={''} />
      <p className="text-lg text-[#FFFFFF] font-mina font-bold">{text}</p>
    </div>
    <FaChevronRight className="w-7 h-7 text-[#FFFFFF]" />
  </div>
);
