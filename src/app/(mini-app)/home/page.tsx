import Profile from '@/components/common/header/Profile';
import ButtonImage from '@/components/button/ButtonImage';

const avt = '/assets/avatar/avt-2.jpg';

export default function HomePage() {
  return <div className="px-1">
        <header className="font-mochi flex justify-between">
            <Profile coin={100} avatar={avt} ton={100} username={'Username'}/>
            <div className="flex flex-col gap-2">
                <ButtonImage image="\assets\item\wallet.svg" className="bg-[#2B0940]">Wallet</ButtonImage>
                <ButtonImage image="\assets\item\battle.svg" className="bg-[#971C01]">Battle</ButtonImage>
            </div>
        </header>
        <main>
            Model 3D here
        </main>
        <section>

        </section>
    </div>;
}