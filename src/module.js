var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, LAZY_MAPS_API_CONFIG, MapsAPILoader, LazyMapsAPILoader } from 'angular2-google-maps/core';
import { BROWSER_GLOBALS_PROVIDERS } from 'angular2-google-maps/core/utils/browser-globals';
import { HibridMapsComponent } from './component';
import { MapNativeComponent } from './native';
import { MapWebComponent } from './web';
export function components() {
    return [
        HibridMapsComponent,
        MapNativeComponent,
        MapWebComponent,
    ];
}
var HibridMapModule = HibridMapModule_1 = (function () {
    function HibridMapModule() {
    }
    HibridMapModule.forRoot = function (config) {
        return {
            ngModule: HibridMapModule_1,
            providers: [BROWSER_GLOBALS_PROVIDERS, { provide: MapsAPILoader, useClass: LazyMapsAPILoader },
                { provide: LAZY_MAPS_API_CONFIG, useValue: config }],
        };
    };
    return HibridMapModule;
}());
HibridMapModule = HibridMapModule_1 = __decorate([
    NgModule({
        imports: [
            BrowserModule,
            AgmCoreModule
        ],
        declarations: components(),
        exports: components(),
    })
], HibridMapModule);
export { HibridMapModule };
var HibridMapModule_1;
//# sourceMappingURL=module.js.map