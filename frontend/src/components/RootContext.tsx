import { createContext, useContext } from "react";
import RootStore from "../stores/RootStore";

export const RootContext = createContext<RootStore | null>(null);

export const useStores = () => {
    const context = useContext(RootContext)

    if (context === null) {
        throw new Error("Context error")
    }

    return context;
}