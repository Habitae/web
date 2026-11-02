import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/manrope';
import './habilab.css';
import HabiMascot, { HABI_ANTICS, HABI_POOLS, type HabiAntic } from './components/habi/HabiMascot';

type Mood = 'welcome' | 'guide' | 'proud';

const MOODS: { id: Mood; label: string }[] = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'guide', label: 'Guide' },
  { id: 'proud', label: 'Proud' },
];

const LABELS: Record<HabiAntic, string> = {
  hatTip: 'Hat tip', wave: 'Wave', roofSlip: 'Roof slip', doubleHop: 'Double hop',
  peek: 'Peekaboo', spin: 'Turnaround', sneeze: 'Sneeze', bird: 'Birdie', rain: 'Rain',
  typing: 'Typing', overheat: 'Overheat', coffee: 'Coffee', think: 'Thinking', idea: 'Idea!',
  read: 'Paperwork', magnify: 'Magnifier', stamp: 'Stamp', sleepy: 'Sleepy', jump: 'Jump', backflip: 'Backflip',
  confetti: 'Confetti', dance: 'Dance', fireworks: 'Fireworks', moonwalk: 'Moonwalk', dizzy: 'Dizzy',
  bow: 'Bow', highFive: 'High five', sunglasses: 'Sunglasses', mail: 'Mail', doorbell: 'Doorbell',
  stretch: 'Stretch', paint: 'Paint', wink: 'Wink', calculator: 'Calculator', phone: 'On the phone',
  checklist: 'Checklist', tape: 'Tape measure', sweep: 'Sweep', keys: 'Keys', hammer: 'Hammer',
  water: 'Watering', juggle: 'Juggling', trophy: 'Trophy', medal: 'Medal', cartwheel: 'Cartwheel',
  balloon: 'Balloon', flag: 'Flag', drumroll: 'Drumroll', hearts: 'Hearts',
  arrive: 'Balloon arrival', depart: 'Balloon departure', hang: 'Hang on',
};

// An antic shared by several moods is shown under the first one that has it.
// arrive, depart and hang aren't in any pool: the app plays them on first start, when setup is
// done, and when Habi tears the stub off a redeemed access-code ticket.
const MOOD_OF = {
  arrive: 'welcome',
  depart: 'proud',
  hang: 'proud',
  ...Object.fromEntries([...MOODS].reverse().flatMap(({ id }) => HABI_POOLS[id].map((antic) => [antic, id]))),
} as Record<HabiAntic, Mood>;
const SPECIAL = new Set<HabiAntic>(['arrive', 'depart', 'hang']);

const ANTICS = Object.keys(HABI_ANTICS) as HabiAntic[];

function initialTheme(): 'light' | 'dark' {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function HabiLab() {
  const [theme, setTheme] = useState(initialTheme);
  const [filter, setFilter] = useState<Mood | 'all'>('all');
  const [heroMood, setHeroMood] = useState<Mood>('welcome');
  const shown = filter === 'all' ? ANTICS : ANTICS.filter((antic) => MOOD_OF[antic] === filter);

  return (
    <main className="habilab" data-theme={theme}>
      <div className="habilab-inner">
        <header className="habilab-hero">
          <button
            type="button"
            onClick={() => setHeroMood(MOODS[(MOODS.findIndex(({ id }) => id === heroMood) + 1) % MOODS.length].id)}
            style={{ border: 0, padding: 0, background: 'none', cursor: 'pointer' }}
            aria-label="Change Habi's mood"
          >
            <HabiMascot key={heroMood} size={180} mood={heroMood} framing="full" sequence={heroMood === 'welcome' ? 'arrive' : undefined} label="Habi" />
          </button>
          <div>
            <h1>Habi lab</h1>
            <p>
              You found Habi's hideout. Here are all {ANTICS.length} antics (counting the balloon trips and the ticket hang), each on a loop.
              In the app, Habi picks one at random every few seconds. Tap the big Habi to change its mood.
            </p>
          </div>
        </header>

        <nav className="habilab-toolbar" aria-label="Filters">
          <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All</button>
          {MOODS.map(({ id, label }) => (
            <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>
          ))}
          <button type="button" className="habilab-theme" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
        </nav>

        <section className="habilab-grid">
          {shown.map((antic) => (
            <div key={antic} className="habilab-card">
              <HabiMascot size={120} mood={MOOD_OF[antic]} antic={antic} framing="full" />
              <strong>{ANTICS.indexOf(antic) + 1}. {LABELS[antic]}</strong>
              <small>{SPECIAL.has(antic) ? 'Special' : MOODS.find(({ id }) => id === MOOD_OF[antic])?.label}</small>
            </div>
          ))}
        </section>

        <p className="habilab-footer">This stays between us. 🤫</p>
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<HabiLab />);
