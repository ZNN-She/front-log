/**
 * Created by zhangnanning on 2020/9/30.
 * 发布脚本，这里做了一些验证
 * 还可以在晚上些，比如自动登陆
 * 有问题还需要测试
 */
import { execa } from 'execa';
import chalk from 'chalk'; // 这个是让log带颜色，方便识别
import shell from 'shelljs'; // 执行shell脚本

// 账户名字，因为公司私有npm库只有一个账号 账号：admin 密码：xxxx
const REGISTRY = 'https://xxx.com';

// 检查registry地址是否是公司的npm地址，防止放到共网上去，共网上的npm库24小时之内是可以删除，超过24小时就不可以删除了，公司私有npm库目前是都可删除
const checkRegistry = async () => {
  console.log(chalk.blue('验证npm地址'))
  try {
    const { stdout } = await execa('npm', ['config', 'get', 'registry']);
    console.log(`registry=${stdout}`);
    if (stdout.indexOf(REGISTRY) === 0) {
      return Promise.resolve(stdout);
    }
    console.log(chalk.red(`your registry is ${stdout}, registry should is not ${REGISTRY}`))

    return Promise.reject(new Error(`your registry is ${stdout}, registry should is not ${REGISTRY}`));
  } catch (err) {
    console.log(chalk.red(err))

    return Promise.reject(err);
  }
};

// 发布前本地代码必须提交
const checkGit = async () => {
  console.log(chalk.blue('开始验证git'));
  try {

    // 获取git的状态，需要系统安装了git
    const gitStatus = shell.exec('git status --porcelain', {
      silent: true,
    })
      .toString();

    // 有没提交的代码
    if (gitStatus !== '') {
      // 打印错误
      console.log(chalk.red('✖ Unclean working tree, please commit or stash changes first.'));
      return Promise.reject();
    }
    console.log(chalk.green('✔ workspace is clean'));
    return Promise.reject();
  } catch (error) {
    console.log(chalk.red('Maybe this project is NOT a Git repo, exited.'));
    return Promise.reject();
  }
};

// 发布
const publish = () => {
  return execa('npm', ['publish']);
};

const run = async () => {
  await checkRegistry();
  await checkGit();
  await publish();
};

run();