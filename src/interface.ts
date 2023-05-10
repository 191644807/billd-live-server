export interface ILive {
  id?: number;
  system?: number;
  socketId?: string;
  roomId?: string;
  roomName?: string;
  track_video?: boolean;
  track_audio?: boolean;
  coverImg?: string;
  streamurl?: string;
  flvurl?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IBlacklist {
  id?: number;
  ip?: string;
  user_id?: number;
  type?: number;
  msg?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IEmail {
  id?: number;
  email?: string;
  code?: string;
  exp?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IQqUser {
  id?: number;
  client_id?: number;
  openid?: string;
  unionid?: string;
  nickname?: string;
  figureurl?: string;
  figureurl_1?: string;
  figureurl_2?: string;
  figureurl_qq_1?: string;
  figureurl_qq_2?: string;
  constellation?: string;
  gender?: string;
  city?: string;
  province?: string;
  year?: string;
  ret?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IThirdUser {
  id?: number;
  user_id?: number;
  third_user_id?: number;
  third_platform?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ILog {
  id?: number;
  user_id?: number;
  api_user_agent?: string;
  api_duration?: number;
  api_from?: number;
  api_forwarded_for?: string;
  api_referer?: string;
  api_real_ip?: string;
  api_host?: string;
  api_hostname?: string;
  api_method?: string;
  api_path?: string;
  api_query?: string;
  api_body?: string;
  api_status_code?: number;
  api_error?: string;
  api_err_msg?: string;
  api_err_code?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IUser {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  status?: number;
  avatar?: string;
  desc?: string;
  token?: string;
  user_roles?: number[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  qq_users?: IQqUser[];
}

export interface IAuth {
  id?: number;
  p_id?: number;
  auth_name?: string;
  auth_value?: string;
  type?: number;
  priority?: number;
  c_auths?: number[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
export interface IRole {
  id?: number;
  p_id?: number;
  role_name?: string;
  role_value?: string;
  type?: number;
  priority?: number;
  role_auths?: number[];
  c_roles?: number[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
export interface IRoleAuth {
  id?: number;
  role_id?: number;
  auth_id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export type IList<T> = {
  nowPage?: string;
  pageSize?: string;
  orderBy?: string;
  orderName?: string;
  keyWord?: string;
  rangTimeType?: 'created_at' | 'updated_at' | 'deleted_at';
  rangTimeStart?: string;
  rangTimeEnd?: string;
} & T;

export interface IUserRole {
  id?: number;
  user_id: number;
  role_id: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IDayData {
  id?: number;
  today: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
