import { useState, useEffect } from 'react';

/**
 * WorldMapSVG — Mapa-múndi estilizado sem dependências externas
 * Estilo: Runic Cyber-Forge / Dot-Matrix Tech
 *
 * Projeção: Mercator simples em viewBox 1008 × 540
 *   x = (lon + 180) × (1008 / 360)
 *   y = (90 - lat)  × (540 / 180)
 */

// ─── Tipos exportados (reutilizados em Contact.tsx e outros) ──────────────
export interface CountryClient {
  name: string;
  industry: string;
  city: string;
  lat: number;
  lng: number;
}

export interface CountryCapital {
  city: string;
  lat: number;
  lng: number;
}

export interface Country {
  id: string;
  name: string;
  flag: string;
  hq?: boolean;
  capital: CountryCapital;
  clients: CountryClient[];
}

// ─── Projeção ──────────────────────────────────────────────────────────────
const W = 1008;
const H = 540;

function project(lat: number, lng: number): [number, number] {
  const x = (lng + 180) * (W / 360);
  const y = (90 - lat) * (H / 180);
  return [x, y];
}

// ─── Landmasses (polígonos simplificados das massas continentais) ─────────
// Coordenadas em [lng, lat] → convertidas internamente via project()
// Aproximações suficientes para o efeito visual
const LANDMASSES: [number, number][][] = [
  // América do Norte
  [
    [-168, 72], [-140, 70], [-128, 60], [-124, 50], [-122, 38], [-118, 34], [-117, 32],
    [-97, 26], [-90, 30], [-81, 25], [-80, 32], [-75, 35], [-70, 42], [-67, 47],
    [-70, 50], [-60, 47], [-65, 44], [-67, 47], [-70, 50], [-58, 52], [-53, 55],
    [-60, 58], [-65, 62], [-68, 68], [-85, 68], [-100, 70], [-120, 70], [-135, 72], [-168, 72],
  ],
  // América Central + México (incluso acima)
  [
    [-117, 32], [-97, 26], [-90, 20], [-83, 10], [-77, 8], [-80, 8], [-83, 10],
    [-88, 16], [-92, 18], [-97, 20], [-104, 22], [-110, 24], [-117, 32],
  ],
  // América do Sul
  [
    [-81, 8], [-77, 0], [-73, -10], [-70, -18], [-68, -22], [-57, -20], [-50, -10],
    [-35, -5], [-35, -8], [-38, -13], [-40, -20], [-44, -23], [-48, -28], [-52, -33],
    [-57, -38], [-63, -42], [-65, -55], [-68, -55], [-73, -50], [-75, -42],
    [-73, -38], [-70, -30], [-70, -20], [-75, -12], [-77, 0], [-78, 5], [-81, 8],
  ],
  // Europa Ocidental
  [
    [-9, 38], [-9, 43], [-3, 44], [-2, 44], [0, 44], [3, 43], [5, 43], [8, 44], [10, 44],
    [10, 48], [8, 48], [6, 47], [7, 48], [10, 50], [14, 54], [10, 55], [8, 56],
    [5, 58], [0, 60], [-2, 57], [-5, 54], [-6, 52], [-5, 50], [-2, 50],
    [0, 51], [1, 51], [2, 52], [5, 52], [8, 53], [15, 55], [18, 58], [20, 60], [25, 62],
    [28, 65], [25, 70], [20, 72], [15, 70], [10, 64], [5, 58], [0, 55],
    [-5, 57], [-8, 54], [-10, 50], [-9, 38],
  ],
  // Europa do Sul (Península Ibérica e Itália já inseridos acima; aqui mais detalhe)
  [
    [-9, 37], [-6, 36], [-5, 36], [-2, 36], [0, 37], [1, 38], [3, 40], [5, 43],
    [3, 43], [0, 44], [-2, 44], [-5, 44], [-9, 43], [-9, 37],
  ],
  // África
  [
    [-17, 15], [-15, 10], [-15, 5], [-8, 5], [-5, 5], [0, 5], [5, 5], [10, 5],
    [15, 5], [20, 5], [25, 5], [30, 5], [35, 5], [40, 5], [42, 12], [43, 15],
    [45, 12], [44, 12], [42, 12], [40, 15], [38, 22], [37, 25], [35, 22], [32, 22],
    [30, 22], [25, 22], [20, 22], [15, 22], [10, 22], [5, 20], [0, 15], [-5, 12],
    [-10, 12], [-15, 12], [-17, 15],
  ],
  // África do Sul
  [
    [20, -34], [22, -34], [25, -30], [30, -28], [33, -25], [35, -20], [35, -15],
    [38, -10], [40, -5], [42, -2], [40, 5], [35, 5], [30, 5], [25, 5], [20, 5],
    [15, 5], [10, 5], [5, 5], [0, 5], [0, -5], [5, -10], [10, -15], [15, -20],
    [18, -26], [20, -34],
  ],
  // Ásia (simplificada)
  [
    [25, 42], [30, 42], [35, 38], [37, 37], [38, 37], [40, 38], [45, 40], [50, 40],
    [55, 38], [60, 38], [65, 37], [70, 38], [75, 38], [80, 35], [85, 30], [90, 27],
    [95, 27], [100, 25], [105, 20], [110, 20], [115, 22], [120, 22], [125, 25],
    [130, 32], [135, 35], [140, 40], [145, 44], [142, 50], [138, 52], [132, 48],
    [128, 43], [125, 40], [122, 38], [120, 32], [118, 28], [115, 25], [110, 22],
    [105, 22], [100, 20], [95, 20], [90, 22], [85, 25], [80, 30], [75, 32],
    [70, 30], [65, 30], [60, 30], [55, 30], [50, 30], [45, 35], [40, 38], [35, 38], [30, 42], [25, 42],
  ],
  // Rússia/Sibéria (simplificada)
  [
    [28, 55], [35, 55], [40, 55], [45, 52], [50, 52], [55, 52], [60, 55], [65, 58],
    [70, 60], [75, 62], [80, 65], [85, 68], [90, 70], [95, 72], [100, 72], [105, 70],
    [110, 68], [115, 65], [120, 62], [125, 60], [130, 58], [135, 55], [140, 52],
    [145, 50], [140, 48], [135, 45], [130, 42], [125, 42], [120, 42], [115, 45],
    [110, 48], [105, 50], [100, 52], [95, 52], [90, 52], [85, 50], [80, 48], [75, 45],
    [70, 42], [65, 40], [60, 40], [55, 40], [50, 45], [45, 45], [40, 48], [35, 50],
    [30, 52], [28, 55],
  ],
  // Índia
  [
    [68, 24], [72, 22], [75, 20], [78, 18], [80, 14], [80, 10], [78, 8], [77, 8],
    [75, 10], [72, 12], [70, 18], [68, 22], [67, 24], [68, 24],
  ],
  // Sudeste Asiático (simplificado)
  [
    [95, 22], [100, 22], [105, 18], [110, 5], [115, 2], [120, 5], [125, 8], [120, 12],
    [115, 16], [110, 20], [105, 22], [100, 20], [95, 20], [95, 22],
  ],
  // Austrália
  [
    [114, -22], [120, -20], [125, -18], [130, -14], [135, -12], [140, -15], [145, -18],
    [148, -22], [150, -26], [152, -28], [153, -30], [152, -34], [150, -38], [148, -38],
    [145, -38], [140, -36], [135, -35], [130, -33], [126, -34], [122, -34], [118, -32],
    [115, -28], [114, -26], [114, -22],
  ],
  // Nova Zelândia (Ilha Norte, simplificada)
  [
    [172, -34], [175, -36], [178, -38], [178, -42], [175, -42], [172, -40], [170, -38], [172, -34],
  ],
  // Groenlândia (simplificada)
  [
    [-50, 60], [-45, 60], [-40, 65], [-38, 70], [-30, 75], [-25, 80], [-30, 85], [-45, 83],
    [-55, 80], [-60, 75], [-58, 70], [-55, 65], [-50, 62], [-50, 60],
  ],
  // Japão (simplificada)
  [
    [130, 33], [132, 34], [134, 35], [136, 36], [138, 38], [140, 40], [142, 44], [142, 42],
    [140, 40], [138, 38], [136, 36], [134, 34], [132, 33], [130, 32], [130, 33],
  ],
  // Madagascar
  [
    [44, -13], [46, -12], [48, -14], [50, -18], [50, -24], [48, -26], [46, -25], [44, -20], [43, -16], [44, -13],
  ],
];

// ─── Componente ────────────────────────────────────────────────────────────
export function WorldMapSVG() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [tooltip, setTooltip] = useState<Country | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch('/content/global-presence.json')
      .then((r) => r.json())
      .then((data: { countries: Country[] }) => setCountries(data.countries))
      .catch((err) => console.error('[WorldMapSVG] Falha ao carregar presença global:', err));
  }, []);

  // Converte landmass coordinates para SVG points string
  function toPolyPoints(coords: [number, number][]): string {
    return coords
      .map(([lng, lat]) => {
        const [x, y] = project(lat, lng);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }

  // Gera a linha de conexão entre dois países (usando as capitais)
  function connectionLine(a: Country, b: Country) {
    const [x1, y1] = project(a.capital.lat, a.capital.lng);
    const [x2, y2] = project(b.capital.lat, b.capital.lng);
    // Curva bezier com controle elevado (arco)
    const cx = (x1 + x2) / 2;
    const cy = Math.min(y1, y2) - 60;
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="relative w-full select-none" style={{ background: 'transparent' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip(null)}
        style={{ display: 'block' }}
      >
        <defs>
          {/* Glow filter para países destacados */}
          <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Gradiente de fundo */}
          <radialGradient id="bg-grad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#071423" />
            <stop offset="100%" stopColor="#030c16" />
          </radialGradient>
          {/* Gradiente das linhas de conexão */}
          <linearGradient id="conn-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00D9FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
          {/* Clip path para o mapa */}
          <clipPath id="map-clip">
            <rect x="0" y="0" width={W} height={H} />
          </clipPath>

          {/* Animações CSS via style */}
          <style>{`
            @keyframes pulse-ring {
              0%   { r: 6px;  opacity: 0.8; }
              100% { r: 24px; opacity: 0; }
            }
            @keyframes pulse-ring2 {
              0%   { r: 6px;  opacity: 0.5; }
              100% { r: 18px; opacity: 0; }
            }
            @keyframes dash-flow {
              to { stroke-dashoffset: -20; }
            }
            .pulse-outer { animation: pulse-ring  2.5s ease-out infinite; }
            .pulse-mid   { animation: pulse-ring2 2.5s ease-out infinite 0.8s; }
            .conn-line   { animation: dash-flow 3s linear infinite; stroke-dasharray: 8 6; }
          `}</style>
        </defs>

        {/* ── Fundo ───────────────────────────────────────────────────── */}
        <rect width={W} height={H} fill="url(#bg-grad)" />

        {/* ── Grade de latitude/longitude ──────────────────────────── */}
        {/* Linhas de longitude (verticais) a cada 30° */}
        {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lng) => {
          const [x] = project(0, lng);
          return (
            <line
              key={`lng-${lng}`}
              x1={x} y1={0} x2={x} y2={H}
              stroke="#ffffff08"
              strokeWidth="1"
            />
          );
        })}
        {/* Linhas de latitude (horizontais) a cada 30° */}
        {[-60, -30, 0, 30, 60].map((lat) => {
          const [, y] = project(lat, 0);
          return (
            <line
              key={`lat-${lat}`}
              x1={0} y1={y} x2={W} y2={y}
              stroke="#ffffff08"
              strokeWidth="1"
            />
          );
        })}
        {/* Equador destacado */}
        {(() => {
          const [, y] = project(0, 0);
          return (
            <line x1={0} y1={y} x2={W} y2={y}
              stroke="#00D9FF14" strokeWidth="1.5" strokeDasharray="4 8" />
          );
        })()}

        {/* ── Massas de terra ─────────────────────────────────────── */}
        <g clipPath="url(#map-clip)">
          {LANDMASSES.map((coords, i) => (
            <polygon
              key={i}
              points={toPolyPoints(coords)}
              fill="#1a3a55"
              stroke="#0e2540"
              strokeWidth="0.8"
              opacity="0.85"
            />
          ))}
        </g>

        {/* ── Linhas de conexão entre países destacados ───────────── */}
        {countries.map((a, i) =>
          countries.slice(i + 1).map((b) => (
            <path
              key={`${a.id}-${b.id}`}
              d={connectionLine(a, b)}
              fill="none"
              stroke="url(#conn-grad)"
              strokeWidth="1"
              className="conn-line"
              opacity="0.5"
            />
          ))
        )}

        {/* ── Marcadores dos países destacados (posição na capital) ── */}
        {countries.map((country) => {
          const [cx, cy] = project(country.capital.lat, country.capital.lng);
          const isHQ = country.hq;
          const color = isHQ ? '#D4AF37' : '#00D9FF';
          const filterId = isHQ ? 'glow-gold' : 'glow-cyan';
          const clientCount = country.clients?.length ?? 0;

          return (
            <g
              key={country.id}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setTooltip(country)}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Anel externo de pulso */}
              <circle className="pulse-outer" cx={cx} cy={cy} r={6} fill="none" stroke={color} strokeWidth="1.5" />
              {/* Anel médio de pulso */}
              <circle className="pulse-mid" cx={cx} cy={cy} r={6} fill="none" stroke={color} strokeWidth="1" />
              {/* Ponto central */}
              <circle
                cx={cx} cy={cy} r={5}
                fill={color}
                stroke={color === '#D4AF37' ? '#fff6' : '#ffffff99'}
                strokeWidth="1"
                filter={`url(#${filterId})`}
              />
              {/* Ponto interno */}
              <circle cx={cx} cy={cy} r={2.5} fill="#0a1f35" />
              {/* Label: nome do país + contagem de clientes */}
              <text
                x={cx + 8} y={cy - 8}
                fontSize="8"
                fill={color}
                fontFamily="monospace"
                opacity="0.9"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {country.flag} {country.name} · {clientCount} {clientCount === 1 ? 'cliente' : 'clientes'}
              </text>
            </g>
          );
        })}
      </svg>

      {/* ── Tooltip enriquecido ──────────────────────────────────────── */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-50 border border-white/10 bg-[#071423]/95 px-3 py-2.5 backdrop-blur min-w-[160px]"
          style={{
            left: tooltipPos.x + 12,
            top: tooltipPos.y - 60,
            transform: tooltipPos.x > W * 0.7 ? 'translateX(-110%)' : undefined,
          }}
        >
          {/* Cabeçalho */}
          <p className="font-heading text-sm font-bold text-white flex items-center gap-1.5">
            <span>{tooltip.flag}</span> {tooltip.name}
            {tooltip.hq && (
              <span className="px-1 py-0.5 font-code text-[8px] uppercase tracking-widest bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                HQ
              </span>
            )}
          </p>
          {/* Capital */}
          <p className="font-code text-[9px] text-slate-400 mt-0.5">
            🏛 {tooltip.capital.city}
          </p>
          {/* Separador */}
          <div className="my-1.5 border-t border-white/10" />
          {/* Clientes */}
          <p className="font-code text-[8px] uppercase tracking-widest text-[#00D9FF] mb-1">
            {tooltip.clients.length} {tooltip.clients.length === 1 ? 'cliente' : 'clientes'}
          </p>
          {tooltip.clients.map((c) => (
            <p key={c.name} className="font-code text-[9px] text-slate-300 leading-tight">
              <span className="text-slate-500">·</span> {c.name}
              <span className="text-slate-500"> / {c.industry}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
