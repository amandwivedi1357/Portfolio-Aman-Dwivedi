const fs = require('fs');
const path = require('path');

const skills = [
  { name: 'nextjs', color: '#000000' },
  { name: 'tailwind', color: '#38B2AC' },
  { name: 'typescript', color: '#3178C6' },
  { name: 'nodejs', color: '#339933' },
  { name: 'express', color: '#000000' },
  { name: 'python', color: '#3776AB' },
  { name: 'django', color: '#092E20' },
  { name: 'mongodb', color: '#47A248' },
  { name: 'postgresql', color: '#4169E1' },
  { name: 'docker', color: '#2496ED' },
  { name: 'aws', color: '#FF9900' }
];

skills.forEach(skill => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="${skill.color}">
  <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0z"/>
</svg>`;

  const outputPath = path.join(__dirname, '..', 'public', 'skills', `${skill.name}.svg`);
  fs.writeFileSync(outputPath, svg);
  console.log(`Generated ${skill.name}.svg`);
});
