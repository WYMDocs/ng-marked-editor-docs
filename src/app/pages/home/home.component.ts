import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgMarkedEditorOption } from 'ng-marked-editor/lib/types/editor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  option: NgMarkedEditorOption = {
    saveOption: {
      autoSave: true
    },
  };

  docContext = '';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('assets/docs/home.md?' ,  { responseType: 'text' }).subscribe( (e) => {
      this.docContext = e || '';
    });
  }

}
