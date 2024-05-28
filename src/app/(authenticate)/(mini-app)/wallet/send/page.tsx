'use client';
import WalletHeader from '@/components/common/header/Wallet';
import WalletDropDownSimple, {
  WalletDropdownMenuData,
} from '@/components/common/WalletDropDown';

const coin: WalletDropdownMenuData[] = [
  {
    title: 'Toncoin',
    value: 2,
    imageUrl: '/assets/item/ton.svg',
  },
  {
    title: '$NUD',
    value: 1,
    imageUrl: '/assets/item/nud.svg',
  },
];

export default function SendWalletPage() {
  return (
    
    <main className="gap-6 flex flex-col px-2 h-full">
      <WalletHeader title="Withdrawals" href="/wallet" />
      <p className="text-lg font-mochi text-[#FFFFFF] ">
        Choose the withdrawing asset
      </p>
      <div className="w-full h-auto">
        <WalletDropDownSimple
          title="$NUD"
          href="/assets/item/nud.svg"
          data={coin}
        />
      </div>

      <p className="text-lg font-mochi text-[#FFFFFF] ">
        Enter the receptionist’s address
      </p>
      <div className="w-full flex items-center justify-between rounded-3xl bg-[#4E1724] px-6 h-[91px]">
        <input
          className="text-lg text-[#FFFFFF] font-mochi bg-transparent placeholder-[#9F4C4C] outline-none w-[70%]"
          placeholder="Recipient address"
        />
        <p className="text-lg text-[#FAB86F] font-mochi cursor-pointer">
          Paste
        </p>
      </div>

      <p className="text-lg font-mochi text-[#FFFFFF] ">Enter the amount</p>
      <div className="bg-[#4E1724] rounded-3xl px-8 pt-3 pb-8 gap-6 flex flex-col h-[173px]">
        <div className="flex gap-2 items-center ">
          <p className="text-base text-[#FFFF] font-mochi text-center">max</p>
          <p className="text-base text-[#FFFF] font-mochi text-center ">
            0 $NUD
          </p>
        </div>
        <div className="w-full items-center gap-2 flex">
          <input
            className="text-xl text-[#9F4C4C] font-mochi bg-transparent outline-none placeholder-[#FFFFFF] w-[20%]"
            type="text"
            inputMode="numeric"
            placeholder="0.00 "
          />
          <p className="text-xl text-[#FFFFFF] font-mochi">$NUD</p>
        </div>

        <p className="text-base text-[#9F4C4C] font-mochi">~0.00 USD</p>
      </div>
      <div className="rounded-2xl bg-[#E81919] flex h-[62px] items-center justify-center   ">
        <p className="text-lg text-[#FFFFFF] font-mochi">Send</p>
      </div>
    </main>
  );
}
