import {createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState} from "react";
import {SetState} from "zustand";

type HomeContextType = {
    messageResponse: [string, Dispatch<SetStateAction<string>>]
}

export const HomeContext = createContext<HomeContextType>({
    messageResponse: ["", () => {
    }]
});

export default function HomeContextProvider({children}: {
    children: ReactNode
}) {
    // Show status for xs screen
    const [isShowSidebarMd, setIsShowSidebarMd] = useState<string>("")

    const value: HomeContextType = useMemo(() => ({
        messageResponse: [isShowSidebarMd, setIsShowSidebarMd],
    }), [])

    return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>
}
