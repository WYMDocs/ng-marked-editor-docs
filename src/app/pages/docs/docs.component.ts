import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgMarkedPreviewComponent } from 'ng-marked-preview';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.less']
})
export class DocsComponent implements OnInit {

  ddd = 1212;
  docContext?;
  activeIndex = 0;
  previewRefElm: NgMarkedPreviewComponent;
  topList: any[] = [];
  @ViewChild('previewElm', { static: false })
  set previewRef(e: NgMarkedPreviewComponent) {
    this.previewRefElm = e;
    if (e) {
      setTimeout(() => {
        this.getHeaders();
      }, 1000);
    }
  }

  get previewRef(): NgMarkedPreviewComponent {
    return this.previewRefElm;
  }

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('assets/docs/docs.md?', { responseType: 'text' }).subscribe((e) => {
      this.docContext = e || '';
    });
  }

  getHeaders(): void {
    const elm = (this.previewRef as any).elm.nativeElement.children[0];
    const headings = elm.querySelectorAll('h1,h2,h3');
    const skipNoTocHeadings = (heading: HTMLHeadingElement) => !/(?:no-toc|notoc)/i.test(heading.className);
    const res = Array.prototype.filter.call(headings, skipNoTocHeadings);
    this.topList = res || [];
  }

  scrollto($event: Event , id: string , index): void {
    $event.stopPropagation();
    $event.preventDefault();
    const elm = (this.previewRef as any).elm.nativeElement.children[0];
    const selected = elm.querySelector(`#${id}`);
    selected.scrollIntoView();
    this.activeIndex = index;
  }
}
