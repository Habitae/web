import { useEffect, useState, type CSSProperties } from 'react';
import './HabiMascot.css';

type HabiMood = 'welcome' | 'guide' | 'proud';
type HabiFraming = 'avatar' | 'full';

// Each antic is a short gag. Its length here drives every animation in
// HabiMascot.css through --habi-antic, so the two never drift apart.
export const HABI_ANTICS = {
  hatTip: 1800,
  wave: 2000,
  roofSlip: 2800,
  doubleHop: 1600,
  peek: 2600,
  spin: 1800,
  sneeze: 2400,
  bird: 3800,
  rain: 4000,
  typing: 3000,
  overheat: 3800,
  coffee: 3400,
  think: 3000,
  idea: 2400,
  read: 3400,
  magnify: 3200,
  stamp: 2600,
  sleepy: 4400,
  jump: 1200,
  backflip: 1600,
  confetti: 2800,
  dance: 3200,
  fireworks: 2600,
  moonwalk: 3400,
  dizzy: 3000,
  bow: 1800,
  highFive: 2000,
  sunglasses: 2600,
  mail: 2800,
  doorbell: 2200,
  stretch: 2600,
  paint: 3000,
  wink: 1800,
  calculator: 3000,
  phone: 3200,
  checklist: 3400,
  tape: 3000,
  sweep: 3200,
  keys: 2400,
  hammer: 2800,
  water: 3600,
  juggle: 3000,
  trophy: 2800,
  medal: 2600,
  cartwheel: 2000,
  balloon: 3800,
  flag: 2600,
  drumroll: 2800,
  hearts: 2600,
  arrive: 3200,
  depart: 4200,
  hang: 2000,
} as const;

export type HabiAntic = keyof typeof HABI_ANTICS;

const PROFILE_ANTICS = new Set<HabiAntic>(['typing', 'overheat', 'moonwalk']);

export const HABI_POOLS: Record<HabiMood, HabiAntic[]> = {
  welcome: [
    'hatTip', 'wave', 'roofSlip', 'doubleHop', 'peek', 'spin', 'sneeze', 'bird', 'rain',
    'bow', 'highFive', 'sunglasses', 'mail', 'doorbell', 'stretch', 'paint', 'wink',
  ],
  guide: [
    'typing', 'overheat', 'coffee', 'think', 'idea', 'read', 'magnify', 'stamp', 'sleepy', 'sneeze', 'bird',
    'calculator', 'phone', 'checklist', 'tape', 'sweep', 'keys', 'hammer', 'water', 'juggle',
  ],
  proud: [
    'jump', 'backflip', 'confetti', 'dance', 'fireworks', 'moonwalk', 'dizzy', 'wave', 'hatTip',
    'trophy', 'medal', 'cartwheel', 'balloon', 'flag', 'drumroll', 'hearts',
  ],
};

const OPENERS: Record<HabiMood, HabiAntic> = { welcome: 'hatTip', guide: 'think', proud: 'jump' };

interface Props {
  size?: number;
  mood?: HabiMood;
  framing?: HabiFraming;
  className?: string;
  label?: string;
  // Pins one antic on repeat instead of cycling through the mood's pool.
  antic?: HabiAntic;
  // 'arrive' floats Habi in on balloons before it starts its antics;
  // 'depart' floats it away on balloons for good.
  sequence?: 'arrive' | 'depart';
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function useAntic(mood: HabiMood, pinned?: HabiAntic, sequence?: 'arrive' | 'depart') {
  // Start mid-arrival so Habi never flashes on the ground before floating in.
  const [antic, setAntic] = useState<HabiAntic | null>(() => (sequence === 'arrive' && !prefersReducedMotion() ? 'arrive' : null));

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const pool = HABI_POOLS[mood];
    let timer: number;
    let last: HabiAntic | null = null;

    const play = (next: HabiAntic) => {
      last = next;
      setAntic(next);
      // After departing there is nothing left to animate: Habi has gone.
      // A held pose such as hang loops in CSS, so Habi never lets go.
      if (next === 'hang') return;
      if (next !== 'depart' || pinned) timer = window.setTimeout(rest, HABI_ANTICS[next]);
    };
    const rest = () => {
      setAntic(null);
      const pause = pinned ? 500 : 1200 + Math.random() * 1600;
      timer = window.setTimeout(() => {
        const choices = pool.filter((option) => option !== last);
        play(pinned ?? choices[Math.floor(Math.random() * choices.length)]);
      }, pause);
    };

    if (sequence === 'arrive' && !pinned) timer = window.setTimeout(rest, HABI_ANTICS.arrive);
    else timer = window.setTimeout(() => play(pinned ?? (sequence === 'depart' ? 'depart' : OPENERS[mood])), pinned ? 0 : 350);
    return () => window.clearTimeout(timer);
  }, [mood, pinned, sequence]);

  return antic;
}

// Drawn behind Habi so the drops disappear behind the umbrella.
const RainCloud = () => (
  <g className="habi-cloud" aria-hidden="true">
    <g className="habi-drops">
      <rect x="12" y="-1.5" width="0.7" height="1.8" rx="0.35" />
      <rect x="15.7" y="-1.5" width="0.7" height="1.8" rx="0.35" />
      <rect x="19.4" y="-1.5" width="0.7" height="1.8" rx="0.35" />
    </g>
    <circle cx="13" cy="-4" r="2.2" />
    <circle cx="16.4" cy="-5" r="2.8" />
    <circle cx="19.6" cy="-4" r="2.2" />
    <rect x="11" y="-4" width="10.8" height="2.2" rx="1.1" />
  </g>
);

const Sparkle = ({ x, y, r }: { x: number; y: number; r: number }) => (
  <path d={`M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`} />
);

const Hand = ({ x, y, side }: { x: number; y: number; side: 'left' | 'right' }) => (
  <circle className={`habi-hand habi-hand--${side}`} cx={x} cy={y} r="1.4" />
);

// Props drawn in front of the house: they move with it.
function Held({ antic }: { antic: HabiAntic | null }) {
  switch (antic) {
    case 'wave':
      return <Hand x={27.5} y={18} side="right" />;
    case 'think':
      return <Hand x={8} y={23} side="left" />;
    case 'bow':
      return (
        <>
          <Hand x={11.5} y={25} side="left" />
          <Hand x={20.5} y={25} side="right" />
        </>
      );
    case 'highFive':
      return <Hand x={26} y={18} side="right" />;
    case 'hang':
      return (
        <>
          <Hand x={13.4} y={3.6} side="left" />
          <Hand x={18.6} y={3.6} side="right" />
        </>
      );
    case 'sunglasses':
      return (
        <>
          <g className="habi-shades">
            <rect x="10.8" y="17.6" width="4.4" height="3.4" rx="1.2" />
            <rect x="16.8" y="17.6" width="4.4" height="3.4" rx="1.2" />
            <rect x="15" y="18.4" width="2" height="0.8" />
            <rect className="habi-shades-glint" x="11.6" y="18.2" width="1.4" height="0.7" rx="0.35" />
          </g>
          <Hand x={22.6} y={19} side="right" />
        </>
      );
    case 'mail':
      return <Hand x={26} y={18.5} side="right" />;
    case 'doorbell':
    case 'stretch':
      return (
        <>
          <Hand x={5} y={10} side="left" />
          <Hand x={27} y={10} side="right" />
        </>
      );
    case 'paint':
      return (
        <>
          <rect className="habi-paint-stripe" x="21.6" y="15.4" width="2.6" height="10" rx="0.6" />
          <g className="habi-brush">
            <rect className="habi-prop-dark" x="23.4" y="11" width="1" height="5.6" rx="0.4" />
            <rect className="habi-gold" x="22.6" y="16.2" width="2.6" height="2.4" rx="0.5" />
            <Hand x={24.6} y={12} side="right" />
          </g>
        </>
      );
    case 'wink':
      return <Hand x={26.4} y={20} side="right" />;
    case 'calculator':
      return (
        <g className="habi-calculator">
          <rect className="habi-prop-light" x="9.5" y="21" width="8" height="7.4" rx="0.8" />
          <rect className="habi-calc-screen" x="10.5" y="22" width="6" height="1.8" rx="0.3" />
          <path className="habi-calc-keys" d="M11.4 25.4H11.6M13.4 25.4H13.6M15.4 25.4H15.6M11.4 27H11.6M13.4 27H13.6M15.4 27H15.6" />
          <Hand x={9.5} y={25.5} side="left" />
          <Hand x={19.5} y={24} side="right" />
        </g>
      );
    case 'phone':
      return (
        <g className="habi-phone">
          <rect className="habi-prop-dark" x="24.4" y="14.6" width="2.6" height="5.2" rx="0.7" />
          <Hand x={26} y={20.2} side="right" />
        </g>
      );
    case 'checklist':
      return (
        <g className="habi-clipboard">
          <rect className="habi-prop-light" x="8.5" y="20.4" width="11" height="9" rx="0.6" />
          <rect className="habi-prop-dark" x="12.5" y="19.6" width="3" height="1.4" rx="0.4" />
          <rect className="habi-checkbox" x="10" y="22.4" width="1.4" height="1.4" />
          <rect className="habi-checkbox" x="10" y="24.8" width="1.4" height="1.4" />
          <rect className="habi-checkbox" x="10" y="27.2" width="1.4" height="1.4" />
          <rect className="habi-prop-ink" x="12.4" y="22.8" width="5.5" height="0.7" />
          <rect className="habi-prop-ink" x="12.4" y="25.2" width="4.5" height="0.7" />
          <rect className="habi-prop-ink" x="12.4" y="27.6" width="5" height="0.7" />
          <g className="habi-ticks">
            <path d="M9.9 22.9L10.6 23.6L12 21.8" />
            <path d="M9.9 25.3L10.6 26L12 24.2" />
            <path d="M9.9 27.7L10.6 28.4L12 26.6" />
          </g>
          <Hand x={8.6} y={25} side="left" />
          <Hand x={21} y={22.4} side="right" />
        </g>
      );
    case 'tape':
      return (
        <g className="habi-tape">
          <rect className="habi-tape-strip" x="26" y="21.2" width="11" height="1" />
          <rect className="habi-prop-dark" x="22.4" y="19.8" width="4" height="4" rx="1" />
          <circle className="habi-gold" cx="24.4" cy="21.8" r="0.8" />
          <Hand x={24.4} y={24.6} side="right" />
        </g>
      );
    case 'sweep':
      return (
        <g className="habi-broom">
          <path className="habi-broom-stick" d="M26.6 13.6L24.4 28.4" />
          <path className="habi-gold" d="M21.6 28.2H27.2L28 31H20.8Z" />
          <Hand x={26.4} y={16} side="right" />
        </g>
      );
    case 'keys':
      return (
        <>
          <g className="habi-keyring">
            <circle className="habi-ring" cx="25.4" cy="21.6" r="1.3" />
            <rect className="habi-gold" x="24.2" y="22.8" width="0.9" height="3.6" rx="0.3" />
            <rect className="habi-gold" x="25.2" y="25.4" width="1.2" height="0.7" />
            <rect className="habi-gold" x="26.2" y="22.6" width="0.9" height="3" rx="0.3" />
          </g>
          <Hand x={25.4} y={19.4} side="right" />
        </>
      );
    case 'hammer':
      return (
        <>
          <rect className="habi-prop-dark habi-nail" x="30.4" y="19.6" width="2" height="0.8" />
          <g className="habi-hammer">
            <rect className="habi-prop-dark" x="23.7" y="13.4" width="1.1" height="7.4" rx="0.4" />
            <rect className="habi-laptop-shell" x="21.8" y="12" width="4.9" height="2.4" rx="0.5" />
            <Hand x={24.2} y={20.4} side="right" />
          </g>
        </>
      );
    case 'water':
      return (
        <g className="habi-can">
          <path className="habi-can-spout" d="M27 21.2L30.4 18.8" />
          <rect className="habi-laptop-shell" x="22" y="19.4" width="5.4" height="4.4" rx="0.9" />
          <Hand x={23} y={19} side="right" />
        </g>
      );
    case 'juggle':
      return (
        <>
          <Hand x={7} y={16} side="left" />
          <Hand x={25} y={16} side="right" />
        </>
      );
    case 'trophy':
      return (
        <g className="habi-trophy">
          <path className="habi-trophy-handles" d="M13.4 -2.4C11.6 -2.4 11.6 0.2 13.6 0.4M18.6 -2.4C20.4 -2.4 20.4 0.2 18.4 0.4" />
          <path className="habi-gold" d="M13.4 -3.2H18.6V-1.2C18.6 0.6 17.4 1.8 16 1.8C14.6 1.8 13.4 0.6 13.4 -1.2Z" />
          <rect className="habi-gold" x="15.4" y="1.6" width="1.2" height="1.8" />
          <rect className="habi-gold" x="13.8" y="3.3" width="4.4" height="1.2" rx="0.4" />
          <Hand x={12.4} y={2.6} side="left" />
          <Hand x={19.6} y={2.6} side="right" />
        </g>
      );
    case 'medal':
      return (
        <g className="habi-medal">
          <path className="habi-medal-ribbon" d="M14.8 14.6L16 22.6L17.2 14.6" />
          <circle className="habi-gold" cx="16" cy="24.4" r="2" />
          <path className="habi-medal-shine" d="M15.2 23.6L16.8 25.2" />
        </g>
      );
    case 'cartwheel':
      return (
        <>
          <Hand x={4.5} y={18} side="left" />
          <Hand x={27.5} y={18} side="right" />
        </>
      );
    case 'balloon':
      return (
        <g className="habi-balloon">
          <path className="habi-balloon-string" d="M25.6 18.4C27.4 14 25.8 10 27.4 6.2" />
          <ellipse className="habi-balloon-skin" cx="27.4" cy="3" rx="2.8" ry="3.4" />
          <path className="habi-balloon-pop" d="M27.4 -2.4V-3.8M23 3H21.6M31.8 3H33.2M24.2 -0.4L23.2 -1.4M30.6 -0.4L31.6 -1.4" />
          <Hand x={25.6} y={18.6} side="right" />
        </g>
      );
    case 'flag':
      return (
        <g className="habi-flagpole">
          <rect className="habi-prop-dark" x="25" y="6" width="0.9" height="15" rx="0.4" />
          <path className="habi-flag" d="M25.9 6.2L31.4 8.2L25.9 10.2Z" />
          <Hand x={25.4} y={18} side="right" />
        </g>
      );
    case 'drumroll':
      return (
        <g className="habi-drum">
          <rect className="habi-gold" x="10" y="26" width="12" height="3.6" rx="0.6" />
          <ellipse className="habi-prop-light" cx="16" cy="26" rx="6" ry="1.4" />
          <Hand x={12.6} y={24.6} side="left" />
          <Hand x={19.4} y={24.6} side="right" />
        </g>
      );
    case 'hearts':
      return (
        <>
          <ellipse className="habi-blush" cx="10.6" cy="23.6" rx="1.6" ry="0.9" />
          <ellipse className="habi-blush" cx="21.4" cy="23.6" rx="1.6" ry="0.9" />
          <Hand x={14.6} y={25.6} side="left" />
          <Hand x={17.4} y={25.6} side="right" />
        </>
      );
    case 'arrive':
    case 'depart':
      // A bunch of balloons tied to the chimney.
      return (
        <g className="habi-bunch">
          <path className="habi-bunch-strings" d="M22 6.5L22 -3.4M22 6.5L18.6 -1.8M22 6.5L25.4 -1.6M22 6.5L16.4 -5.4M22 6.5L27.6 -5.2" />
          {antic === 'depart' && <Hand x={27.5} y={17} side="right" />}
          <g className="habi-bunch-balloons">
            <circle cx="22" cy="-6" r="2.6" />
            <circle cx="18.6" cy="-4.2" r="2.4" />
            <circle cx="25.4" cy="-4" r="2.4" />
            <circle cx="20" cy="-9" r="2.4" />
            <circle cx="24.4" cy="-9.2" r="2.5" />
            <circle cx="16.4" cy="-7.6" r="2.2" />
            <circle cx="27.6" cy="-7.4" r="2.2" />
            <circle cx="22.2" cy="-12" r="2.3" />
            <circle cx="18.4" cy="-11.6" r="2" />
            <circle cx="26" cy="-12.4" r="2" />
          </g>
        </g>
      );
    case 'rain':
      return <Hand x={25.4} y={20.8} side="right" />;
    case 'bird':
      return <Hand x={27.5} y={14} side="right" />;
    case 'sneeze':
      return <Hand x={8} y={24} side="left" />;
    case 'sleepy':
    case 'jump':
    case 'backflip':
    case 'doubleHop':
      return (
        <>
          <Hand x={4.5} y={12} side="left" />
          <Hand x={27.5} y={12} side="right" />
        </>
      );
    case 'idea':
      return <Hand x={27.5} y={11} side="right" />;
    case 'fireworks':
      return (
        <>
          <Hand x={6.2} y={18} side="left" />
          <Hand x={25.8} y={18} side="right" />
        </>
      );
    case 'dizzy':
      return (
        <>
          <Hand x={4.5} y={19} side="left" />
          <Hand x={27.5} y={19} side="right" />
        </>
      );
    case 'typing':
    case 'overheat':
      return (
        // Seen from the side: Habi faces right, the screen opens towards it.
        <g className="habi-laptop">
          <Hand x={25} y={23} side="left" />
          <path className="habi-laptop-screen" d="M29.6 24.4L31.4 16.4" />
          <path className="habi-laptop-glow" d="M28.7 23.4L30.3 16.6" />
          <rect className="habi-laptop-shell habi-laptop-base" x="20.5" y="23.8" width="9.6" height="1.4" rx="0.6" />
          <Hand x={22.4} y={22.8} side="right" />
        </g>
      );
    case 'coffee':
      return (
        <g className="habi-mug">
          <path className="habi-steam" d="M24.4 18.6C23.6 17.6 25.2 16.8 24.4 15.6M26 18.6C25.2 17.6 26.8 16.8 26 15.6" />
          <path className="habi-prop-line" d="M27 21.2H27.8C28.6 21.2 28.6 23.2 27.8 23.2H27" />
          <rect className="habi-prop-light" x="23.4" y="19.6" width="3.6" height="4.4" rx="0.7" />
          <Hand x={24} y={24.2} side="right" />
        </g>
      );
    case 'read':
      return (
        <g className="habi-paper">
          <rect className="habi-prop-light" x="8.5" y="21.5" width="15" height="7.5" rx="0.6" />
          <rect className="habi-prop-ink" x="10.5" y="23.2" width="9" height="0.8" />
          <rect className="habi-prop-ink" x="10.5" y="25" width="11" height="0.8" />
          <rect className="habi-prop-ink" x="10.5" y="26.8" width="7" height="0.8" />
          <Hand x={8.5} y={26} side="left" />
          <Hand x={23.5} y={26} side="right" />
        </g>
      );
    case 'magnify':
      return (
        <g className="habi-lens">
          <path className="habi-lens-handle" d="M15.4 22.4L18.4 25.6" />
          <circle className="habi-lens-glass" cx="13" cy="19.75" r="3.6" />
          <rect className="habi-lens-eye" x="11" y="16.75" width="4" height="6" rx="2" />
          <Hand x={18.8} y={26} side="right" />
        </g>
      );
    case 'stamp':
      return (
        <>
          <rect className="habi-prop-light" x="17" y="28.4" width="10" height="1.6" rx="0.4" />
          <rect className="habi-stamp-mark" x="19.5" y="28.7" width="5" height="1" rx="0.3" />
          <g className="habi-stamp">
            <rect className="habi-prop-dark" x="19.5" y="19.6" width="5" height="1.6" rx="0.4" />
            <rect className="habi-prop-dark" x="21.4" y="16.6" width="1.2" height="3" />
            <Hand x={22} y={16} side="right" />
          </g>
        </>
      );
    case 'confetti':
      return (
        <>
          <Hand x={4.5} y={11} side="left" />
          <Hand x={27.5} y={11} side="right" />
        </>
      );
    case 'dance':
      return (
        <>
          <Hand x={5} y={15} side="left" />
          <Hand x={27} y={15} side="right" />
        </>
      );
    default:
      return null;
  }
}

// Effects drawn around the house: they stay put while it moves.
function Effects({ antic }: { antic: HabiAntic | null }) {
  switch (antic) {
    case 'think':
      return (
        <g className="habi-thought">
          <circle cx="27.5" cy="9" r="1.1" />
          <circle cx="29.5" cy="5.5" r="1.7" />
        </g>
      );
    case 'idea':
      return (
        <g className="habi-bulb">
          <path className="habi-bulb-rays" d="M16 -6.5V-8M11.5 -2H10M20.5 -2H22M12.8 -5.2L11.8 -6.2M19.2 -5.2L20.2 -6.2" />
          <circle className="habi-gold" cx="16" cy="-2" r="2.6" />
          <rect className="habi-prop-dark" x="15" y="0.4" width="2" height="1.4" rx="0.4" />
        </g>
      );
    case 'sleepy':
      return (
        <>
          <g className="habi-zzz">
            <path d="M23.5 9H25L23.5 10.5H25" />
            <path d="M25.8 5.6H27.8L25.8 7.6H27.8" />
            <path d="M28.4 1.6H31L28.4 4.2H31" />
          </g>
          <g className="habi-alert">
            <rect x="27.2" y="3" width="1.6" height="4.2" rx="0.8" />
            <circle cx="28" cy="9" r="0.9" />
          </g>
        </>
      );
    case 'bird':
      return (
        <g className="habi-bird">
          <ellipse cx="16" cy="3.6" rx="1.7" ry="1.3" />
          <circle cx="17.3" cy="2.5" r="1" />
          <path className="habi-bird-beak" d="M18.1 2.2L19.3 2.6L18.1 3Z" />
          <path className="habi-bird-wing" d="M14.6 3.2Q15.6 1.4 16.8 3.2Z" />
        </g>
      );
    case 'dance':
      return (
        <g className="habi-notes">
          <g><circle cx="3.6" cy="9" r="1.1" /><rect x="4.1" y="4.6" width="0.7" height="4.4" /></g>
          <g><circle cx="27.6" cy="7" r="1.1" /><rect x="28.1" y="2.6" width="0.7" height="4.4" /></g>
        </g>
      );
    case 'confetti':
      return (
        <g className="habi-confetti">
          <rect x="6" y="-2" width="1.6" height="1" />
          <rect x="11" y="-4" width="1.6" height="1" />
          <rect x="15" y="-6" width="1.6" height="1" />
          <rect x="19" y="-3" width="1.6" height="1" />
          <rect x="24" y="-1" width="1.6" height="1" />
          <rect x="27" y="-5" width="1.6" height="1" />
        </g>
      );
    case 'fireworks':
      return (
        <>
          <circle className="habi-rocket" cx="22" cy="5" r="0.9" />
          <path className="habi-burst" d="M22 -7.5V-9.5M22 -2.5V-0.5M17 -5H15M27 -5H29M18.5 -8.5L17.1 -9.9M25.5 -8.5L26.9 -9.9M18.5 -1.5L17.1 -0.1M25.5 -1.5L26.9 -0.1" />
        </>
      );
    case 'highFive':
      return <path className="habi-clap" d="M18.6 13.6L18 12M22.6 14.4L23.8 13.2M15.4 16L14 15.4M14.8 21L13.4 21.6M22.4 23.4L23.6 24.6" />;
    case 'mail':
      return (
        <>
          <g className="habi-envelope">
            <rect className="habi-prop-light" x="22.6" y="13" width="5.4" height="3.8" rx="0.4" />
            <path className="habi-prop-line" d="M22.8 13.2L25.3 15.2L27.8 13.2" />
          </g>
          <g className="habi-heart habi-heart--mail"><path d="M25.3 6.4C23.9 4.8 21.9 6.0 22.9 7.8L25.3 10.2L27.7 7.8C28.7 6.0 26.7 4.8 25.3 6.4Z" /></g>
        </>
      );
    case 'doorbell':
      return (
        <g className="habi-bell">
          <path className="habi-bell-rings" d="M11.4 -1.2Q10.2 0.8 11.4 2.8M20.6 -1.2Q21.8 0.8 20.6 2.8M9.6 -2.4Q7.8 0.8 9.6 4M22.4 -2.4Q24.2 0.8 22.4 4" />
          <g className="habi-bell-body">
            <path className="habi-gold" d="M13.6 2.6Q13.6 -1.4 16 -1.4Q18.4 -1.4 18.4 2.6L19.2 3.4H12.8Z" />
            <circle className="habi-gold" cx="16" cy="4.2" r="0.7" />
          </g>
        </g>
      );
    case 'stretch':
      return (
        <g className="habi-yawn">
          <ellipse cx="16" cy="24.2" rx="1.4" ry="1.8" />
        </g>
      );
    case 'wink':
      return <g className="habi-wink-sparkle"><Sparkle x={23.4} y={15.2} r={1.8} /></g>;
    case 'calculator':
      return <g className="habi-ding"><Sparkle x={13.5} y={18} r={2.2} /></g>;
    case 'phone':
      return (
        <g className="habi-speech-dots">
          <circle cx="27.4" cy="10.4" r="0.8" />
          <circle cx="29.4" cy="10.4" r="0.8" />
          <circle cx="31.4" cy="10.4" r="0.8" />
        </g>
      );
    case 'sweep':
      return (
        <g className="habi-dust">
          <circle cx="20" cy="30" r="1.2" />
          <circle cx="28.6" cy="29.6" r="1" />
          <circle cx="24" cy="31" r="0.9" />
        </g>
      );
    case 'keys':
      return <path className="habi-jingle" d="M28.6 21.2L30 20.4M29 23.4H30.6M28.6 25.4L30 26.2" />;
    case 'hammer':
      return <path className="habi-impact" d="M31.4 17.4V16.4M33.6 18.2L34.4 17.4M33.8 21.8L34.6 22.6M31.4 22.6V23.6" />;
    case 'water':
      return (
        <>
          <g className="habi-pour">
            <rect x="30.7" y="21.6" width="0.7" height="1.6" rx="0.35" />
            <rect x="30.7" y="21.6" width="0.7" height="1.6" rx="0.35" />
            <rect x="30.7" y="21.6" width="0.7" height="1.6" rx="0.35" />
          </g>
          <g className="habi-sprout">
            <rect x="30.1" y="26.6" width="0.8" height="4" rx="0.3" />
            <path d="M30.5 27.6C28.6 27.8 27.6 26.6 27.8 25.4C29.6 25.4 30.4 26.4 30.5 27.6Z" />
            <path d="M30.5 26.8C32.4 27 33.4 25.8 33.2 24.6C31.4 24.6 30.6 25.6 30.5 26.8Z" />
          </g>
        </>
      );
    case 'juggle':
      return (
        <g className="habi-balls">
          <circle cx="7.4" cy="14" r="1.3" />
          <circle cx="7.4" cy="14" r="1.3" />
          <circle cx="7.4" cy="14" r="1.3" />
        </g>
      );
    case 'drumroll':
      return <path className="habi-burst habi-tada" d="M16 -3V-5M10 0L8.6 -1.4M22 0L23.4 -1.4M7 5H5M25 5H27" />;
    case 'hearts':
      return (
        <g className="habi-hearts">
          <g><path d="M16 8.4C14.6 6.8 12.6 8.0 13.6 9.8L16 12.2L18.4 9.8C19.4 8.0 17.4 6.8 16 8.4Z" /></g>
          <g><path d="M10.6 10.4C9.2 8.8 7.2 10.0 8.2 11.8L10.6 14.2L13.0 11.8C14.0 10.0 12.0 8.8 10.6 10.4Z" /></g>
          <g><path d="M21.6 10C20.2 8.4 18.2 9.6 19.2 11.4L21.6 13.8L24.0 11.4C25.0 9.6 23.0 8.4 21.6 10Z" /></g>
        </g>
      );
    case 'dizzy':
      return (
        <g className="habi-stars">
          <Sparkle x={11} y={4} r={1.6} />
          <Sparkle x={21} y={4} r={1.6} />
          <Sparkle x={16} y={1} r={1.3} />
        </g>
      );
    default:
      return null;
  }
}

// Facing the viewer: the gable end, so the roof reads as a triangle.
function FrontHouse({ happy, antic, back = false }: { happy: boolean; antic: HabiAntic | null; back?: boolean }) {
  return (
    <>
      <rect className="habi-leg habi-leg--left" x="10" y="24" width="3" height="6" rx="1.2" />
      <rect className="habi-leg habi-leg--right" x="19" y="24" width="3" height="6" rx="1.2" />

      <rect className="habi-house" x="7" y="13.5" width="18" height="13.5" rx="2.5" />
      {back ? (
        <rect className="habi-back-door" x="14" y="19" width="4" height="8" rx="1" />
      ) : (
        <g className="habi-eyes">
          {happy ? (
            <>
              <path className="habi-eye-happy" d="M11.5 21L13 19.2L14.5 21" />
              <path className="habi-eye-happy" d="M17.5 21L19 19.2L20.5 21" />
            </>
          ) : (
            <>
              <rect className="habi-eye" x="11.5" y="17.5" width="3" height="4.5" rx="1.5" />
              <rect className="habi-eye" x="17.5" y="17.5" width="3" height="4.5" rx="1.5" />
            </>
          )}
        </g>
      )}

      {antic === 'rain' && <path className="habi-umbrella-stick" d="M19 9.6L25.2 20.6" />}
      <g className="habi-roof-lift">
        <g className="habi-roof">
          <rect className="habi-chimney" x={back ? 8.5 : 20.5} y="6.5" width="3" height="6" rx="0.8" />
          <path className="habi-roof-shape" d="M4.5 15L16 5.5L27.5 15Z" />
          {antic === 'hatTip' && <Hand x={26.8} y={15.6} side="right" />}
        </g>
        {antic === 'roofSlip' && (
          <>
            <Hand x={5.6} y={16.4} side="left" />
            <Hand x={26.4} y={16.4} side="right" />
          </>
        )}
      </g>
    </>
  );
}

// Side profile, facing right: one eye, the roof seen along its ridge and the
// chimney at the back. Used by antics that need Habi turned sideways.
function ProfileHouse({ happy, antic }: { happy: boolean; antic: HabiAntic | null }) {
  return (
    <>
      <rect className="habi-leg habi-leg--left habi-leg--far" x="8" y="24" width="3" height="6" rx="1.2" />
      <rect className="habi-leg habi-leg--right" x="14" y="24" width="3" height="6" rx="1.2" />

      <rect className="habi-house" x="6" y="13.5" width="14" height="13.5" rx="2.5" />
      <g className="habi-eyes">
        {happy
          ? <path className="habi-eye-happy" d="M15 21L16.5 19.2L18 21" />
          : <rect className="habi-eye" x="15.4" y="17.5" width="2.6" height="4.5" rx="1.3" />}
      </g>

      <g className="habi-roof-lift">
        <g className="habi-roof">
          <rect className="habi-chimney" x="8" y="4.5" width="3" height="5" rx="0.8" />
          <path className="habi-roof-shape" d="M3 15L6.8 6.5H19.2L23 15Z" />
          {antic === 'moonwalk' && <Hand x={20.6} y={14.2} side="right" />}
        </g>
      </g>
    </>
  );
}

// A full turn on the spot: front, side, back, other side. Each view shows
// for a beat (see habi-view-* in HabiMascot.css).
function SpinHouse({ happy }: { happy: boolean }) {
  return (
    <>
      <g className="habi-view habi-view--front"><FrontHouse happy={happy} antic={null} /></g>
      <g className="habi-view habi-view--side"><ProfileHouse happy={happy} antic={null} /></g>
      <g className="habi-view habi-view--back"><FrontHouse happy={happy} antic={null} back /></g>
      <g className="habi-view habi-view--side-flip"><ProfileHouse happy={happy} antic={null} /></g>
    </>
  );
}

// Habi is a little house whose roof doubles as a hat, drawn on a 32×32 grid
// so it stays readable at 16px. It idles (breathes, blinks, glances) and
// every few seconds plays a random antic from its mood's pool.
export default function HabiMascot({
  size = 96,
  mood = 'welcome',
  framing = 'avatar',
  className = '',
  label,
  antic: pinned,
  sequence,
}: Props) {
  const antic = useAntic(mood, pinned, sequence);
  const isProud = mood === 'proud';
  const profile = antic !== null && PROFILE_ANTICS.has(antic);
  const style = antic ? ({ '--habi-antic': `${HABI_ANTICS[antic]}ms` } as CSSProperties) : undefined;

  return (
    <svg
      className={`habi-mascot habi-mascot--${mood} habi-mascot--${framing}${antic ? ` habi-antic--${antic}` : ''}${profile ? ' habi-mascot--profile' : ''}${className ? ` ${className}` : ''}`}
      style={style}
      width={size}
      height={size}
      viewBox={framing === 'full' ? '-4 -4 40 40' : '0 0 32 32'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {framing === 'full' && <ellipse className="habi-shadow" cx="16" cy="31" rx="9" ry="1.4" />}

      <g className="habi-smoke" aria-hidden="true">
        <circle cx="22" cy="5" r="1.4" />
        <circle cx="22" cy="5" r="1.4" />
        <circle cx="22" cy="5" r="1.8" />
      </g>

      {antic === 'rain' && <RainCloud />}

      <g className="habi-hop">
        <g className="habi-gag">
          <g className="habi-turn">
            {antic === 'spin' ? <SpinHouse happy={isProud} />
              : profile ? <ProfileHouse happy={isProud} antic={antic} />
              : <FrontHouse happy={isProud} antic={antic} />}
            <Held antic={antic} />
          </g>
        </g>
      </g>

      <g aria-hidden="true">
        <Effects antic={antic} />
        {isProud && (
          <g className="habi-sparkles">
            <Sparkle x={4} y={6} r={2.6} />
            <Sparkle x={28.5} y={21} r={2.2} />
            <Sparkle x={27} y={4} r={1.5} />
            <Sparkle x={2.5} y={21} r={1.5} />
          </g>
        )}
      </g>
    </svg>
  );
}
