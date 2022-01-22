import { join } from 'path';
import { execSync } from 'child_process';

export default (
  name: string,
  path: string,
  parentPath: string = '',
  options: any = {},
) => {
  console.log('DTO');

  // 路径
  path = path ? path : join(parentPath, 'dtos');

  // 选项
  const { dryRun = '' } = options;

  // 生成
  const result = execSync(
    `nest generate class ${name}.dto ${path}  ${
      dryRun ? '--dry-run' : ''
    } --flat`,
  );

  // 输出结果
  console.log(result.toString());
};
