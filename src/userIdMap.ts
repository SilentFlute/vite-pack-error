/**
* @description 用户标识映射
*/

import type { WINDOW, UserIdMap } from './type';

const { Countly } = (window as WINDOW);

const userIdMap: UserIdMap = {
  device_id: Countly.device_id ? Countly.device_id : 'test_device_id'
};

const memberId = localStorage.getItem('memberId');

if(memberId) {
  userIdMap.member_id = memberId;
}

(window as WINDOW).userIdMap = userIdMap;