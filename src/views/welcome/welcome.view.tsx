import { Heading, Link, Paragraph } from 'evergreen-ui';
import './style.css';

export function Welcome() {
  return (
    <div className="welcome">
      <Heading className="title" size={800} marginY={16}>
        Interactive KBD
      </Heading>

      <Paragraph size={500}>Interactive KBD is a tool for learning your new keyboard layout.</Paragraph>
      <Paragraph size={500}>
        To get it work have a look{' '}
        <Link href="https://github.com/dawosch/interactive-kbd" size={500} target="_blank">
          here
        </Link>
      </Paragraph>
    </div>
  );
}
