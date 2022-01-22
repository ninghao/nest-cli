import { join } from 'path';
import { execSync } from 'child_process';

export default (
  name: string,
  path: string,
  parentPath: string = '',
  options: any = {},
) => {
  console.log('实体');

  const suffix = 'entities';

  // 路径
  path = path ? path : join(parentPath, suffix);

  // 选项
  const { dryRun = '' } = options;

  // 生成
  const result = execSync(
    `nest generate --collection @ninghao/schematics entity ${name} ${path}  ${
      dryRun ? '--dry-run' : ''
    } --flat`,
  );

  // 输出结果
  console.log(result.toString());
};
