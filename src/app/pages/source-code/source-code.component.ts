import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-source-code',
  templateUrl: './source-code.component.html',
  styleUrls: ['./source-code.component.less']
})
export class SourceCodeComponent implements OnInit {

  docContext = '';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('assets/docs/sourceCode.md?', { responseType: 'text' }).subscribe((e) => {
      this.docContext = e || '';
    });
  }
}
