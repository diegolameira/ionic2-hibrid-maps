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
var ionic_native_1 = require("ionic-native");
var MapWebComponent = (function () {
    function MapWebComponent(platform) {
        var _this = this;
        this.platform = platform;
        this.default = {
            longitude: 0,
            latitude: 0,
            speed: 0
        };
        this.view = this.default;
        this.user = this.default;
        platform.ready().then(function () {
            _this.loadMap();
        });
    }
    MapWebComponent.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MapPage');
    };
    MapWebComponent.prototype.setUserCoordinates = function (coords) {
        if (coords && (!this.initialPosition || coords.speed >= 0.5)) {
            this.user = coords;
        }
    };
    MapWebComponent.prototype.setViewCoordinates = function (coords) {
        // average human walk speed  = 0.5m/s
        if (coords && (!this.initialPosition || coords.speed >= 0.5)) {
            this.view = coords;
            this.moveMap(coords.latitude, coords.longitude);
        }
    };
    MapWebComponent.prototype.moveMap = function (lat, lng) {
    };
    MapWebComponent.prototype.loadMap = function () {
        var _this = this;
        ionic_native_1.Geolocation.getCurrentPosition().then(function (position) {
            _this.setUserCoordinates(position.coords);
            _this.setViewCoordinates(position.coords);
            _this.initialPosition = _this.initialPosition || position.coords;
        });
        this.watch = ionic_native_1.Geolocation.watchPosition().subscribe(function (position) {
            _this.setUserCoordinates(position.coords);
            _this.setViewCoordinates(position.coords);
        });
    };
    MapWebComponent.prototype.drawMarkers = function (markers) {
        var _this = this;
        markers.map(function (marker) {
            _this.drawMarker(marker);
        });
    };
    MapWebComponent.prototype.drawMarker = function (marker) {
        var _this = this;
        var latLng = new ionic_native_1.GoogleMapsLatLng(marker.latitude, marker.longitude);
        this.map.addMarker({
            position: latLng
        }).then(function (marker) {
            _this.map.on('categories_change').subscribe(function (categories) {
                marker.setVisible(categories.indexOf(marker.type) ? true : false);
            });
        });
    };
    MapWebComponent.prototype.drawPosition = function (latLng) {
        var _this = this;
        this.map.addMarker({
            position: new ionic_native_1.GoogleMapsLatLng(latLng.lat, latLng.lng)
        }).then(function (marker) {
            _this.map.on('user_move').subscribe(function (latLng) {
                marker.setPosition(new ionic_native_1.GoogleMapsLatLng(latLng.lat, latLng.lng));
            });
        });
    };
    return MapWebComponent;
}());
MapWebComponent = __decorate([
    core_1.Component({
        selector: 'map-web',
        template: "\n    <sebm-google-map\n      [latitude]=\"view.latitude\"\n      [longitude]=\"view.longitude\">\n\n      <sebm-google-map-marker\n        [latitude]=\"user.latitude\"\n        [longitude]=\"user.longitude\">\n        </sebm-google-map-marker>\n\n      <div *ngFor=\"let marker of markers\">\n\n        <sebm-google-map-marker\n          [latitude]=\"marker.latitude\"\n          [longitude]=\"marker.longitude\">\n          </sebm-google-map-marker>\n\n      </div>\n\n    </sebm-google-map>\n  ",
        styles: ["\n  sebm-google-map {\n    display: block;\n    width: 100%;\n    height: 100%;\n    position: absolute;\n  }\n  "]
    }),
    __param(0, core_1.Inject(ionic_angular_1.Platform)),
    __metadata("design:paramtypes", [Object])
], MapWebComponent);
exports.MapWebComponent = MapWebComponent;
//# sourceMappingURL=web.js.map