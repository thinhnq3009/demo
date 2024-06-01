import Image from 'next/image';
import { useContext, useMemo } from 'react';
import { GlobalContext } from '@/components/context/GlobalContextProvider';

export type ProfileProps = {};

export default function Profile() {

  const {
    loggedUser: [user],
  } = useContext(GlobalContext);

  const avatarUrl = useMemo(() => !user?.photo_url ? '/assets/avatar/avt-2.jpg' : user?.photo_url, [user?.photo_url]);

  // className="flex gap-1.5 py-1.5 px-2 w-full h-[52px] text-white bg-[url('/assets/rect/rect-avt.svg')] bg-no-repeat">
  // <Image className="border-image-orange rounded-full" width={64} height={64} src={avatarUrl} alt={'Avatar'}/>
  return <div className='relative'>
    <Image className="border-yellow-100 border-2 rounded-full absolute -top-1.5 left-0 z-10" width={80} height={80}
           src={avatarUrl} alt={'Avatar'}/>
    <div
      className="ml-[40px] mb-1 pl-[46px] flex items-center gap-1.5 py-1.5 px-2 h-[52px] text-white w-[calc(100%-40px)] bg-right bg-blue-400 bg-[url('/assets/bg/bg-infor.svg')] bg-transparent bg-no-repeat">
      {/* <div className="font-mochi text-2xs">{user?.full_name}</div> */}
      <div className='overflow-x-auto flex-1'>
        <div className="font-mochi text-xs truncate mb-0.5">{user?.full_name || 'undefined'}</div>
        <div className={'text-[8px]'}>lv.99</div>
      </div>
      <div className="min-w-[170px] pl-[24px] flex gap-2.5">
        <div className="flex-1 flex items-center relative">
          <Image width={36} height={36} className='absolute -left-2' src={'/assets/item/coin.svg'} alt={'Coin'}/>
          <span className="text-xs rounded-xl bg-gray-700 w-full h-[24px] pl-8 flex items-center">{100}</span>
        </div>
        <div className="flex-1 flex gap-0.5 items-center relative">
          <Image width={36} height={36} className='absolute -left-2' src={'/assets/item/ton.svg'} alt={'Coin'}/>
          <span className="text-xs rounded-xl bg-gray-700 w-full h-[24px] pl-8 flex items-center">{100}</span>
        </div>
      </div>
    </div>
    <div className="pl-[50px] pr-[90px]">
      <div
        className='relative rounded-2xl h-[14px] border-[1px] border-[#776244] text-[8px] text-center text-white font-mochi overflow-hidden'>
        <div
          className="absolute h-full top-0 left-0 bg-gradient-to-b from-[#b0e5c7] to-[#5bc476] rounded-2xl z-0"
          style={{ width: '90%' }}>
        </div>
        <span className='z-50 relative'>2342/10000</span>
      </div>
    </div>
  </div>;
}

// background: linear-gradient(180deg, #B0E5C7 46%, #5BC476 46.76%);
