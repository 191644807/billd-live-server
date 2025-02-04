import { getArrayDifference } from 'billd-utils';
import chalk from 'chalk';
import { ParameterizedContext } from 'koa';

import { authJwt } from '@/app/auth/authJwt';
import {
  ALLOW_HTTP_CODE,
  BLACKLIST_TYPE,
  COMMON_ERR_MSG,
  ERROR_HTTP_CODE,
} from '@/constant';
import authController from '@/controller/auth.controller';
import blacklistController from '@/controller/blacklist.controller';
import { CustomError } from '@/model/customError.model';
import { chalkINFO, chalkWARN } from '@/utils/chalkTip';

// 前台的所有get和白名单内的接口不需要token
const frontendWhiteList = [
  '/init/role',
  '/init/auth',
  '/init/roleAuth',
  '/init/dayData',

  '/user/qrcode_login', // 登录，这个接口是post的
  '/user/login', // 登录，这个接口是post的
  '/qq_user/login', // 登录，这个接口是post的
  '/wechat_user/login', // 登录，这个接口是post的
  '/qiniu_data/upload',
  '/qiniu_data/upload_chunk',
  '/qiniu_data/merge_chunk',

  '/order/pay',
  '/wallet/init',

  '/srs/on_publish',
  '/srs/on_play',
  '/srs/on_stop',
  '/srs/on_unpublish',
  '/srs/on_dvr',
];

// 全局白名单
const globalWhiteList = ['/init/'];

// 允许频繁请求的路径白名单
const frequentlyWhiteList = [];

export const apiBeforeVerify = async (ctx: ParameterizedContext, next) => {
  console.log(chalkINFO('apiBeforeVerify中间件开始'));
  const startTime = performance.now();
  const url = ctx.request.path;
  const ip = (ctx.request.headers['x-real-ip'] as string) || '127.0.0.1';
  const consoleEnd = () => {
    const duration = Math.floor(performance.now() - startTime);
    console.log(chalkINFO('apiBeforeVerify中间件通过！'));
    console.log(chalkWARN(`apiBeforeVerify中间件耗时：${duration}ms`));
    console.log(
      chalkINFO(
        `日期：${new Date().toLocaleString()}，ip：${ip}，响应请求：${
          ctx.request.method
        } ${url}`
      )
    );
  };

  console.log(
    chalkINFO(
      `日期：${new Date().toLocaleString()}，ip：${ip}，收到请求 ${
        ctx.request.method
      } ${url}请求`
    )
  );

  console.log(chalk.blueBright('query:'), { ...ctx.request.query });
  console.log(chalk.blueBright('params:'), ctx.params);
  console.log(chalk.blueBright('body:'), ctx.request.body);
  console.log(chalk.blueBright('referer:'), ctx.request.header.referer);
  console.log(chalk.blueBright('cookie:'), ctx.request.header.cookie);
  console.log(chalk.blueBright('token:'), ctx.request.headers.authorization);

  // 判断黑名单
  const inBlacklist = await blacklistController.findByIp(ip);

  if (inBlacklist?.type === BLACKLIST_TYPE.banIp) {
    // 频繁操作
    throw new CustomError(
      `当前ip:${ip}调用api频繁,${COMMON_ERR_MSG.banIp}`,
      ALLOW_HTTP_CODE.forbidden,
      ERROR_HTTP_CODE.banIp
    );
  } else if (inBlacklist?.type === BLACKLIST_TYPE.adminDisableUser) {
    // 管理员手动禁用
    throw new CustomError(
      COMMON_ERR_MSG.adminDisableUser,
      ALLOW_HTTP_CODE.forbidden,
      ERROR_HTTP_CODE.adminDisableUser
    );
  }

  // 验证是否频繁请求
  // @ts-ignore
  if (frequentlyWhiteList.indexOf(url) === -1) {
    const res = true;
    // const res = await isPass(ip);
    if (!res) {
      const { userInfo } = await authJwt(ctx);
      blacklistController.common.create({
        user_id: userInfo?.id,
        ip,
        type: BLACKLIST_TYPE.banIp,
        msg: COMMON_ERR_MSG.banIp,
      });
      throw new CustomError(
        `当前ip:${ip}调用api频繁,${COMMON_ERR_MSG.banIp}`,
        ALLOW_HTTP_CODE.forbidden,
        ERROR_HTTP_CODE.banIp
      );
    }
  }

  let allowNext = false;
  globalWhiteList.forEach((item) => {
    if (ctx.req.url!.indexOf(item) === 0) {
      allowNext = true;
    }
  });

  if (allowNext) {
    console.log(chalkINFO('全局白名单，next'));
    await next();
    consoleEnd();
    return;
  }

  // 前端的get接口都不需要判断token，白名单内的也不需要判断token（如注册登录这些接口是post的）
  if (ctx.request.method === 'GET' || frontendWhiteList.indexOf(url) !== -1) {
    await next();
    consoleEnd();
    return;
  }
  const { code, message } = await authJwt(ctx);
  if (code !== ALLOW_HTTP_CODE.ok) {
    consoleEnd();
    throw new CustomError(message, code, code);
  }
  /**
   * 因为这个verify.middleware是最先执行的中间件路由，
   * 而且这个verify.middleware是异步的，因此如果需要等待异步执行完成才继续匹配后面的中间时，
   * 必须使用await next()，如果这里使用next()，就会返回数据了（404），也就是不会
   * 继续走后面的匹配了！但是如果加了await，就会等待后面的继续匹配完！
   */
  await next();
  consoleEnd();
};

export const apiVerifyAuth = (shouldAuthArr: string[]) => {
  return async (ctx: ParameterizedContext, next) => {
    const { code, userInfo, message } = await authJwt(ctx);
    if (code !== ALLOW_HTTP_CODE.ok || !userInfo) {
      throw new CustomError(message, code, code);
    }
    console.log('dddddd111');
    const myAllAuths = await authController.common.getUserAuth(userInfo.id!);
    console.log('dddddd222');

    const myAllAuthsArr = myAllAuths.map((v) => v.auth_value!);
    const diffArr = getArrayDifference(shouldAuthArr, myAllAuthsArr);
    if (diffArr.length > 0) {
      throw new CustomError(
        `缺少${diffArr.join()}权限！`,
        ALLOW_HTTP_CODE.forbidden,
        ALLOW_HTTP_CODE.forbidden
      );
    } else {
      await next();
    }
  };
};
