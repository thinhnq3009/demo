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
    <Image className="border-yellow-100 border-2 rounded-full absolute -top-1.5 left-0 z-10" width={64} height={64} src={avatarUrl} alt={'Avatar'}/>
    <div className="absolute right-0 pl-14 flex items-center gap-1.5 py-1.5 px-2 h-[52px] text-white w-[364px] bg-blue-400 bg-[url('/assets/bg/bg-infor.svg')] bg-transparent bg-no-repeat">
      {/* <div className="font-mochi text-2xs">{user?.full_name}</div> */}
      <div className="font-mochi text-xs">Yokosan</div>
    <div className="pl-[24px] flex flex-col justify-between">
      <div className="flex gap-2.5">
        <div className="flex items-center relative">
          <Image width={36} height={36} className='absolute -left-2' src={'/assets/item/coin.svg'} alt={'Coin'}/>
          <span className="text-xs rounded-xl bg-gray-700 w-[90px] h-[24px] pl-8 flex items-center">{100}</span>
        </div>
        <div className="flex gap-0.5 items-center relative">
          <Image width={36} height={36} className='absolute -left-2' src={'/assets/item/ton.svg'} alt={'Coin'}/>
          <span className="text-xs rounded-xl bg-gray-700 w-[90px] h-[24px] pl-8 flex items-center">{100}</span>
        </div>
      </div>
    </div>
    </div>
  </div>;
}