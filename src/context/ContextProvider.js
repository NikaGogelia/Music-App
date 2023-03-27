import GlobalContextProvider from "./GlobalContext";

function ContextProvider({ children }) {
  return (
    <>
      <GlobalContextProvider>{children}</GlobalContextProvider>
    </>
  );
}

export default ContextProvider;
