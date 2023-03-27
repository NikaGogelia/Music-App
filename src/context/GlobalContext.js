import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const apiToken =
    "BQA4KutvkOhFxD7Uw8G9i-C2PvIDE8X5fhYpK8sdAgmewYemHUB8dD7V2j70lvMs54fEBj8E7yNLvA4MFkrPQqNjDzI4G1br-Y5dREa5wTBjr_-JRmMt9xgjzVabolZW7W8iJWPHBUgV2GxXjgnM38855gWGnxUq9w7WZK9StbYeJ-V-5aHfyxmOBeyljQs6rwes9Hk0i2pzjaxy0tkluf1ZxuSj_6PBWDxr2m6AtZaqkhUxb3laKcUhyhlWDP7ZtknrGjizDrtz-jw2iYWrk3pfvTamBcEQWgPw1aqgLyCzxJOUVXkUyxynp392AFCLrNaHvMXIm9YW6A";

  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
}

export default GlobalContextProvider;
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
