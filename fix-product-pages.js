import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Corrigiendo sintaxis en páginas de productos...\n');

const pagesDir = path.join(__dirname, 'src', 'pages');
const pageFiles = fs.readdirSync(pagesDir)
  .filter(f => f.endsWith('.astro'))
  .map(f => path.join(pagesDir, f));

let totalFixed = 0;

for (const filePath of pageFiles) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Verificar si tiene el error productImage: (con dos puntos)
  if (!content.includes('productImage:')) {
    continue;
  }
  
  // Corregir productImage: a productImage=
  const fixedContent = content.replace(/productImage:\s*"/g, 'productImage="');
  
  // Verificar si usa ProductSimple en lugar de ProductPageWrapper
  const needsWrapper = fixedContent.includes('<ProductSimple');
  
  if (fixedContent !== content) {
    fs.writeFileSync(filePath, fixedContent, 'utf-8');
    totalFixed++;
    console.log(`✅ ${path.basename(filePath)}`);
    
    if (needsWrapper) {
      console.log(`   ⚠️  NOTA: Revisar si usa ProductPageWrapper`);
    }
  }
}

console.log(`\n✨ Total archivos corregidos: ${totalFixed}`);

