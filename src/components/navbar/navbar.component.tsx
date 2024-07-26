import './style.css';

export function Navbar({ title }: { title: string }) {
  return (
    <nav className="navbar">
      <a href="/">{title}</a>
    </nav>
  );
}
