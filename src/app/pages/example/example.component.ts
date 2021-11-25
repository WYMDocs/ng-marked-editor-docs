import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgMarkedEditorOption } from 'ng-marked-editor/lib/types/editor';
import { NgMarkedPreviewComponent } from 'ng-marked-preview';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.less', './../docs/docs.component.less']
})
export class ExampleComponent implements OnInit {

  option: NgMarkedEditorOption = {
    saveOption: {
      autoSave: true
    },
  };

  topList: any[] = [];
  activeIndex = 0;
  docContext = '';
  previewRefElm;
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
    this.http.get('./assets/docs/example.md?', { responseType: 'text' }).subscribe((e) => {
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

  scrollto($event: Event, id: string, index): void {
    $event.stopPropagation();
    $event.preventDefault();
    const elm = (this.previewRef as any).elm.nativeElement.children[0];
    const selected = elm.querySelector(`#${id}`);
    selected.scrollIntoView();
    this.activeIndex = index;
  }
}
