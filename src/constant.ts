import { resolveApp } from './utils';

export enum PROJECT_ENV_ENUM {
  development = 'development',
  prod = 'prod',
  beta = 'beta',
}

export const PROJECT_ALIAS = process.env
  .NODE_APP_RELEASE_PROJECT_ALIAS as string;
export const PROJECT_NAME = process.env.NODE_APP_RELEASE_PROJECT_NAME as string;
export const PROJECT_ENV = process.env
  .NODE_APP_RELEASE_PROJECT_ENV as PROJECT_ENV_ENUM;
export const PROJECT_PORT = process.env.NODE_APP_RELEASE_PROJECT_PORT as string;
export const PROJECT_NODE_ENV = process.env.NODE_ENV as string;

// 七牛云文件上传进度类型
export enum QINIU_UPLOAD_PROGRESS_TYPE {
  fileProgress = 1,
  chunkFileProgress = 2,
}

export const QINIU_BACKUP = {
  domain: 'backup.hsslive.cn',
  url: 'http://backup.hsslive.cn/',
  bucket: 'hss-backup',
  prefix: {
    'mysql/': 'mysql/',
  },
};

export const QINIU_LIVE = {
  domain: 'resource.hsslive.cn',
  url: 'https://resource.hsslive.cn/',
  bucket: 'hssblog',
  prefix: {
    'billd-live/image/': 'billd-live/image/',
    'billd-live/msg-image/': 'billd-live/msg-image/',
  },
};

export const CORS_ALLOW_ORIGIN: string | string[] = [
  'https://www.hsslive.cn',
  'https://admin.hsslive.cn',
  'https://live.hsslive.cn',
  'https://live-admin.hsslive.cn',
  'https://live-api.hsslive.cn',
  'https://nuxt2.hsslive.cn',
];

/** 消息最大长度 */
export const MSG_MAX_LENGTH = 150;

export const VIDEO_DIR =
  PROJECT_ENV === PROJECT_ENV_ENUM.prod
    ? resolveApp(`/dist/video/`)
    : resolveApp(`/video/`); // video文件目录

export const WEBM_DIR =
  PROJECT_ENV === PROJECT_ENV_ENUM.prod
    ? resolveApp(`/dist/webm/`)
    : resolveApp(`/webm/`); // webm文件目录

export const STATIC_DIR =
  PROJECT_ENV === PROJECT_ENV_ENUM.prod
    ? resolveApp('/dist/public/')
    : resolveApp('/public/'); // 静态文件目录

export const UPLOAD_DIR =
  PROJECT_ENV === PROJECT_ENV_ENUM.prod
    ? resolveApp('/dist/upload/')
    : resolveApp('/upload/'); // 上传文件接口接收到的文件存放的目录

export const SECRET_FILE =
  PROJECT_ENV === PROJECT_ENV_ENUM.prod
    ? resolveApp('/dist/config/secret.js')
    : resolveApp('/src/config/secret.ts'); // 秘钥文件

export const SECRETTEMP_FILE =
  PROJECT_ENV === PROJECT_ENV_ENUM.prod
    ? resolveApp('/dist/config/secretTemp.js')
    : resolveApp('/src/config/secretTemp.ts'); // 秘钥文件模板

export const QQ_MAIL_CONFIG = {
  from: '2274751790@qq.com', // sender address
  to: '2274751790@qq.com', // list of receivers
};

export const maxBitrate = 1000 * 3; // 最大码率，3m

export const SERVER_VIDEO_DIR = '/node/video/'; // 服务器video目录
export const LOCALHOST_URL = 'localhost'; // 本地地址，一般是localhost或者127.0.0.1，但也可以是其他本地地址，如192.168.x.x
export const DOMAIN_URL = 'localhost'; // 本地地址，一般是localhost或者127.0.0.1，但也可以是其他本地地址，如192.168.x.x

// .hsslive.cn
export const COOKIE_DOMAIN = '.hsslive.cn';

export const ERROR_HTTP_CODE = {
  serverError: 10000, // 服务器错误
  banIp: 1000,
  adminDisableUser: 1001,
  notFound: 1002, // 返回了404的http状态码
  errStatusCode: 1003, // 返回了即不是200也不是404的http状态码
  shutdown: 1004, // 停机维护
};

export const ALLOW_HTTP_CODE = {
  ok: 200, // 成功
  apiCache: 304, // 接口缓存
  paramsError: 400, // 参数错误
  unauthorized: 401, // 未授权
  forbidden: 403, // 权限不足
  notFound: 404, // 未找到
  methodNotAllowed: 405, // 方法不允许，如：服务端提供了一个get的/api/list接口，但客户端却post了/api/list接口
  serverError: 500, // 服务器错误
};

export const HTTP_ERROE_MSG = {
  paramsError: '参数错误！',
  unauthorized: '未授权！',
  forbidden: '权限不足！',
  notFound: '未找到！',
  serverError: '服务器错误！',
};

export const HTTP_SUCCESS_MSG = {
  GET: '获取成功！',
  POST: '新增成功！',
  PUT: '修改成功！',
  DELETE: '删除成功！',
};

export const BLACKLIST_TYPE = {
  banIp: 1, // 频繁操作
  adminDisableUser: 2, // 被管理员禁用
};

export const SCHEDULE_TYPE = {
  verifyStream: 'handleVerifyStream',
  blobIsExist: 'blobIsExist',
};

export const COMMON_ERR_MSG = {
  banIp: '此ip已被禁用，请联系管理员处理！',
  jwtExpired: '登录信息过期！',
  invalidToken: '非法token！',
  adminDisableUser: '你的账号已被管理员禁用，请联系管理员处理！',
  shutdown: '停机维护中~',
};

export const REDIS_PREFIX_ENV = `${PROJECT_NAME}-${PROJECT_ENV}-`;

// redis前缀
export const REDIS_PREFIX = {
  emailLogin: `${REDIS_PREFIX_ENV}emailLogin___`, // 邮箱登录
  emailRegister: `${REDIS_PREFIX_ENV}emailRegister___`, // 邮箱注册
  userBindEmail: `${REDIS_PREFIX_ENV}userBindEmail___`, // 用户绑定邮箱
  userCancelBindEmail: `${REDIS_PREFIX_ENV}userCancelBindEmail___`, // 用户取消绑定邮箱
  joined: `${REDIS_PREFIX_ENV}joined___`, // 用户加入了房间
  roomIsLiveing: `${REDIS_PREFIX_ENV}roomIsLiveing___`, // 主播正在直播
  order: `${REDIS_PREFIX_ENV}order___`, // 订单
  fileProgress: `${REDIS_PREFIX_ENV}fileProgress___`, // 文件上传进度
  qrCodeLogin: `${REDIS_PREFIX_ENV}qrCodeLogin___`, // 二维码登录
  disableSpeaking: `${REDIS_PREFIX_ENV}disableSpeaking___`, // 禁言用户
  kick: `${REDIS_PREFIX_ENV}kick___`, // 踢掉用户
  liveRoomOnlineUser: `${REDIS_PREFIX_ENV}liveRoomOnlineUser___`, // 直播间在线用户
  livePkKey: `${REDIS_PREFIX_ENV}livePkKey___`, // 直播间打pk秘钥
};

export const IS_UPLOAD_SERVER = !(PROJECT_ENV === PROJECT_ENV_ENUM.prod); // 是否上传到服务器

// 平台类型
export const THIRD_PLATFORM = {
  website: 1, // 站内（user表里面的用户就是这个类型，但是不记录在third_user表里）
  qq: 2, // qq
  wechat: 3, // wechat
};

export const DEFAULT_AUTH_INFO = {
  ALL_AUTH: {
    id: 1,
    auth_value: 'ALL_AUTH',
  },
  USER_MANAGE: {
    id: 2,
    auth_value: 'USER_MANAGE',
  },
  ROLE_MANAGE: {
    id: 3,
    auth_value: 'ROLE_MANAGE',
  },
  AUTH_MANAGE: {
    id: 4,
    auth_value: 'AUTH_MANAGE',
  },
  MESSAGE_MANAGE: {
    id: 5,
    auth_value: 'MESSAGE_MANAGE',
  },
  MESSAGE_SEND: {
    id: 6,
    auth_value: 'MESSAGE_SEND',
  },
  MESSAGE_DISABLE: {
    id: 7,
    auth_value: 'MESSAGE_DISABLE',
  },
  LOG_MANAGE: {
    id: 8,
    auth_value: 'LOG_MANAGE',
  },
  LIVE_MANAGE: {
    id: 9,
    auth_value: 'LIVE_MANAGE',
  },
  LIVE_PUSH: {
    id: 10,
    auth_value: 'LIVE_PUSH',
  },
  LIVE_PULL: {
    id: 11,
    auth_value: 'LIVE_PULL',
  },
  LIVE_PULL_SVIP: {
    id: 12,
    auth_value: 'LIVE_PULL_SVIP',
  },
};

export const DEFAULT_ROLE_INFO = {
  ALL_ROLE: {
    id: 1,
    role_value: 'ALL_ROLE',
  },
  ADMIN: {
    id: 2,
    role_value: 'ADMIN',
  },
  SUPER_ADMIN: {
    id: 3,
    role_value: 'SUPER_ADMIN',
  },
  LIVE_ADMIN: {
    id: 4,
    role_value: 'LIVE_ADMIN',
  },
  USER: {
    id: 5,
    role_value: 'USER',
  },
  VIP_USER: {
    id: 6,
    role_value: 'VIP_USER',
  },
  SVIP_USER: {
    id: 7,
    role_value: 'SVIP_USER',
  },
  TOURIST_USER: {
    id: 8,
    role_value: 'TOURIST_USER',
  },
};

export const SRS_CB_URL_PARAMS = {
  publishKey: 'pushkey',
  publishType: 'pushtype',
  userToken: 'usertoken',
  userId: 'userid',
  randomId: 'randomid',
};
