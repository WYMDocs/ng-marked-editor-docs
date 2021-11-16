import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgMarkedPreviewComponent } from 'ng-marked-preview';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.less']
})
export class DocsComponent implements OnInit {

  docContext?;
  previewRefElm: NgMarkedPreviewComponent;
  @ViewChild('previewElm', { static: false })
  set previewRef(e: NgMarkedPreviewComponent) {
    this.previewRefElm = e;
    if (e) {
      this.getHeaders();
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
    console.log(this.previewRef);
  }
}
