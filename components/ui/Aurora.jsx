'use client';

export default function Aurora({
  colorStops = ['#5227FF', '#7cff67', '#5227FF'],
  amplitude = 1,
  blend = 0.5,
  className = '',
}) {
  const [first = '#5227FF', second = '#7cff67', third = '#5227FF'] = colorStops;

  const style = {
    '--aurora-stop-1': first,
    '--aurora-stop-2': second,
    '--aurora-stop-3': third,
    '--aurora-amplitude': String(amplitude),
    '--aurora-blend': String(blend),
  };

  return (
    <div className={`aurora ${className}`.trim()} style={style}>
      <div className="aurora__layer aurora__layer--a" />
      <div className="aurora__layer aurora__layer--b" />
      <div className="aurora__layer aurora__layer--c" />
    </div>
  );
}
