/**
 * @description 初始化countly的代码
 */

 import type { WINDOW } from './type.d';

const { Countly } = (window as WINDOW);

Countly.q = [];
Countly.app_key = import.meta.env.VITE_COUNTLY_APP_KEY;
Countly.url = import.meta.env.VITE_COUNTLY_URI;
Countly.init();