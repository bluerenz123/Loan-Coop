import { createContext, useContext, useState } from "react";

export const useAccountSource = () => {
  const [account, setAccount] = useState(null);

  return {
    account,
    setAccount,
  };
};

export const AccountContext = createContext({});
export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
  return (
    <AccountContext.Provider value={useAccountSource()}>
      {children}
    </AccountContext.Provider>
  );
};
