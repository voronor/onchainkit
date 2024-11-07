  // const {
  //   config: { appearance, wallet } = {
  //     appearance: { name: undefined, logo: undefined }, 
  //     wallet: {
  //       display: undefined, // probably only need this in ConnectWallet, the rest of the parameters will be accessed in the WalletModel component.
  //       termsUrl: undefined,
  //       privacyUrl: undefined,
  //     },
  //   },
  // } = useOnchainKit();

import { type FC } from 'react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: FC<WalletModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return <h1>Hello</h1>;
};