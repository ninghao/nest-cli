import { join } from 'path';

export default (parent: Array<string>, name: string = '') => {
  let parentPath = '';

  if (parent) {
    parentPath =
      parent.length > 1
        ? join(parent[0], 'modules', parent[1])
        : join(parent[0], 'modules');
  } else {
    parentPath = name;
  }

  return parentPath;
};
