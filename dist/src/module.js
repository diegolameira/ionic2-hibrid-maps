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
var core_2 = require("angular2-google-maps/core");
var browser_globals_1 = require("angular2-google-maps/core/utils/browser-globals");
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
var HibridMapModule = HibridMapModule_1 = (function () {
    function HibridMapModule() {
    }
    HibridMapModule.forRoot = function (config) {
        return {
            ngModule: HibridMapModule_1,
            providers: [browser_globals_1.BROWSER_GLOBALS_PROVIDERS, { provide: core_2.MapsAPILoader, useClass: core_2.LazyMapsAPILoader },
                { provide: core_2.LAZY_MAPS_API_CONFIG, useValue: config }],
        };
    };
    return HibridMapModule;
}());
HibridMapModule = HibridMapModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            core_2.AgmCoreModule
        ],
        declarations: components(),
        exports: components(),
    })
], HibridMapModule);
exports.HibridMapModule = HibridMapModule;
var HibridMapModule_1;
//# sourceMappingURL=module.js.map