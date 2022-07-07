/**
* @description 页面报错, 媒体资源报错的监听代码
*/

import type { WINDOW, UserIdMap, Opt } from './type';

interface MyEventType extends WindowEventMap {
  'mediaError': CustomEvent;
}

interface MyWindow extends Window {
  addEventListener<K extends keyof MyEventType>(type: K, listener: (ev: MyEventType[K]) => any, options?: boolean | AddEventListenerOptions): void;
}

interface UnCatchJsError {
  msg: string;
};

interface MediaErrorDetail {
  name: string; //标签名称
  src: string; //标签的资源url
}

class CustomEventListener {
  /**
  * @param runEnv 运行环境
  * @param categoryName 栏目名称(普通栏目诸如: jj nydny, 新闻站首页可能会有所不同)
  */

  //countly对象
  private countly: any = (window as WINDOW).Countly;
  //用户标识映射
  private userIdMap: UserIdMap = (window as WINDOW).userIdMap;
  //自定义事件前缀
  private customEventPrefix: string;

  constructor(opt: Opt) {
    console.log('constructor执行了');
    const { runEnv, categoryName } = opt;
    //设置自定义事件前缀
    this.customEventPrefix = `${categoryName}-${runEnv}`;
    //注册事件监听
    window.addEventListener('error', e => {
      // console.log('页面报错', e.message);
      this.handlePushData('js-error', {
        msg: e.message
      });
    });
    (window as MyWindow).addEventListener('mediaError', (e: CustomEvent) => {
      // console.log('媒体资源报错', e.detail);
      this.handlePushData('media-error', e.detail);
    });
  }

  //推送数据的方法
  private handlePushData = (key: string, seg: UnCatchJsError | MediaErrorDetail) => {
    console.log('this.userIdMap', this.userIdMap);
    console.log(
      `${this.customEventPrefix}-${key} segmentation`,
      {
        ...this.userIdMap,
        ...seg,
        a: 1
      }
    );
    console.log('seg', seg);
    return;
    this.countly.q.push(['add_event', {
      key: `${this.customEventPrefix}-${key}`,
      segmentation: {
        ...this.userIdMap,
        ...seg
      }
    }]);
  }
}

export default CustomEventListener;