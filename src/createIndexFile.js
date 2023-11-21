import fs from 'fs';
import path from 'path';

export function createIndexFile(baseDir, name, nameLowerCase) {
    const content = `export { ${name} } from './ui/${name}';
export { ${nameLowerCase}Actions, ${nameLowerCase}Reducer, ${nameLowerCase}Watcher } from './model';
export { getLoading } from './model/selectors';
`;
  fs.writeFileSync(path.join(baseDir, 'index.ts'), content);
}
