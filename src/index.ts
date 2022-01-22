#!/usr/bin/env node

import { Command } from 'commander';
import generateController from './commands/generate-controller.handler';
import generateModule from './commands/generate-module.handler';
import generateDto from './commands/generate-dto.handler';
import generateEntity from './commands/generate-entity.handler';
import generateCommand from './commands/generate-command.handler';
import generateQuery from './commands/generate-query.handler';
import generateSaga from './commands/generate-saga.handler';
import generateEvent from './commands/generate-event.handler';
import getParentPath from './utils/get-parent-path';

const program = new Command();

// program
//   .option('-co, --controller <name...>', '控制器')
//   .option('-dt, --dto <name...>', '数据传输对象')
//   .option('-en, --entity <name...>', '实体')
//   .option('-cm, --command <name...>', '命令')
//   .option('-q, --query <name...>', '查询')
//   .option('-s, --saga <name...>', 'Saga')
//   .option('-po, --policy <name...>', '权限策略')
//   .option('-cg, --config <name...>', '配置');

/**
 * 生成
 */
const generate = program.command('generate').alias('g');

/**
 * 模块
 */
generate
  .command('module')
  .alias('mo')
  .argument('<name>', '名字')
  .argument('[path]', '路径', '')
  .option('-d, --dry-run', '模拟执行命令并输出结果')
  .option('-co, --controller <name...>', '控制器')
  .option('-dt, --dto <name...>', '数据传输对象')
  .option('-en, --entity <name...>', '实体')
  .option('-ev, --event <name...>', '事件')
  .option('-c, --command <name...>', '命令')
  .option('-q, --query <name...>', '查询')
  .option('-s, --saga <name...>', 'Saga')
  .action(async (name, path, options) => {
    // 解构选项
    const { controller, dto, entity, command, query, saga, event, dryRun } =
      options;

    // 生成模块
    generateModule(name, path, '', { dryRun });

    // 模块路径
    const modulePath = path ? path : name;

    // 生成控制器
    if (controller?.length) {
      const [controllerName, controllerPath] = controller;
      generateController(controllerName, controllerPath, modulePath);
    }

    // 生成数据传输对象
    if (dto?.length) {
      const [dtoName, dtoPath] = dto;
      generateDto(dtoName, dtoPath, modulePath, { dryRun });
    }

    // 生成实体
    if (entity?.length) {
      const [entityName, entityPath] = entity;
      generateEntity(entityName, entityPath, modulePath, { dryRun });
    }

    // 生成命令
    if (command?.length) {
      const [commandName, commandPath] = command;
      generateCommand(commandName, commandPath, modulePath, { dryRun });
    }

    // 生成查询
    if (query?.length) {
      const [queryName, queryPath] = query;
      generateQuery(queryName, queryPath, modulePath, { dryRun });
    }

    // 生成 Saga
    if (saga?.length) {
      const [sagaName, sagaPath] = saga;
      generateSaga(sagaName, sagaPath, modulePath, { dryRun });
    }

    // 生成事件
    if (event?.length) {
      const [eventName, eventPath] = saga;
      generateSaga(eventName, eventPath, modulePath, { dryRun });
    }
  });

/**
 * 命令
 */
generate
  .command('command')
  .alias('c')
  .argument('<name>', '名字')
  .argument('[path]', '路径', '')
  .option('-d, --dry-run', '模拟执行命令并输出结果')
  .option(
    '-p, --parent <name...>',
    '如 user create，将转换成 user/modules/create',
  )
  .action(async (name, path, options) => {
    // 解构选项
    const { dryRun, parent } = options;

    // 执行命令
    generateCommand(name, path, getParentPath(parent), { dryRun });
  });

/**
 * 事件
 */
generate
  .command('event')
  .alias('ev')
  .argument('<name>', '名字')
  .argument('[path]', '路径', '')
  .option('-d, --dry-run', '模拟执行命令并输出结果')
  .option(
    '-p, --parent <name...>',
    '如 user create，将转换成 user/modules/create',
  )
  .action(async (name, path, options) => {
    // 解构选项
    const { dryRun, parent } = options;

    // 执行命令
    generateEvent(name, path, getParentPath(parent), { dryRun });
  });

/**
 * 查询
 */
generate
  .command('query')
  .alias('q')
  .argument('<name>', '名字')
  .argument('[path]', '路径', '')
  .option('-d, --dry-run', '模拟执行命令并输出结果')
  .option(
    '-p, --parent <name...>',
    '如 user create，将转换成 user/modules/create',
  )
  .action(async (name, path, options) => {
    // 解构选项
    const { dryRun, parent } = options;

    // 执行命令
    generateQuery(name, path, getParentPath(parent), { dryRun });
  });

/**
 * Saga
 */
generate
  .command('saga')
  .alias('s')
  .argument('<name>', '名字')
  .argument('[path]', '路径', '')
  .option('-d, --dry-run', '模拟执行命令并输出结果')
  .option(
    '-p, --parent <name...>',
    '如 user create，将转换成 user/modules/create',
  )
  .action(async (name, path, options) => {
    // 解构选项
    const { dryRun, parent } = options;

    // 执行命令
    generateSaga(name, path, getParentPath(parent), { dryRun });
  });

/**
 * 实体
 */
generate
  .command('entity')
  .alias('en')
  .argument('<name>', '名字')
  .argument('[path]', '路径', '')
  .option('-d, --dry-run', '模拟执行命令并输出结果')
  .option(
    '-p, --parent <name...>',
    '如 user create，将转换成 user/modules/create',
  )
  .action(async (name, path, options) => {
    // 解构选项
    const { dryRun, parent } = options;

    // 执行命令
    generateEntity(name, path, getParentPath(parent, name), { dryRun });
  });

/**
 * 控制器
 */
generate
  .command('controllers')
  .alias('co')
  .argument('<name>', '名字')
  .argument('[path]', '路径', '')
  .option('-d, --dry-run', '模拟执行命令并输出结果')
  .option(
    '-p, --parent <name...>',
    '如 user create，将转换成 user/modules/create',
  )
  .action(async (name, path, options) => {
    // 解构选项
    const { dryRun, parent } = options;

    // 执行命令
    generateController(name, path, getParentPath(parent, name), { dryRun });
  });

/**
 * DTO
 */
generate
  .command('dto')
  .alias('dt')
  .argument('<name>', '名字')
  .argument('[path]', '路径', '')
  .option('-d, --dry-run', '模拟执行命令并输出结果')
  .option(
    '-p, --parent <name...>',
    '如 user create，将转换成 user/modules/create',
  )
  .action(async (name, path, options) => {
    // 解构选项
    const { dryRun, parent } = options;

    // 执行命令
    generateDto(name, path, getParentPath(parent, name), { dryRun });
  });

// 解析
program.parse();
