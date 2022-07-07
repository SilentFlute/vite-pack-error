export interface WINDOW extends Window {
  [key: string]: any;
}

export interface MyEventTarget extends EventTarget {
  [key: string]: any;
}

export interface MyEle extends Element {
  [key: string]: any;
}

//用户标识映射
export interface UserIdMap {
  device_id: string;
  member_id?: string;
}

//运行环境
type RunEnv = 'PC' | 'mobile';

//类的参数
export interface Opt {
  runEnv: RunEnv;
  categoryName: string;
  extraHeight?: number;
  listItemClassName?: string;
  mobileListScrollContainerId?: string;
  articleItemContainerClassName?: string[];
}