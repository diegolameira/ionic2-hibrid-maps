import { ModuleWithProviders, NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule, LazyMapsAPILoaderConfigLiteral, LAZY_MAPS_API_CONFIG, MapsAPILoader, LazyMapsAPILoader } from 'angular2-google-maps/core';
import { BROWSER_GLOBALS_PROVIDERS } from 'angular2-google-maps/core/utils/browser-globals';
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";

import { HibridMapsComponent }  from './component';
import { MapNativeComponent } from './native';
import { MapWebComponent } from './web';

export { LazyMapsAPILoaderConfigLiteral as HibridMapsModuleConfig } from 'angular2-google-maps/core';

export function components() {
  return [
    HibridMapsComponent,
    MapNativeComponent,
    MapWebComponent,
  ];
}

@NgModule({
  imports: [
    BrowserAnimationsModule, NoopAnimationsModule,
    BrowserModule,
    AgmCoreModule.forRoot()
  ],
  declarations: components(),
  exports: components(),
  providers: [
    Geolocation
  ]
})
export class HibridMapsModule {
  static forRoot(config?: LazyMapsAPILoaderConfigLiteral): ModuleWithProviders {
    return {
      ngModule: HibridMapsModule,
      providers: [
        BROWSER_GLOBALS_PROVIDERS,
        {provide: MapsAPILoader, useClass: LazyMapsAPILoader},
        {provide: LAZY_MAPS_API_CONFIG, useValue: config}
        ],
    }
  }
 }

