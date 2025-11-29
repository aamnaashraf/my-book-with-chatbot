/**
 * Generate Flexsearch index from glossary.md
 * Parses glossary terms and creates a searchable index
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateGlossaryIndex() {
  const glossaryPath = path.join(__dirname, '../docs/references/glossary.md');

  if (!fs.existsSync(glossaryPath)) {
    console.log('✓ No glossary.md found - skipping index generation');
    return;
  }

  const content = fs.readFileSync(glossaryPath, 'utf8');
  const terms = [];

  // Parse glossary: Each term is an H2 (##) followed by definition
  const lines = content.split('\n');
  let currentTerm = null;
  let currentDefinition = [];

  lines.forEach((line, index) => {
    if (line.startsWith('## ')) {
      // Save previous term if exists
      if (currentTerm) {
        terms.push({
          term: currentTerm,
          definition: currentDefinition.join(' ').trim(),
          id: currentTerm.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        });
      }

      // Start new term
      currentTerm = line.replace('## ', '').trim();
      currentDefinition = [];
    } else if (currentTerm && line.trim()) {
      currentDefinition.push(line.trim());
    }
  });

  // Save last term
  if (currentTerm) {
    terms.push({
      term: currentTerm,
      definition: currentDefinition.join(' ').trim(),
      id: currentTerm.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    });
  }

  // Generate index data
  const indexData = {
    terms,
    generated: new Date().toISOString()
  };

  // Write to static directory for client-side access
  const outputPath = path.join(__dirname, '../static/glossary-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(indexData, null, 2));

  console.log(`\n✓ Generated glossary index with ${terms.length} terms`);
  console.log(`  Output: static/glossary-index.json\n`);
}

// Run generation
try {
  generateGlossaryIndex();
} catch (error) {
  console.error('Error generating glossary index:', error);
  process.exit(1);
}
