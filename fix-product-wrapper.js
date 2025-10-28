import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Cambiando ProductSimple a ProductPageWrapper...\n');

const filesToFix = [
  'src/pages/sosburnsensitive.astro',
  'src/pages/sosburnclear.astro',
  'src/pages/slimcoffe.astro',
  'src/pages/primerose.astro',
  'src/pages/ashawandha.astro'
];

let totalFixed = 0;

for (const relativePath of filesToFix) {
  const filePath = path.join(__dirname, relativePath);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  No encontrado: ${relativePath}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Cambiar ProductSimple a ProductPageWrapper
  content = content.replace(/<ProductSimple/g, '<ProductPageWrapper');
  
  fs.writeFileSync(filePath, content, 'utf-8');
  totalFixed++;
  console.log(`✅ ${path.basename(filePath)}`);
}

console.log(`\n✨ Total archivos corregidos: ${totalFixed}`);

