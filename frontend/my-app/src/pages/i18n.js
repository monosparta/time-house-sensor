/*
 * @Author: 20181101remon mindy80230@gmail.com
 * @Date: 2022-07-26 10:32:13
 * @LastEditors: 20181101remon mindy80230@gmail.com
 * @LastEditTime: 2022-07-26 11:44:36
 * @FilePath: \my-app\src\pages\i18n.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from '../locales/translation.json'

i18n
   // 使用 i18next-http-backend
   .use(initReactI18next) 
   // 實例化 initReactI18next
   .init({
      resources,
      // 預設語言
      lng: "tw",
      // 當目前的語言檔找不到對應的字詞時，會用 fallbackLng (en) 作為預設語言
      fallbackLng: "en",
      interpolation: {
         // 是否要讓字詞 escaped 來防止 xss 攻擊，這裡因為 React.js 已經做了，就設成 false即可
         escapeValue: false,
      },
   });

export default i18n;