import React from 'react';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({ to, children, className, onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent the browser from doing a full page reload, which is the cause of the error.
    e.preventDefault();
    
    // If an onClick prop is passed, call it. This is useful for closing the mobile menu.
    if (onClick) {
        onClick();
    }
    
    // Manually update the hash. The `hashchange` listener in App.tsx will detect this
    // and render the correct page component.
    window.location.hash = to;
  };

  // The href is still set to maintain accessibility and standard browser behaviors
  // like "open in new tab" or copying the link address.
  return (
    <a href={`#${to}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
