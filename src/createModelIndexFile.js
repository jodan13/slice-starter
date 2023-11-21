import fs from 'fs';
import path from 'path';

export function createModelIndexFile(layerPath, nameLowerCase) {
  const content =
    `export { ${nameLowerCase}Watcher } from './saga';
export { ${nameLowerCase}Actions, ${nameLowerCase}Reducer } from './slice';
`;
  fs.writeFileSync(path.join(layerPath, 'index.ts'), content);
}
