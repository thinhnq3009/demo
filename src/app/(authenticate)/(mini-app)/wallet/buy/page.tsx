'use client';
import WalletHeader from '@/components/common/header/Wallet';
import WalletDropDownSimple, {
  WalletDropdownMenuData,
} from '@/components/common/WalletDropDown';
import { useState } from 'react';

const token: WalletDropdownMenuData[] = [
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
const currency: WalletDropdownMenuData[] = [
  {
    title: 'USD',
    value: 1,
  },
  {
    title: 'EUR',
    value: 2,
  },
];
export default function BuyWalletPage() {
  const [selectedToken, setSelectedToken] = useState<string>('$NUD');
  const [selectedCurrency, setSelectedCurency] = useState<string>('USD');
  const dropdownToken = token?.map((token) => ({
    title: token.title,
    value: token.value,
    imageUrl: token.imageUrl,
  }));
  const dropdownCurrency = currency?.map((cu) => ({
    title: cu.title,
    value: cu.value,
  }));
  const handleTokenChange = (selected: WalletDropdownMenuData) => {
    setSelectedToken(selected.title);
  };
  const handleCurrencyChange = (selected: WalletDropdownMenuData) => {
    setSelectedCurency(selected.title);
  };

  return (
    <main className="  px-2 gap-6 flex flex-col ">
      <WalletHeader title="Buy token" href="/wallet" />
      <p className="text-lg font-mochi text-[#FFFFFF]">Select a token</p>
      <WalletDropDownSimple
        data={dropdownToken}
        title="$NUD"
        href="/assets/item/nud.svg"
        onChange={handleTokenChange}
      />
      <p className="text-lg font-mochi text-[#FFFFFF]">
        Select a your current
      </p>
      <WalletDropDownSimple data={dropdownCurrency} title="USD" onChange={handleCurrencyChange} />
      <p className="text-lg font-mochi text-[#FFFFFF]">Specify the amount</p>
      <div className="w-full  bg-[#4E1724] rounded-3xl px-8 h-[166px] py-4 gap-16 flex flex-col">
        <div className="flex items-end gap-2">
          <input
            className="text-4xl text-[#D9D9D9] font-mochi bg-transparent outline-none placeholder-[#D9D9D9] w-[35%]"
            type="text"
            inputMode="numeric"
            placeholder="0.00 "
          />
          <p className="text-base text-[#D9D9D9] font-mochi  ">{selectedToken}</p>
        </div>

        <p className="text-base text-[#9F4C4C] font-mochi ">~0.00 {selectedCurrency}</p>
      </div>
      <div className="w-full justify-between items-start flex">
        <p className="text-lg font-mochi text-[#FFFFFF]">Receiving</p>
        <div className="flex flex-col gap-2">
          <p className="text-base text-[#FFFFFF] font-mochi text-center ">
            0.00 {selectedToken}
          </p>
          <p className="text-base text-[#9F4C4C] font-mochi ">~0.00 {selectedCurrency}</p>
        </div>
      </div>
      <div className="rounded-2xl bg-[#E81919] flex h-[91px] items-center justify-center   ">
        <p className="text-lg text-[#FFFFFF] font-mochi  ">
          Pay with xRocket
        </p>
      </div>
    </main>
  );
}
