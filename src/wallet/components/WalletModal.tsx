import { useConnect, useConnectors } from 'wagmi';
import { cn, pressable, text as themeText } from '../../styles/theme';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({
  isOpen,
  onClose,
}: WalletModalProps) {
  const { connect } = useConnect();
  const connectors = useConnectors();

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
            connect({ connector: connectors[1] });
            onClose();
          }}
          className={cn(pressable.primary, themeText.body, 'w-full mb-3')}
        >
          Base Wallet
        </button>

        {/* Other wallets button */}
        <button
          onClick={() => {
            // Find the WalletConnect connector
            const walletConnectConnector = connectors.find(
              (c) => c.name === 'WalletConnect'
            );
            if (walletConnectConnector) {
              connect({ connector: walletConnectConnector });
              onClose();
            }
          }}
          className={cn(pressable.primary, themeText.body, 'w-full')}
        >
          Other wallets
        </button>
      </div>
    </div>
  );
}
