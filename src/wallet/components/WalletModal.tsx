import { WalletConnectModal } from '@walletconnect/modal';
import { useEffect, useState } from 'react';
import { useConnect, useConnectors } from 'wagmi';
import { cn, pressable, text as themeText } from '../../styles/theme';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string; // Add as param in Provider?
}

export function WalletModal({
  isOpen,
  onClose,
  projectId,
}: WalletModalProps) {
  const { connect } = useConnect();
  const connectors = useConnectors();

  const [modal] = useState(() => {
    if (typeof window === 'undefined') return null;

    return new WalletConnectModal({
      projectId,
      chains: ['1', '8453'],
      explorerRecommendedWalletIds: [],
      explorerExcludedWalletIds: [],
      themeMode: 'light',
      enableExplorer: true,
      mobileWallets: [],
      desktopWallets: [],
      walletImages: {},
      privacyPolicyUrl: undefined,
      termsOfServiceUrl: undefined,
    });
  });

  const handleOtherWallets = async () => {
    try {
      if (modal) {
        await modal.openModal();

        const unsubscribe = modal.subscribeModal(({ open }) => {
          if (!open) {
            onClose();
          }
        });

        // Store unsubscribe function for cleanup
        return unsubscribe;
      }
    } catch (error) {
      console.error('Failed to open modal:', error);
    }
  };

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (modal) {
      unsubscribe = modal.subscribeModal(({ open }) => {
        if (!open) {
          onClose();
        }
      });
    }

    return () => {
      if (modal) {
        modal.closeModal();
        unsubscribe?.();
      }
    };
  }, [modal]);

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

        {/* Modified Other wallets button */}
        <button
          onClick={handleOtherWallets}
          className={cn(pressable.primary, themeText.body, 'w-full')}
        >
          Other wallets
        </button>
      </div>
    </div>
  );
}
