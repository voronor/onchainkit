import { useTheme } from '../contexts/Theme.tsx';
import { Icon } from './Icon.tsx';

export default function InstallationOptions() {
  const { theme } = useTheme();
  return (
    <div className="grid grid-cols-2 gap-4">
      <InstallationFramework
        name="Vite"
        href="/installation/vite"
        theme={theme}
      />
      <InstallationFramework
        name="Remix"
        href="/installation/remix"
        theme={theme}
      />
      <InstallationFramework
        name="Astro"
        href="/installation/astro"
        theme={theme}
      />
    </div>
  );
}

type FrameworkProps = {
  name: string;
  href: string;
  theme: string;
};

function InstallationFramework({ name, href, theme }: FrameworkProps) {
  return (
    <a
      href={href}
      className="border-2 border-gray-200 rounded-md m-2 hover:bg-zinc-100 dark:hover:bg-zinc-900"
    >
      <div className="flex flex-col items-center gap-2 py-10">
        <Icon
          name={name.toLowerCase()}
          color={theme === 'dark' ? 'white' : 'black'}
          width="40"
          height="40"
        />
        <span>{name}</span>
      </div>
    </a>
  );
}
