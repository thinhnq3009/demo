import classNames from 'classnames';
import Image from 'next/image';

type HomeMenuItemProps = {
  image: string;
  children: string;
};
export default function HomeMenuItem({ image, children }: HomeMenuItemProps) {
  return <div
        className={classNames("w-[98px] h-[67px] flex flex-col items-center justify-between py-2 first:bg-[url('/assets/item/menu-item-left.svg')] bg-[url('/assets/item/menu-item-center.svg')] last:bg-[url('/assets/item/menu-item-right.svg')]")}>
        <Image width={35} height={35} src={image} alt={'Item'}/>
        <span className="font-mochi text-2xs text-white">{children}</span>
    </div>;
}                                                                                                                                       