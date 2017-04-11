"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var geolocation_1 = require("@ionic-native/geolocation");
var core_2 = require("angular2-google-maps/core");
var browser_globals_1 = require("angular2-google-maps/core/utils/browser-globals");
var animations_1 = require("@angular/platform-browser/animations");
var component_1 = require("./component");
var native_1 = require("./native");
var web_1 = require("./web");
function components() {
    return [
        component_1.HibridMapsComponent,
        native_1.MapNativeComponent,
        web_1.MapWebComponent,
    ];
}
exports.components = components;
var HibridMapsModule = HibridMapsModule_1 = (function () {
    function HibridMapsModule() {
    }
    HibridMapsModule.forRoot = function (config) {
        return {
            ngModule: HibridMapsModule_1,
            providers: [
                browser_globals_1.BROWSER_GLOBALS_PROVIDERS,
                { provide: core_2.MapsAPILoader, useClass: core_2.LazyMapsAPILoader },
                { provide: core_2.LAZY_MAPS_API_CONFIG, useValue: config }
            ],
        };
    };
    return HibridMapsModule;
}());
HibridMapsModule = HibridMapsModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            animations_1.BrowserAnimationsModule, animations_1.NoopAnimationsModule,
            platform_browser_1.BrowserModule,
            core_2.AgmCoreModule.forRoot()
        ],
        declarations: components(),
        exports: components(),
        providers: [
            geolocation_1.Geolocation
        ]
    })
], HibridMapsModule);
exports.HibridMapsModule = HibridMapsModule;
var HibridMapsModule_1;
//# sourceMappingURL=module.js.map