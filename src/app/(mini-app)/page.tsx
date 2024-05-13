import Profile from '@/components/common/header/Profile';
import ButtonImageSquare from '@/components/button/ButtonImageSquare';
import ModelPreview from '@/components/model/ModelPreview';
import InputChat from '@/components/input/InputChat';
import ButtonImageArrow from '@/components/button/ButtonImageArrow';
import CaseInfo from '@/components/common/CaseInfo';
import HomeMenu from '@/components/common/menu/HomeMenu';
import ChatPopup from '@/components/common/ChatPopup';
import Link from 'next/link';

const avt = '/assets/avatar/avt-2.jpg';


export default function HomePage() {
  return <div className="px-1 flex flex-col h-full">
        <header className="font-mochi flex justify-between">
            <Profile coin={100} avatar={avt} ton={100} username={'Username'}/>
            <div className="flex flex-col gap-2">
                <Link href="/wallet">
                <ButtonImageSquare image="\assets\item\wallet.svg" className="bg-[#2B0940]">Wallet</ButtonImageSquare>
                </Link>
                <ButtonImageSquare image="\assets\item\battle.svg" className="bg-[#971C01]">Battle</ButtonImageSquare>
            </div>
        </header>
        <main className="flex-1 relative">
            <ChatPopup/>
            <ModelPreview/>
        </main>
        <section className="text-center">
            <InputChat className="mb-2 mx-auto" placeholder={'Start typing ...'}/>
            <ButtonImageArrow className="mb-3" size={'lg'}>Play</ButtonImageArrow>
            <div className="flex gap-1.5 mb-6 justify-center">
                <ButtonImageArrow>For $NUD</ButtonImageArrow>
                <ButtonImageArrow>For $TON</ButtonImageArrow>
                <ButtonImageArrow>Free game</ButtonImageArrow>
            </div>
            <CaseInfo/>
            <HomeMenu/>
        </section>
    </div>;
}