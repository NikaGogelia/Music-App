import { createContext, useContext } from "react";

const LikeContext = createContext();

function LikeContextProvider({ children, refetch }) {
  return (
    <LikeContext.Provider value={{ refetch }}>{children}</LikeContext.Provider>
  );
}

export default LikeContextProvider;
export const useLikeContext = () => {
  return useContext(LikeContext);
};
