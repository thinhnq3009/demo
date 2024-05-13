'use client';
import { FaArrowDown, FaArrowUp, FaRegCopy, FaPlus } from 'react-icons/fa';
import { MdOutlineSwapHoriz } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import WalletHeader from '@/components/common/header/Wallet';
import { useState } from 'react';
import WalletBalancePage from './balance';

export default function WalletPage() {
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedSrcImg, setSelectedSrcImg] = useState('');
  const closeBalance = () => {
    setSelectedAsset(''); 
  };
  return (
    <main className="flex flex-col px-2 h-full gap-2 ">
      {!selectedAsset && (
        <>
          <WalletHeader title="Wallet" href="/" />

          <div className="border border-[#4E1724] bg-[#4E1724] rounded-2xl gap-4 justify-center px-4 py-3 flex flex-col">
            <p className="text-center text-base font-mochi text-[#FFFFFF]">
              Total Balance
            </p>
            <div className="flex gap-2 items-center justify-center ">
              <p className=" text-3xl text-[#FFFFFF] font-mochi text-center font-bold">
                0,00
              </p>
              <p className=" text-base text-[#9F4C4C] font-mochi text-center font-bold">
                USD
              </p>
            </div>
            <div className=" flex gap-2 items-center justify-center ">
              <p className="text-lg text-[#9F4C4C] font-mochi text-center font-bold">
                UQCXXI...iXlnP
              </p>
              <FaRegCopy className="copy-icon cursor-pointer w-6 h-6 text-[#FFFFFF]" />
            </div>
            <div className=" flex justify-center w-full gap-6 ">
              <Link
                className=" gap-2 flex flex-col items-center justify-center"
                href="/wallet/send"
              >
                <div className="border border-[#751D1D] bg-[#751D1D] rounded-2xl w-14 h-16 flex items-center justify-center relative">
                  <FaArrowUp className="w-7 h-7 text-white " />
                </div>
                <p className="text-base font-mochi text-[#FFFFFF] text-center">
                  Send
                </p>
              </Link>
              <Link
                className=" gap-2 flex flex-col items-center justify-center"
                href="/wallet/receive"
              >
                <div className="border border-[#751D1D] bg-[#751D1D] rounded-2xl w-14 h-16 flex items-center justify-center relative">
                  <FaArrowDown className="w-7 h-7 text-white " />
                </div>
                <p className="text-base font-mochi text-[#FFFFFF] text-center">
                  Receive
                </p>
              </Link>
              <Link
                className=" gap-2 flex flex-col items-center justify-center"
                href="/wallet/buy"
              >
                <div className="border border-[#751D1D] bg-[#751D1D] rounded-2xl w-14 h-16 flex items-center justify-center relative">
                  <FaPlus className="w-7 h-7 text-white " />
                </div>
                <p className="text-base font-mochi text-[#FFFFFF] text-center">
                  Buy
                </p>
              </Link>
              <Link
                className=" gap-2 flex flex-col items-center justify-center"
                href="/wallet/swap"
              >
                <div className="border border-[#751D1D] bg-[#751D1D] rounded-2xl w-14 h-16 flex items-center justify-center relative">
                  <MdOutlineSwapHoriz className="w-7 h-7 text-white " />
                </div>
                <p className="text-base font-mochi text-[#FFFFFF] text-center">
                  Swap
                </p>
              </Link>
            </div>
          </div>
          <p className="text-lg font-mochi text-[#FFFFFF] ">Assets</p>
          <div className="flex flex-col gap-4">
            <div
              className=" w-full rounded-2xl bg-[#4E1724] flex px-6 pt-6 pb-3 items-center gap-3"
              onClick={() => {
                setSelectedAsset('$NUD');
                setSelectedSrcImg('nud');
              }}
            >
              <Image
                width={29}
                height={31}
                src={'/assets/item/nud.svg'}
                alt={'Coin'}
              />
              <div className=" w-auto flex-grow flex flex-col justify-center ">
                <p className=" text-lg text-[#FFFFFF] font-mochi">$NUD</p>
                <p className=" text-lg text-[#FFFFFF] font-mochi">0.0</p>
              </div>
              <p className=" flex text-lg text-[#FFFFFF] font-mochi">$0</p>
            </div>
            <div
              className="w-full rounded-2xl bg-[#4E1724] flex px-6 pt-6 pb-3 items-center gap-3"
              onClick={() => {
                setSelectedAsset('TonCoin');
                setSelectedSrcImg('ton');
              }}
            >
              <Image
                width={29}
                height={31}
                src={'/assets/item/ton.svg'}
                alt={'Coin'}
              />
              <div className=" w-auto flex-grow flex flex-col justify-center ">
                <p className=" text-lg text-[#FFFFFF] font-mochi">TonCoin</p>
                <p className="text-lg text-[#FFFFFF] font-mochi">0.0</p>
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
