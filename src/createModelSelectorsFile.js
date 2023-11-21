import fs from 'fs';
import path from 'path';

export function createModelSelectorsFile(layerPath, selectedLayers, nameLowerCase) {
  const content =
    `import { createSelector as se } from 'reselect';

const rSe = (state: TRootState) => state.${selectedLayers}.${nameLowerCase};

export const getLoading = se(rSe, (state) => state.isLoading);
`;
  fs.writeFileSync(path.join(layerPath, 'selectors.ts'), content);
}
