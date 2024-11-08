import { useEffect, useState } from 'react';
import { useConnect, useConnectors } from 'wagmi';
import { cn, pressable, text as themeText } from '../../styles/theme';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connect } = useConnect();
  const connectors = useConnectors();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/50',
        !isOpen && 'hidden',
      )}
      onClick={() => onClose()}
    >
      <div
        className="bg-white rounded-2xl p-6 w-[320px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sign Up button */}
        <button
          onClick={() => {
            // WalletPreference.SMART_WALLET
            connect({ connector: connectors[0] });
            onClose();
          }}
          className={cn(pressable.primary, themeText.body, 'w-full mb-3')}
        >
          Sign Up
        </button>

        {/* Base Wallet button */}
        <button
          onClick={() => {
            // WalletPreference.EOA
            connect({ connector: connectors[1] });
            onClose();
          }}
          className={cn(pressable.primary, themeText.body, 'w-full mb-3')}
        >
          Base Wallet
        </button>

        {/*           
            Other Wallets - Opens WalletConnect 
              This should open the Reown (Wallet Connect) popup modal where users can connect to multiple wallets.
              Reown is built on top of wagmi so we might just use their connection hook?
           */}
        {/* Other wallets button */}
        <button
          onClick={() => {
            connect({ connector: connectors[0] });
            onClose();
          }}
          className={cn(pressable.primary, themeText.body, 'w-full')}
        >
          Other wallets
        </button>
      </div>
    </div>
  );
}
