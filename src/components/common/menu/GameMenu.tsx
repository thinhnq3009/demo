export default function GameMenu() {
  return <div className="w-[430px] h-[82px] bg-[url('/assets/bottom_menu/nav_bg.png')] bg-no-repeat bg-bottom">
    <div className="w-full flex justify-around items-center">
      <div
        className="bg-[url('/assets/icon/ic_character.png')] bg-top bg-no-repeat bg-[length:54px_54px] w-[56px]">
        <div className={'font-mochi text-sm text-white pt-[52px]'}>Hero</div>
      </div>
      <div
        className="bg-[url('/assets/icon/ic_upgrade.png')] bg-top bg-no-repeat bg-[length:54px_54px] w-[56px]">
        <div className={'font-mochi text-sm text-white pt-[52px]'}>Upgrade</div>
      </div>
      <div
        className="bg-[url('/assets/icon/ic_battle.png')] bg-top bg-no-repeat bg-[length:54px_54px] w-[56px]">
        <div className={'font-mochi text-sm text-white pt-[52px]'}>Battle</div>
      </div>
      <div
        className="bg-[url('/assets/icon/ic_pray.png')] bg-top bg-no-repeat bg-[length:54px_54px] w-[56px]">
        <div className={'font-mochi text-sm text-white pt-[52px]'}>Pray</div>
      </div>
      <div
        className="bg-[url('/assets/icon/ic_market.png')] bg-top bg-no-repeat bg-[length:54px_54px] w-[56px]">
        <div className={'font-mochi text-sm text-white pt-[52px]'}>Market</div>
      </div>
    </div>
  </div>;
}