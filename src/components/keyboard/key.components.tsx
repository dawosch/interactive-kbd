import './styles.css';

export function Key({ legend, x, y, active }: { legend: string; x: number; y: number; active: boolean }) {
  return (
    <div className={`key lightMode ${active ? 'active' : ''}`} style={{ top: `${y * 60}px`, left: `${x * 60}px` }}>
      <span>{legend}</span>
    </div>
  );
}
