import fs from 'fs';
import path from 'path';

export function createIndexFile(baseDir, _name, _nameLowerCase) {
    const content = `// Initial content`;
  fs.writeFileSync(path.join(baseDir, 'index.ts'), content);
}
