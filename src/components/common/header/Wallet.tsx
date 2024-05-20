import { TonConnectButton } from '@tonconnect/ui-react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export type WalletProps = {
  title: string;
  href: string;
};

export default function WalletHeader({ title, href }: WalletProps) {
  return (
    <div className="flex items-center justify-between ">
  <Link
    className="border border-[#4E1724] bg-[#4E1724] rounded-2xl w-14 h-10 flex items-center justify-center"
    href={href}
  >
    <FaArrowLeft className="w-6 h-5 text-white" />
  </Link>
  <p className="text-xl font-mochi text-[#FFFFFF] flex-1 text-center">
    {title}
  </p>
    <TonConnectButton  className='w-10 h-10'/>
</div>

  );
}
