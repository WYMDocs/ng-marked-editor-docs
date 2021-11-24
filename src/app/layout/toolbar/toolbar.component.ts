import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalstorageService } from 'src/app/localstorage.service';
import { ColorToolService } from 'src/app/shared/color-tool.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less'],
  providers: [
    ColorToolService
  ]
})
export class ToolbarComponent implements OnInit {

  @Input()
  title = '';
  @ViewChild('colorTpl')
  colorRef: ElementRef;
  rootVar = '--main-theme-color';
  rootFontVar = '--main-font-color';
  rootbackVar = '--main-back-color';
  local = { name: 'EN', value: 'zh-cn' };
  locals = [{ name: '中文简体', value: 'en' }, { name: 'EN', value: 'zh-cn' }];
  constructor(
    private cdk: ChangeDetectorRef,
    private localStorageService: LocalstorageService,
    private translate: TranslateService,
    private colorToolService: ColorToolService
  ) {
  }

  ngOnInit(): void {
  }

  // 切换主题色
  colorChange(res): void {
    const value = (this.colorRef.nativeElement as HTMLInputElement).value;
    document.documentElement.style.setProperty(this.rootVar, value);
    this.cdk.detectChanges();
    this.localStorageService.setText(this.rootVar, value);
    const [color , fontColor] = this.generateThemeColors(value);
    document.documentElement.style.setProperty(this.rootFontVar, color);
    document.documentElement.style.setProperty(this.rootbackVar, fontColor);
    this.updateSvgColor(color);
  }

  // 修改所有的svg填充颜色
  updateSvgColor(value): void {
    const svgs: any = document.getElementsByTagName('svg');
    Array.from(svgs).forEach((svg) => {
      this.deepUpdate((svg as HTMLElement), value);
    });
  }

  // 深度修改svg颜色
  deepUpdate(svg: HTMLElement, value): void {
    const filled = svg.getAttribute('fill');
    const theme = svg.getAttribute('theme');
    if (filled) {
      svg.setAttribute('fill', value);
    }
    if (svg.children) {
      Array.from(svg.children).forEach((child: HTMLElement) => {
        this.deepUpdate(child, value);
      });
    }
  }

  switchLang(key): void {
    this.local = this.locals.filter(local => local.value !== key)[0];
    this.translate.use(this.local.value);
  }


  // 通过主题色生成其他颜色，背景和字体颜色
  generateThemeColors(themeColor: string): string[] {
    if (/^\#/.test(themeColor)) {
      const rbg = this.colorToolService.colorRgb(themeColor);
      const arr = rbg.match(/[0-9]{1,8}/g).map(e => parseInt(e, 10));
      const { isLight, rate } = this.colorToolService.isLight(arr);
      if (isLight) { // 背景变淡那么需要深色的字
        const darkenColor = this.colorToolService.darken(themeColor, rate);
        return ['#000000' , darkenColor];
      } else {
        const lightenColor = this.colorToolService.lighten(themeColor, rate);
        return ['#ffffff' , lightenColor];
      }
    } else {
      return [];
    }
  }
}
