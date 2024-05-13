"user client";
import WalletHeader from "@/components/common/header/Wallet";
import WalletDropDownSimple, {
  WalletDropdownMenuData,
} from "@/components/common/WalletDropDown";

export const Coin: WalletDropdownMenuData[] = [
  {
    title: "Toncoin",
    value: 2,
    imageUrl: "/assets/item/ton.svg",
  },
  {
    title: "$NUD",
    value: 1,
    imageUrl: "/assets/item/nud.svg",
  },
];
export const currency: WalletDropdownMenuData[] = [
  {
    title: "USD",
    value: 1,
  },
  {
    title: "EUR",
    value: 2,
  },
];

export default function SendWalletPage() {
  return (
    <main className="gap-6 flex flex-col px-2">
      <WalletHeader title="Withdrawals" href="/wallet" />
      <p className="text-lg font-mochi text-[#FFFFFF] ">
        1. Choose the withdrawing asset
      </p>
      <div className="w-full h-auto">
        <WalletDropDownSimple
          title="$NUD"
          href="/assets/item/nud.svg"
          data={Coin} // Truyền danh sách menu vào component
        />
      </div>

      <p className="text-lg font-mochi text-[#FFFFFF] ">
        2. Enter the receptionist’s address
      </p>
      <div className="w-full flex items-center justify-between rounded-3xl bg-[#4E1724] px-6 py-6">
        <input
          className="text-lg text-[#FFFFFF] font-mochi bg-transparent placeholder-[#9F4C4C] outline-none w-[70%]"
          placeholder="Recipient address"
        />
        <p className="text-lg text-[#FFFFFF] font-mochi cursor-pointer">
          Paste
        </p>
      </div>

      <p className="text-lg font-mochi text-[#FFFFFF] ">3. Enter the amount</p>
      <div className="bg-[#4E1724] rounded-3xl px-8 pt-3 pb-8 gap-6 flex flex-col">
        <div className="flex gap-2 items-center ">
          <p className="text-base text-[#FFFF] font-mochi text-center">max</p>
          <p className="text-base text-[#FFFF] font-mochi text-center ">
            0 $NUD
          </p>
        </div>
        <div className="w-full items-center gap-2 flex">
          <input
            className="text-xl text-[#9F4C4C] font-mochi bg-transparent outline-none placeholder-[#9F4C4C] w-[20%]"
            type="text"
            inputMode="numeric"
            placeholder="0.00 "
          />
          <p className="text-xl text-[#9F4C4C] font-mochi">$NUD</p>
        </div>

        <p className="text-base text-[#9F4C4C] font-mochi">~0.00 USD</p>
      </div>
      <div className="rounded-2xl bg-[#4E1724] flex px-6 py-6 items-center justify-center   ">
        <p className="text-base text-[#FFFFFF] font-mochi font-bold ">Send</p>
      </div>
    </main>
  );
}
