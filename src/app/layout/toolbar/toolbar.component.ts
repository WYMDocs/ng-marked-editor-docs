import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalstorageService } from 'src/app/localstorage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent implements OnInit {

  @Input()
  title = '';
  @ViewChild('colorTpl')
  colorRef: ElementRef;
  rootVar = '--main-theme-color';
  local = { name: 'EN', value: 'zh-cn' };
  locals = [{ name: '中文简体', value: 'en' }, { name: 'EN', value: 'zh-cn' }];
  constructor(
    private cdk: ChangeDetectorRef,
    private localStorageService: LocalstorageService,
    private translate: TranslateService
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
    this.updateSvgColor(value);
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
    if (filled && theme) {
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
}
