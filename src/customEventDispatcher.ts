/**
 * @description 派发页面报错, 媒体资源报错事件的代码
 */

import { MyEventTarget } from './type.d';

type MyEt = MyEventTarget | null;

const errorHandler: OnErrorEventHandler = (e: Event | string) => {
  if(typeof e === 'string') {
    return;
  }

  const eventTarget: MyEt = e.target;
  if(!eventTarget) {
    return;
  }

  const params = {
    bubbles: true,
    detail: {
      name: eventTarget.localName,
      src: eventTarget.currentSrc || eventTarget.href
    }
  }

  const eventType = 'mediaError';
  let mediaErrorEvent = null;

  try{
    mediaErrorEvent = new CustomEvent(eventType, params);
  }catch(error) {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventType, params.bubbles, false, params.detail);
    mediaErrorEvent = event;
  }

  eventTarget.dispatchEvent(mediaErrorEvent);
}

//给媒体节点添加错误回调
const imgList: HTMLCollectionOf<HTMLElementTagNameMap['img']> = document.getElementsByTagName('img');
const videoList: HTMLCollectionOf<HTMLElementTagNameMap['video']> = document.getElementsByTagName('video');

for(let i = 0; i < imgList.length; i++) {
  imgList[i].onerror = errorHandler;
}

for(let j = 0; j < videoList.length; j++) {
  videoList[j].onerror = errorHandler;
}