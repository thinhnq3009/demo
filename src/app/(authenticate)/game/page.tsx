import dynamic from "next/dynamic";

const GameAppWithoutSSR = dynamic(() => import("./game"), { ssr: false });

export  default  function GamePage () {
    return <GameAppWithoutSSR/>
}