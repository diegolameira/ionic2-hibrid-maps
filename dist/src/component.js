"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var HibridMapsComponent = (function () {
    function HibridMapsComponent(platform) {
        this.platform = platform;
    }
    Object.defineProperty(HibridMapsComponent.prototype, "isCordova", {
        get: function () {
            return this.platform.is('cordova');
        },
        enumerable: true,
        configurable: true
    });
    HibridMapsComponent.prototype.ngOnInit = function () { };
    HibridMapsComponent.prototype.ngOnDestroy = function () { };
    return HibridMapsComponent;
}());
HibridMapsComponent = __decorate([
    core_1.Component({
        selector: 'hibrid-maps',
        template: "\n    <div *ngIf=\"isCordova\"><map-native><ng-content></ng-content></map-native></div>\n    <div *ngIf=\"!isCordova\"><map-web></map-web><ng-content></ng-content></div>\n  ",
    }),
    __param(0, core_1.Inject(ionic_angular_1.Platform)),
    __metadata("design:paramtypes", [Object])
], HibridMapsComponent);
exports.HibridMapsComponent = HibridMapsComponent;
//# sourceMappingURL=component.js.map