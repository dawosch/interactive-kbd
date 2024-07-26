import './styles.css';

export function Key({ value, x, y, active }: { value?: { legend: string; shift?: string; lower?: string }; x: number; y: number; active: boolean }) {
  return (
    <div className={`key lightMode ${active ? 'active' : ''}`} style={{ top: `${y * 60}px`, left: `${x * 60}px` }}>
      <span>{value?.shift}</span>
      <span>{value?.legend}</span>
      <span>{value?.lower}</span>
    </div>
  );
}
