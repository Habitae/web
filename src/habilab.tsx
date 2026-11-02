import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/manrope';
import './habilab.css';
import HabiMascot, { HABI_ANTICS, HABI_POOLS, type HabiAntic } from './components/habi/HabiMascot';

type Mood = 'welcome' | 'guide' | 'proud';

const MOODS: { id: Mood; label: string }[] = [
  { id: 'welcome', label: 'Boas-vindas' },
  { id: 'guide', label: 'Guia' },
  { id: 'proud', label: 'Orgulho' },
];

const LABELS: Record<HabiAntic, string> = {
  hatTip: 'Tirar o chapéu', wave: 'Acenar', roofSlip: 'Telhado escorrega', doubleHop: 'Dois saltos',
  peek: 'Espreitar', spin: 'Dar a volta', sneeze: 'Espirro', bird: 'Passarinho', rain: 'Chuva',
  typing: 'A escrever', overheat: 'Sobreaquecido', coffee: 'Café', think: 'A pensar', idea: 'Ideia!',
  read: 'Papelada', magnify: 'Lupa', stamp: 'Carimbo', sleepy: 'Sono', jump: 'Salto', backflip: 'Mortal',
  confetti: 'Confetes', dance: 'Dança', fireworks: 'Fogo de artifício', moonwalk: 'Moonwalk', dizzy: 'Tonto',
  bow: 'Vénia', highFive: 'Mais cinco', sunglasses: 'Óculos de sol', mail: 'Correio', doorbell: 'Campainha',
  stretch: 'Espreguiçar', paint: 'Pintar', wink: 'Piscar o olho', calculator: 'Calculadora', phone: 'Ao telefone',
  checklist: 'Lista de tarefas', tape: 'Fita métrica', sweep: 'Varrer', keys: 'Chaves', hammer: 'Martelo',
  water: 'Regar', juggle: 'Malabarismo', trophy: 'Troféu', medal: 'Medalha', cartwheel: 'Roda',
  balloon: 'Balão', flag: 'Bandeira', drumroll: 'Rufar', hearts: 'Corações',
  arrive: 'Chegada de balão', depart: 'Partida de balão',
};

// An antic shared by several moods is shown under the first one that has it.
// arrive and depart aren't in any pool: the app plays them on first start and when setup is done.
const MOOD_OF = {
  arrive: 'welcome',
  depart: 'proud',
  ...Object.fromEntries([...MOODS].reverse().flatMap(({ id }) => HABI_POOLS[id].map((antic) => [antic, id]))),
} as Record<HabiAntic, Mood>;
const SPECIAL = new Set<HabiAntic>(['arrive', 'depart']);

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
            aria-label="Mudar o humor do Habi"
          >
            <HabiMascot key={heroMood} size={180} mood={heroMood} framing="full" sequence={heroMood === 'welcome' ? 'arrive' : undefined} label="Habi" />
          </button>
          <div>
            <h1>Habi lab</h1>
            <p>
              Encontrou o esconderijo do Habi. São {ANTICS.length} travessuras (contando com a chegada e a partida de balão), cada uma em repetição.
              Na aplicação, o Habi escolhe uma ao acaso a cada poucos segundos. Toque no Habi grande para mudar o humor dele.
            </p>
          </div>
        </header>

        <nav className="habilab-toolbar" aria-label="Filtros">
          <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>Todas</button>
          {MOODS.map(({ id, label }) => (
            <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>
          ))}
          <button type="button" className="habilab-theme" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? 'Modo escuro' : 'Modo claro'}
          </button>
        </nav>

        <section className="habilab-grid">
          {shown.map((antic) => (
            <div key={antic} className="habilab-card">
              <HabiMascot size={120} mood={MOOD_OF[antic]} antic={antic} framing="full" />
              <strong>{ANTICS.indexOf(antic) + 1}. {LABELS[antic]}</strong>
              <small>{SPECIAL.has(antic) ? 'Especial' : MOODS.find(({ id }) => id === MOOD_OF[antic])?.label}</small>
            </div>
          ))}
        </section>

        <p className="habilab-footer">Isto fica entre nós. 🤫</p>
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<HabiLab />);
