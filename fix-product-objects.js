import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Corrigiendo productImage= en objetos JavaScript...\n');

const pagesDir = path.join(__dirname, 'src', 'pages');
const pageFiles = fs.readdirSync(pagesDir)
  .filter(f => f.endsWith('.astro'))
  .map(f => path.join(pagesDir, f));

let totalFixed = 0;

for (const filePath of pageFiles) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  // Buscar líneas que tienen  productImage="..." dentro de un objeto (seguidas de coma o siguiente línea con productUrl:)
  // En objetos JavaScript, se usa : no =
  const lines = content.split('\n');
  let inProductData = false;
  let newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Detectar si entramos en el objeto productData
    if (line.includes('const productData = {')) {
      inProductData = true;
    }
    
    // Si estamos en productData y encontramos productImage=, cambiar a :
    if (inProductData && line.includes('productImage="')) {
      line = line.replace(/productImage="([^"]+)"/, 'productImage: "$1"');
      modified = true;
    }
    
    // Detectar si salimos del objeto
    if (inProductData && line.trim() === '};') {
      inProductData = false;
    }
    
    newLines.push(line);
  }
  
  if (modified) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
    totalFixed++;
    console.log(`✅ ${path.basename(filePath)}`);
  }
}

console.log(`\n✨ Total archivos corregidos: ${totalFixed}`);

