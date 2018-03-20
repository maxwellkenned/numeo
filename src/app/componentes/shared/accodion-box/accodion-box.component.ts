import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';

@Component({
  selector: 'nm-accodion-box',
  templateUrl: './accodion-box.component.html'
})
export class AccodionBoxComponent implements OnInit, AfterContentInit {

  box: any;
  @Input() label: string;
  @Input() idBox: string;
  @Input() expanded: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(){

  }

}
