'use client';


const signals = [
  ['+185%', 'Organic engagement'],
  ['3.6x', 'ROAS'],
  ['12.4k', 'Waitlist signups'],
  ['320+', 'Qualified leads'],
];

export default function HeroTicker() {

  return (
    <div className="hero-ticker" role="region" aria-label="Selected performance outcomes">
      <div className="hero-ticker-window">
        <div className="hero-ticker-track">
          {[0, 1].map(copy => (
            <div key={copy} className="hero-ticker-set" aria-hidden={copy === 1}>
              {signals.map(([value, label]) => (
                <span key={label} className="hero-ticker-item">
                  <strong>{value}</strong>{label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
