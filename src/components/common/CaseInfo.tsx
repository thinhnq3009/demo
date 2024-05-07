import Image from 'next/image';
import ButtonImageArrow from '@/components/button/ButtonImageArrow';

export default function CaseInfo() {
  return <div className="flex gap-x-8">
        <div className="w-[100px] h-[100px] relative">
            <Image fill src="/assets/item/red-case.svg" alt="Red Case"/>
        </div>
        <div>
            <div className="font-mochi text-sm text-white">Red Case</div>
            <div className="flex gap-0.5">
                <Image width={24} height={24} src="/assets/item/fire-ball.svg" alt={'Fire Ball'}/>
                <Image width={24} height={24} src="/assets/item/fire-ball.svg" alt={'Fire Ball'}/>
                <Image width={24} height={24} src="/assets/item/fire-ball.svg" alt={'Fire Ball'}/>
            </div>
            <ButtonImageArrow size={'md'}>Buy Case</ButtonImageArrow>
        </div>
    </div>;
}