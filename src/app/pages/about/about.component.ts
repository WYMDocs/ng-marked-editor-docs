import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit {

  docContext?;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('assets/docs/about.md?' ,  { responseType: 'text' }).subscribe( (e) => {
      this.docContext = e || '';
    });
  }

}
