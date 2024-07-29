import { Heading, Pane } from 'evergreen-ui';
import { PropsWithChildren } from 'react';

export function Navbar({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <nav className="navbar">
      <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
        <Pane alignItems="center" display="flex">
          <Heading size={600}>{title}</Heading>
        </Pane>

        {children}
      </Pane>
    </nav>
  );
}
