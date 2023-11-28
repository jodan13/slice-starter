import fs from 'fs';
import path from 'path';

export function createModelIndexFile(layerPath, _nameLowerCase) {
  const content = `// Initial content`;
  fs.writeFileSync(path.join(layerPath, 'index.ts'), content);
}
