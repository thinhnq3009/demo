import classNames from 'classnames';
import Link from 'next/link';

function MenuItem({ className, text }: { className: string, text: string }) {
  return <Link href={{ href: '/game', query: { tab: text.toLowerCase() } }}>
    <div
      className={classNames('bg-top bg-no-repeat bg-[length:54px_54px] w-[56px] cursor-pointer hover:-translate-y-1 ease-in-out duration-100', className)}>
      <div className={'font-mochi text-sm text-white pt-[52px]'}>{text}</div>
    </div>
  </Link>;
}

export default function GameMenu() {
  return <div className="w-[430px] h-[82px] bg-[url('/assets/bottom_menu/nav_bg.png')] bg-no-repeat bg-bottom">
    <div className="w-full flex justify-around items-center">
      <MenuItem className="bg-[url('/assets/icon/ic_character.png')]" text={'Hero'}/>
      <MenuItem className="bg-[url('/assets/icon/ic_upgrade.png')]" text={'Upgrade'}/>
      <MenuItem className="bg-[url('/assets/icon/ic_battle.png')]" text={'Battle'}/>
      <MenuItem className="bg-[url('/assets/icon/ic_pray.png')]" text={'Pray'}/>
      <MenuItem className="bg-[url('/assets/icon/ic_market.png')]" text={'Market'}/>
    </div>
  </div>;
}