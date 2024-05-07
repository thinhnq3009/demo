import Image from 'next/image';

export type ProfileProps = {
  avatar: string; username: string; coin: number; ton: number;
};

export default function Profile({ avatar, ton, username, coin }: ProfileProps) {
  return <div
        className="flex gap-1.5 py-1.5 px-2 w-[246px] h-[52px] text-white bg-[url('/assets/rect/rect-avt.svg')] bg-no-repeat">
        <Image className="border-image-orange" width={40} height={40} src={avatar} alt={username}/>
        <div className="flex flex-col justify-between">
            <div className="font-mochi text-2xs">{username}</div>
            <div className="flex gap-2.5">
                <div className="flex gap-0.5">
                    <Image width={10} height={10} src={'/assets/item/coin.svg'} alt={'Coin'}/>
                    <span className="text-2xs">{coin}</span>
                </div>
                <div className="flex gap-0.5">
                    <Image width={10} height={10} src={'/assets/item/ton.svg'} alt={'Coin'}/>
                    <span className="text-2xs">{ton}</span>
                </div>
            </div>
        </div>
    </div>;
}