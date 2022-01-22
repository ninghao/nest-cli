import { join } from 'path';
import { execSync } from 'child_process';

export default (
  name: string,
  path: string,
  parentPath: string = '',
  options: any = {},
) => {
  console.log('模块');

  // 路径
  path = path ? path : name;

  // 选项
  const { dryRun = '' } = options;

  // 生成
  const result = execSync(
    `nest generate module ${name} ${path} --flat ${dryRun ? '--dry-run' : ''}`,
  );

  // 输出结果
  console.log(result.toString());
};
