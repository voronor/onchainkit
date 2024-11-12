import { useConnect, useConnectors } from 'wagmi';
import { defaultAvatarSVG } from '../../internal/svg/defaultAvatarSVG';
import {
  background,
  border,
  cn,
  color,
  line,
  pressable,
  text,
} from '../../styles/theme';
import { useOnchainKit } from '../../useOnchainKit';

const BaseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1630_9119)">
      <path
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
        fill="#0052FF"
      />
      <path
        d="M7.98259 13C10.744 13 12.9826 10.7614 12.9826 8C12.9826 5.23858 10.744 3 7.98259 3C5.36271 3 3.21345 5.01496 3 7.57971H9.60886V8.42029H3C3.21345 10.985 5.36271 13 7.98259 13Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1630_9119">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const WalletConnectIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_1630_9125"
      style={{ maskType: 'luminance' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="16"
      height="16"
    >
      <path d="M0 0H16V16H0V0Z" fill="white" />
    </mask>
    <g mask="url(#mask0_1630_9125)">
      <path
        d="M15.5195 8.02002C15.5195 12.1622 12.1617 15.52 8.01953 15.52C3.8774 15.52 0.519531 12.1622 0.519531 8.02002C0.519531 3.87788 3.8774 0.52002 8.01953 0.52002C12.1617 0.52002 15.5195 3.87788 15.5195 8.02002Z"
        fill="#3396FF"
        stroke="#66B1FF"
      />
      <path
        d="M4.91197 5.97351C6.6279 4.30017 9.41005 4.30017 11.126 5.97351L11.3325 6.1749C11.4183 6.25855 11.4183 6.39421 11.3325 6.47785L10.6261 7.16678C10.5831 7.2086 10.5136 7.2086 10.4707 7.16678L10.1865 6.88964C8.9894 5.72229 7.04855 5.72229 5.85143 6.88964L5.54707 7.18643C5.50417 7.22825 5.43463 7.22825 5.39173 7.18643L4.68528 6.4975C4.59946 6.41385 4.59946 6.2782 4.68528 6.19455L4.91197 5.97351ZM12.587 7.39824L13.2158 8.01137C13.3016 8.09502 13.3016 8.23068 13.2158 8.31433L10.3807 11.079C10.2949 11.1627 10.1558 11.1627 10.07 11.079L8.05783 9.11685C8.03638 9.09592 8.00161 9.09592 7.98016 9.11685L5.96801 11.079C5.88223 11.1627 5.74312 11.1627 5.65731 11.079L2.82216 8.31429C2.73636 8.23064 2.73636 8.09498 2.82216 8.01133L3.45091 7.3982C3.53671 7.31455 3.67582 7.31455 3.76161 7.3982L5.7738 9.36038C5.79525 9.38131 5.83002 9.38131 5.85147 9.36038L7.86358 7.3982C7.94936 7.31451 8.08847 7.31451 8.17428 7.3982L10.1865 9.36038C10.2079 9.38131 10.2427 9.38131 10.2641 9.36038L12.2763 7.39824C12.3621 7.31455 12.5012 7.31455 12.587 7.39824Z"
        fill="white"
      />
    </g>
  </svg>
);

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connect } = useConnect();
  const connectors = useConnectors();
  const { config } = useOnchainKit();

  const appLogo = config?.appearance?.logo;
  const appName = config?.appearance?.name;
  const privacyPolicyUrl =
    config?.wallet?.privacyUrl ?? 'https://base.org/privacy-policy';
  const termsOfServiceUrl =
    config?.wallet?.termsUrl ?? 'https://base.org/terms-of-service';

  return (
    <div
      className={cn(
        `${background.default}/50`,
        'fixed inset-0 z-50 flex items-start justify-center',
        !isOpen && 'hidden',
      )}
      onClick={() => onClose()}
    >
      <div
        className={cn(
          border.radius,
          background.default,
          line.default,
          'mt-[116px] h-[390px] w-[323px] p-6 pb-4',
          'border-x-0 border-t border-b-0',
          'flex flex-col gap-4',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {(appLogo || appName) && (
          <div className='flex h-[116px] w-[275px] flex-col items-center gap-3 self-stretch'>
            {appLogo && (
              <div
                className={cn(border.radius, 'mb-2 h-14 w-14 overflow-hidden')}
              >
                <img
                  src={appLogo}
                  alt={`${appName || 'App'} icon`}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            {appName && (
              <h2
                className={cn(
                  text.title3,
                  color.foreground,
                  'font-dmSans font-semibold',
                )}
              >
                {appName}
              </h2>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              connect({ connector: connectors[0] });
              onClose();
            }}
            className={cn(
              background.default,
              border.radiusInner,
              line.default,
              text.label2,
              pressable.default,
              color.foreground,
              'h-10 w-[275px]',
              'px-4 py-2.5',
              'border border-[#D1D5DB]',
              'flex items-center justify-between',
              'text-left',
            )}
          >
            Sign Up
            <div className='h-4 w-4'>{defaultAvatarSVG}</div>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={cn(line.default, 'w-full')} />
            </div>
            <div className="relative flex justify-center">
              <span
                className={cn(
                  background.default,
                  color.foregroundMuted,
                  text.legal,
                  'px-2',
                )}
              >
                or continue with an existing wallet
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              connect({ connector: connectors[1] });
              onClose();
            }}
            className={cn(
              border.radiusInner,
              line.default,
              text.label2,
              pressable.default,
              color.inverse,
              color.foreground,
              'h-[40px] w-[275px]',
              'px-4 py-2.5',
              'border-x-0 border-t border-b-0',
              'flex items-center justify-between',
              'text-left',
            )}
          >
            Base Wallet
            <BaseIcon />
          </button>

          <button
            onClick={() => {
              const walletConnectConnector = connectors.find(
                (c) => c.name === 'WalletConnect',
              );
              if (walletConnectConnector) {
                connect({ connector: walletConnectConnector });
                onClose();
              }
            }}
            className={cn(
              border.radiusInner,
              line.default,
              text.label2,
              pressable.default,
              color.inverse,
              color.foreground,
              'h-[40px] w-[275px]',
              'px-4 py-2.5',
              'border-x-0 border-t border-b-0',
              'flex items-center justify-between',
              'text-left',
            )}
          >
            Other wallets
            <WalletConnectIcon />
          </button>
        </div>

        <div
          className={cn(
            color.foregroundMuted,
            text.legal,
            'flex flex-row items-center justify-center gap-2.5 px-4',
            'h-[26px] w-[275px]',
            'text-center',
          )}
        >
          <span className='flex-grow font-normal text-[10px] leading-[13px]'>
            By connecting a wallet, you agree to our{' '}
            <a
              href={termsOfServiceUrl}
              className={cn(color.primary, 'hover:underline')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href={privacyPolicyUrl}
              className={cn(color.primary, 'hover:underline')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            .
          </span>
        </div>
      </div>
    </div>
  );
}
