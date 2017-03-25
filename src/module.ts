import { ModuleWithProviders, NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, LazyMapsAPILoaderConfigLiteral, LAZY_MAPS_API_CONFIG, MapsAPILoader, LazyMapsAPILoader } from 'angular2-google-maps/core';
import { BROWSER_GLOBALS_PROVIDERS } from 'angular2-google-maps/core/utils/browser-globals';

import { HibridMapsComponent }  from './component';
import { MapNativeComponent } from './native';
import { MapWebComponent } from './web';

export function components() {
  return [
    HibridMapsComponent,
    MapNativeComponent,
    MapWebComponent,
  ];
}

@NgModule({
  imports: [
    BrowserModule,
    AgmCoreModule
  ],
  declarations: components(),
  exports: components(),
})
export class HibridMapModule {
  static forRoot(config?: LazyMapsAPILoaderConfigLiteral): ModuleWithProviders {
    return {
      ngModule: HibridMapModule,
      providers: [BROWSER_GLOBALS_PROVIDERS, {provide: MapsAPILoader, useClass: LazyMapsAPILoader},
        {provide: LAZY_MAPS_API_CONFIG, useValue: config}],
    }
  }
 }

