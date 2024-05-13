import WalletHeader from '@/components/common/header/Wallet';
import WalletDropDownSimple, { WalletDropdownMenuData } from '@/components/common/WalletDropDown';

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
  return (
    <main className="  px-2 gap-6 flex flex-col ">
      <WalletHeader title="Buy token" href="/wallet" />
      <p className="text-base font-mochi text-[#FFFFFF]">Select a token</p>
      <WalletDropDownSimple
        data={coin}
        title="$NUD"
        href="/assets/item/nud.svg"
      />
      <p className="text-base font-mochi text-[#FFFFFF]">
        Select a your current
      </p>
      <WalletDropDownSimple data={currency} title="USD" />
      <p className="text-base font-mochi text-[#FFFFFF]">Specify the amount</p>
      <div className="w-full  bg-[#4E1724] rounded-3xl px-8 pt-3 pb-10 gap-6  flex flex-col">
        <div className="flex items-end gap-2">
          <input
            className="text-4xl text-[#D9D9D9] font-mochi bg-transparent outline-none placeholder-[#D9D9D9] w-[35%]"
            type="text"
            inputMode="numeric"
            placeholder="0.00 "
          />
          <p className="text-base text-[#D9D9D9] font-mochi  ">NUD</p>
        </div>

        <p className="text-base text-[#9F4C4C] font-mochi ">~0.00 USD</p>
      </div>
      <div className="w-full justify-between items-start flex">
        <p className="text-base font-mochi text-[#FFFFFF]">Receiving:</p>
        <div className="flex flex-col">
          <p className="text-base text-[#FFFFFF] font-mochi text-center ">
            0.00 $NUD
          </p>
          <p className="text-base text-[#9F4C4C] font-mochi ">~0.00 USD</p>
        </div>
      </div>
      <div className="rounded-2xl bg-[#4E1724] flex px-6 py-10 items-center justify-center   ">
        <p className="text-base text-[#FFFFFF] font-mochi font-bold ">
          Pay with xRocket
        </p>
      </div>
    </main>
  );
}
