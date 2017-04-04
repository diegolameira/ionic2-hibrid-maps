import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
 import { Platform } from 'ionic-angular';

@Component({
  selector: 'hibrid-maps',
  template: `
    <div *ngIf="isCordova"><map-native></map-native></div>
    <div *ngIf="!isCordova"><map-web></map-web></div>
  `,
})
export class HibridMapsComponent implements OnInit, OnDestroy  {

  constructor(@Inject(Platform) public platform:any){}

  get isCordova():boolean {
    return this.platform.is('cordova');
  }

  ngOnInit(){}
  ngOnDestroy(){}

}
