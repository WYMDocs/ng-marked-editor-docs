import { Injectable } from '@angular/core';

@Injectable()
export class ColorToolService {

  constructor() { }

  /**
   * @description 判断颜色是否是淡色
   * @param color 颜色rbg格式
   * @returns boolean
   */
  isLight(color: number[]): { isLight: boolean, rate: number } {
    const e = 0.213 * color[0] +
      0.715 * color[1] +
      0.072 * color[2];

    const res = {
      isLight: e > (255 / 2),
      rate: e / 255
    };
    return res;
  }

  /*RGB颜色转换为16进制*/
  colorHex(that: string): string {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(that)) {
      const aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
      let strHex = '#';
      for (const color of aColor) {
        let hex = Number(color).toString(16);
        if (hex === '0') {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = that;
      }
      return strHex;
    } else if (reg.test(that)) {
      const aNum = that.replace(/#/, '').split('');
      if (aNum.length === 6) {
        return that;
      } else if (aNum.length === 3) {
        let numHex = '#';
        for (const num of aNum) {
          numHex += (num + num);
        }
        return numHex;
      }
    } else {
      return that;
    }
  }

  /**
   *
   * @param that 16进制转rbg
   * @returns 颜色
   */
  colorRgb(that: string): string {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = that.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '#';
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      // 处理六位的颜色值
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2), 16));
      }
      return 'RGB(' + sColorChange.join(',') + ')';
    } else {
      return sColor;
    }
  }

  /**
   * HSL颜色值转换为RGB.
   * 换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
   * h, s, 和 l 设定在 [0, 1] 之间
   * 返回的 r, g, 和 b 在 [0, 255]之间
   *
   * @param   Number  h       色相
   * @param   Number  s       饱和度
   * @param   Number  l       亮度
   * @return  Array           RGB色值数值
   */
  hslToRgb(h: number, s: number, l: number): number[] {
    let r: number;
    let g: number;
    let b: number;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p1: number, q1: number, t: number) => {
        if (t < 0) { t += 1; }
        if (t > 1) { t -= 1; }
        if (t < 1 / 6) { return p1 + (q1 - p1) * 6 * t; }
        if (t < 1 / 2) { return q1; }
        if (t < 2 / 3) { return p1 + (q1 - p1) * (2 / 3 - t) * 6; }
        return p1;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  /**
   * RGB 颜色值转换为 HSL.
   * 转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
   * r, g, 和 b 需要在 [0, 255] 范围内
   * 返回的 h, s, 和 l 在 [0, 1] 之间
   *
   * @param   Number  r       红色色值
   * @param   Number  g       绿色色值
   * @param   Number  b       蓝色色值
   * @return  Array           HSL各值数组
   */
  rgbToHsl(r, g, b): any[] {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    let s;
    const l = (max + min) / 2;
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h, s, l];
  }


  /**
   *
   * @description 将颜色变淡的算法
   * @param color 十六进制
   * @param rate 百分比
   */
  lighten(color: string, rate: number): string {
    color = color.replace('#', '');
    const newColor = parseInt(color, 16);
    const newValue = newColor + newColor * rate;
    return `#${newValue.toString(16).split('.')[0]}`;
  }


  /**
   *
   * @description 将颜色变深的算法
   * @param color 十六进制
   * @param rate 百分比
   */
  darken(color: string, rate: number): string {
    color = color.replace('#', '');
    const newColor = parseInt(color, 16);
    const newValue = newColor - newColor * rate;
    return `#${newValue.toString(16).split('.')[0]}`;
  }


}
