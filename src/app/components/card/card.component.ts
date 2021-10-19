import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
})
export class CardComponent implements OnInit {

  @Input()
  wSize: 'small' | 'large' | 'default' = 'default';
  constructor() { }

  ngOnInit(): void {
  }

}
