import { FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import WalletHeader from '@/components/common/header/Wallet';

export default function ReceiveWalletPage() {
  return (
    <main className=" px-2 gap-6 flex flex-col ">
      <WalletHeader title="Deposits" href="/wallet" />
      <p className="text-lg font-mochi text-[#FFFFFF] pt-10 ">
        Your wallet address
      </p>
      <div className="w-full rounded-3xl bg-[#4E1724] flex px-6 py-4 items-center justify-between gap-3">
        <div className="justify-start">
          <input
            className="text-base text-[#FFFFFF] font-mochi bg-transparent outline-none placeholder-[#FFFFFF] w-[90%]"
            type="text"
            inputMode="numeric"
            placeholder="UQCXXIMmZY...5oG9iXInP"
          />
        </div>
        <p className="text-base text-[#9F4C4C] font-mochi ">Copy</p>
      </div>

      <p className="text-sm text-[#9F4C4C] font-mochi max-w-[500px]">
        Send only TON or $PUNK to this address. The wallet does not support
        other network & currencies
      </p>
      <p className="text-lg font-mochi text-[#FFFFFF] ">Deposit methods</p>
      <div className=" flex flex-col gap-4 ">
        <div className="w-full  rounded-2xl bg-[#4E1724] flex px-2 py-6 items-center justify-between gap-3 ">
          <div className="flex items-center gap-3">
            <Image
              width={36}
              height={36}
              src={'/assets/icon/wallet.png'}
              alt={'Coin'}
            />
            <p className="text-base text-[#FFFFFF] font-mochi ">@Wallet</p>
          </div>
          <FaChevronRight className="w-8 h-8  text-[#FFFFFF] " />
        </div>
        <div className="w-full  rounded-2xl bg-[#4E1724] flex px-2 py-6 items-center justify-between gap-3 ">
          <div className="flex items-center gap-3">
            <Image
              width={36}
              height={36}
              src={'/assets/icon/rocket.png'}
              alt={'Coin'}
            />
            <p className="text-base text-[#FFFFFF] font-mochi ">xRocket</p>
          </div>
          <FaChevronRight className="w-8 h-8  text-[#FFFFFF] " />
        </div>
        <div className="w-full  rounded-2xl bg-[#4E1724] flex px-2 py-6 items-center justify-between gap-3 ">
          <div className="flex items-center gap-3">
            <Image
              width={36}
              height={36}
              src={'/assets/icon/tonkeeper.png'}
              alt={'Coin'}
            />
            <p className="text-base text-[#FFFFFF] font-mochi ">Tonkeeper</p>
          </div>
          <FaChevronRight className="w-8 h-8  text-[#FFFFFF] " />
        </div>
        <div className="w-full  rounded-2xl bg-[#4E1724] flex px-2 py-6 items-center justify-between gap-3 ">
          <div className="flex items-center gap-3">
            <Image
              width={36}
              height={36}
              src={'/assets/icon/tonhub.png'}
              alt={'Coin'}
            />
            <p className="text-base text-[#FFFFFF] font-mochi ">Tonhub</p>
          </div>
          <FaChevronRight className="w-8 h-8  text-[#FFFFFF]" />
        </div>
      </div>
    </main>
  );
}
