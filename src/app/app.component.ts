import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalstorageService } from './localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'ng-docs';
  rootVar = '--main-theme-color';
  value;
  param = { value: 'world' };
  constructor(
    private ls: LocalstorageService,
    translate: TranslateService
  ) {
    const value = this.ls.getText(this.rootVar);
    document.documentElement.style.setProperty(this.rootVar, value);
    this.value = value;

    translate.setDefaultLang('zh-cn');
    translate.addLangs(['en', 'zh-cn']);
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

  ngOnInit(): void {
    this.updateSvgColor(this.value);
  }
}
