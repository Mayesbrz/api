import fs from 'fs';

export function saveToJSON(data) {
  fs.writeFileSync('profile.json', JSON.stringify(data, null, 2), 'utf-8');
  console.log('📁 Fichier profile.json généré avec succès.');
}
