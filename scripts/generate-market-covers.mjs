import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const iconSet = JSON.parse(
  await readFile(path.join(root, 'node_modules', '@iconify-json', 'tabler', 'icons.json'), 'utf8')
);
const outputDir = path.join(root, 'src', 'assets', 'images', 'market');

const covers = [
  {
    file: 'grok-video-membership.webp',
    code: 'VIDEO AI / 30 DAYS',
    title: 'VIDEO CREATION',
    subtitle: 'Creator workspace membership',
    icon: 'movie',
    accent: '#71d7a7',
    soft: '#23382d',
    motif: 'timeline',
  },
  {
    file: 'chatgpt-plus-membership.webp',
    code: 'AI ACCESS / 30 DAYS',
    title: 'AI MEMBERSHIP',
    subtitle: 'Protected monthly access',
    icon: 'message-chatbot',
    accent: '#82b4df',
    soft: '#263338',
    motif: 'messages',
  },
  {
    file: 'global-network-two-months.webp',
    code: 'GLOBAL / 60 DAYS',
    title: 'OPEN NETWORK',
    subtitle: 'Unlimited speed and traffic',
    icon: 'world',
    accent: '#d5b66f',
    soft: '#343126',
    motif: 'network',
  },
  {
    file: 'global-network-one-month.webp',
    code: 'GLOBAL / 30 DAYS',
    title: 'OPEN NETWORK',
    subtitle: 'Unlimited speed and traffic',
    icon: 'router',
    accent: '#71d7a7',
    soft: '#23382d',
    motif: 'signal',
  },
  {
    file: 'network-40mbps-200g.webp',
    code: 'BANDWIDTH / 200G',
    title: '40 MBPS',
    subtitle: 'Long-term network package',
    icon: 'gauge',
    accent: '#82b4df',
    soft: '#263338',
    motif: 'meter40',
  },
  {
    file: 'network-80mbps-200g.webp',
    code: 'BANDWIDTH / 200G',
    title: '80 MBPS',
    subtitle: 'Long-term network package',
    icon: 'rocket',
    accent: '#d5b66f',
    soft: '#343126',
    motif: 'meter80',
  },
];

function iconMarkup(name, color) {
  const icon = iconSet.icons[name];
  if (!icon) throw new Error(`Missing Tabler icon: ${name}`);

  return `
    <svg x="1216" y="330" width="184" height="184" viewBox="0 0 24 24" color="${color}" aria-hidden="true">
      ${icon.body}
    </svg>`;
}

function motifMarkup(type, color) {
  const common = `fill="none" stroke="${color}" stroke-width="3" opacity="0.58"`;

  if (type === 'timeline') {
    return `<g ${common}>
      <path d="M72 690H1080"/><path d="M150 660v60M294 670v40M438 650v80M582 665v50M726 645v90M870 660v60M1014 670v40"/>
      <rect x="1136" y="650" width="126" height="80" rx="10"/><rect x="1280" y="650" width="126" height="80" rx="10"/>
    </g>`;
  }

  if (type === 'messages') {
    return `<g ${common}>
      <rect x="72" y="648" width="260" height="82" rx="12"/><rect x="356" y="648" width="188" height="82" rx="12"/>
      <rect x="568" y="648" width="326" height="82" rx="12"/><path d="M934 689h472"/><circle cx="1022" cy="689" r="8" fill="${color}"/>
      <circle cx="1168" cy="689" r="8" fill="${color}"/><circle cx="1314" cy="689" r="8" fill="${color}"/>
    </g>`;
  }

  if (type === 'network') {
    return `<g ${common}>
      <circle cx="156" cy="690" r="18"/><circle cx="390" cy="690" r="18"/><circle cx="624" cy="690" r="18"/>
      <circle cx="858" cy="690" r="18"/><path d="M174 690h198M408 690h198M642 690h198M876 690h530"/>
      <path d="M156 672v-52M390 708v52M624 672v-52M858 708v52" opacity="0.5"/>
    </g>`;
  }

  if (type === 'signal') {
    return `<g ${common}>
      <path d="M72 730h196v-48h196v-62h196v-72h196v-90h214"/>
      <path d="M72 774h1334" opacity="0.35"/><circle cx="1070" cy="458" r="12" fill="${color}"/>
    </g>`;
  }

  const bars = type === 'meter80' ? [96, 142, 188, 234, 280, 326, 372, 418] : [96, 142, 188, 234];
  return `<g ${common}>
    <path d="M72 770h1334" opacity="0.35"/>
    ${bars.map((x, index) => `<rect x="${x}" y="${730 - index * 18}" width="28" height="${40 + index * 18}" rx="6" fill="${color}" stroke="none" opacity="${0.28 + index * 0.07}"/>`).join('')}
    <path d="M520 730h886"/><path d="M520 682h640" opacity="0.65"/><path d="M520 634h424" opacity="0.42"/>
  </g>`;
}

function coverSvg(cover) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="1536" height="960" viewBox="0 0 1536 960">
    <defs>
      <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M48 0H0V48" fill="none" stroke="#475149" stroke-width="1" opacity="0.22"/>
      </pattern>
    </defs>
    <rect width="1536" height="960" fill="#1d211e"/>
    <rect width="1536" height="960" fill="url(#grid)"/>
    <rect x="0" y="0" width="18" height="960" fill="${cover.accent}"/>
    <rect x="1100" y="0" width="436" height="960" fill="${cover.soft}" opacity="0.96"/>
    <path d="M1100 0v960" stroke="${cover.accent}" stroke-width="2" opacity="0.7"/>
    <circle cx="1318" cy="422" r="218" fill="none" stroke="${cover.accent}" stroke-width="2" opacity="0.18"/>
    <circle cx="1318" cy="422" r="154" fill="none" stroke="${cover.accent}" stroke-width="2" opacity="0.28"/>
    <text x="72" y="230" fill="${cover.accent}" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="0">${cover.code}</text>
    <text x="72" y="408" fill="#ecefea" font-family="Inter, Arial, sans-serif" font-size="72" font-weight="800" letter-spacing="0">${cover.title}</text>
    <text x="72" y="466" fill="#a1aa9f" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="500" letter-spacing="0">${cover.subtitle}</text>
    <path d="M72 526h920" stroke="#475149" stroke-width="2" opacity="0.72"/>
    ${motifMarkup(cover.motif, cover.accent)}
    ${iconMarkup(cover.icon, cover.accent)}
  </svg>`;
}

await mkdir(outputDir, { recursive: true });

for (const cover of covers) {
  const output = path.join(outputDir, cover.file);
  await sharp(Buffer.from(coverSvg(cover)))
    .webp({ quality: 92, smartSubsample: true })
    .toFile(output);
  console.log(path.relative(root, output));
}
