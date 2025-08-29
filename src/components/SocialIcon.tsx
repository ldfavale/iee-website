import { ReactNode } from 'react';

interface SocialIconProps {
  href: string;
  children: ReactNode;
}

const SocialIcon = ({ href, children }: SocialIconProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group rounded-full bg-gray-700 p-3 transition-colors duration-300 ease-in-out hover:bg-iee-yellow"
  >
    <div className="h-6 w-6 text-white transition-colors duration-300 ease-in-out group-hover:text-black">
      {children}
    </div>
  </a>
);

export default SocialIcon;
