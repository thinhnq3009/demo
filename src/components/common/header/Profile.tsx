import Image from 'next/image';
import { useContext, useMemo } from 'react';
import { GlobalContext } from '@/components/context/GlobalContextProvider';

export type ProfileProps = {};

export default function Profile() {

  const {
    loggedUser: [user],
  } = useContext(GlobalContext);

  const avatarUrl = useMemo(() => !user?.photo_url ? '/assets/avatar/avt-2.jpg' : user?.photo_url, [user?.photo_url]);

  return <div
    className="flex gap-1.5 py-1.5 px-2 w-[246px] h-[52px] text-white bg-[url('/assets/rect/rect-avt.svg')] bg-no-repeat">
    <Image className="border-image-orange" width={40} height={40} src={avatarUrl} alt={'Avatar'}/>
    <div className="flex flex-col justify-between">
      <div className="font-mochi text-2xs">{user?.full_name}</div>
      <div className="flex gap-2.5">
        <div className="flex gap-0.5">
          <Image width={10} height={10} src={'/assets/item/coin.svg'} alt={'Coin'}/>
          <span className="text-2xs">{0}</span>
        </div>
        <div className="flex gap-0.5">
          <Image width={10} height={10} src={'/assets/item/ton.svg'} alt={'Coin'}/>
          <span className="text-2xs">{0}</span>
        </div>
      </div>
    </div>
  </div>;
}