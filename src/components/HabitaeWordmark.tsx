import './HabitaeWordmark.css';

export default function HabitaeWordmark({ className = '', inverse = false, label = 'Habitae' }: { className?: string; inverse?: boolean; label?: string }) {
  return <strong className={`habitae-wordmark${inverse ? ' habitae-wordmark-inverse' : ''}${className ? ` ${className}` : ''}`} role="img" aria-label={label} translate="no">habit<b>ae</b></strong>;
}
