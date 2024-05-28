'use client';
import { FaArrowDown, FaArrowUp, FaPlus, FaRegCopy } from 'react-icons/fa';
import { MdOutlineSwapVert } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import WalletHeader from '@/components/common/header/Wallet';
import { useState } from 'react';
import WalletBalancePage from './balance';
import { useTonAddress } from '@tonconnect/ui-react';

export default function WalletPage() {
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedSrcImg, setSelectedSrcImg] = useState('');
  const walletAddress = useTonAddress();
  const closeBalance = () => {
    setSelectedAsset('');
  };
  return (
    <main className="flex flex-col px-2 h-full gap-2 ">
      {!selectedAsset && (
        <>
          <WalletHeader title="Wallet" href="/" />
          <div className="border border-[#4E1724] bg-[#4E1724] rounded-2xl gap-4 justify-center px-6 py-3 flex flex-col">
            <p className="text-center text-xl font-mochi text-[#FFFFFF]">
              Total Balance
            </p>
            <div className="flex gap-2 items-end justify-center ">
              <p className=" text-3xl text-[#FFFFFF] font-mochi text-center ">
                0.00
              </p>
              <p className=" text-base text-[#9F4C4C] font-mochi text-center ">
                USD
              </p>
            </div>
            <div className=" flex gap-2 items-center justify-center ">
              <p className="text-xs text-[#FFFFFF] font-mochi text-center ">
                {walletAddress
                  ? `${walletAddress.slice(0, 5)}...${walletAddress.slice(-5)}`
                  : 'Wallet Address'}
              </p>

              <FaRegCopy className="copy-icon cursor-pointer w-4 h-4 text-[#d6975d]" />
            </div>
            <div className=" flex justify-center w-full gap-6 ">
            
              <WalletActionLink href='/wallet/send' icon={<FaArrowDown className="w-7 h-7 text-white" />} label="Send"/>
              <WalletActionLink href='/wallet/receive' icon={<FaArrowUp className="w-7 h-7 text-white" />} label="Receive"/>
              <WalletActionLink href='/wallet/buy' icon={<FaPlus className="w-7 h-7 text-white" />} label="Buy"/>
              <WalletActionLink href='/wallet/swap' icon={<MdOutlineSwapVert  className="w-7 h-7 text-white" />} label="Swap"/>
            </div>
          </div>
          <p className="text-lg font-mochi text-[#FFFFFF] ">Asset</p>
          <div className="flex flex-col gap-4">
            <div
              className=" w-full rounded-2xl bg-[#4E1724] flex px-6 h-[93px]  justify-between items-center gap-3"
              onClick={() => {
                setSelectedAsset('$NUD');
                setSelectedSrcImg('nud');
              }}
            >
              <div className="items-start gap-2 flex ">
                <Image
                  width={24}
                  height={24}
                  src={'/assets/item/nud.svg'}
                  alt={'Coin'}
                />
                <div className=" w-auto flex-grow flex flex-col justify-center ">
                  <p className=" text-lg text-[#FFFFFF] font-mochi">$NUD</p>
                  <p className=" text-lg text-[#FFFFFF] font-mochi">0.0</p>
                </div>
              </div>

              <p className=" flex text-lg text-[#FFFFFF] font-mochi">$0</p>
            </div>
            <div
              className="w-full rounded-2xl bg-[#4E1724] flex px-6 h-[93px] items-center justify-between gap-3"
              onClick={() => {
                setSelectedAsset('TonCoin');
                setSelectedSrcImg('ton');
              }}
            >
              <div className="items-start gap-2 flex ">
                {' '}
                <Image
                  width={24}
                  height={24}
                  src={'/assets/item/ton.svg'}
                  alt={'Coin'}
                />
                <div className=" w-auto flex-grow flex flex-col justify-center ">
                  <p className=" text-lg text-[#FFFFFF] font-mochi">TonCoin</p>
                  <p className="text-lg text-[#FFFFFF] font-mochi">0.0</p>
                </div>
              </div>

              <p className=" flex text-lg text-[#FFFFFF] font-mochi">$0</p>
            </div>
          </div>
          <p className="text-lg font-mochi text-[#FFFFFF]">
            Transactions history
          </p>
          <div className=" flex flex-col items-center justify-center px-[10%] ">
            <Image
              width={207}
              height={140}
              src={'/assets/avatar/dog.png'}
              alt={'dog'}
            />
            <p className="flex text-lg text-[#9F4C4C] font-mochi justify-center text-center">
              There is no transaction history yet
            </p>
          </div>
        </>
      )}
      {selectedAsset && (
        <WalletBalancePage
          title={selectedAsset}
          srcImage={`/assets/item/${selectedSrcImg}.svg`}
          close={closeBalance}
        />
      )}
    </main>
  );
}

interface WalletActionLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const WalletActionLink: React.FC<WalletActionLinkProps> = ({ href, icon, label }) => (
  <Link className="gap-2 flex flex-col items-center justify-center" href={href}>
    <div className="border border-[#751D1D] bg-[#751D1D] rounded-2xl w-[50px] h-[50px] flex items-center justify-center relative">
      {icon}
    </div>
    <p className="text-base font-mochi text-[#FFFFFF] text-center">{label}</p>
  </Link>
);
