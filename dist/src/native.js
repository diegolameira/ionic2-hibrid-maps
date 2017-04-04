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
var google_maps_1 = require("@ionic-native/google-maps");
var MapNativeComponent = (function () {
    function MapNativeComponent(platform) {
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
    MapNativeComponent.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MapPage');
    };
    MapNativeComponent.prototype.setUserCoordinates = function (coords) {
        if (coords && (!this.initialPosition || coords.speed >= 0.5)) {
            this.user = coords;
        }
    };
    MapNativeComponent.prototype.setViewCoordinates = function (coords) {
        // average human walk speed  = 0.5m/s
        if (coords && (!this.initialPosition || coords.speed >= 0.5)) {
            this.view = coords;
            this.moveMap(coords.latitude, coords.longitude);
        }
    };
    MapNativeComponent.prototype.moveMap = function (lat, lng) {
        var ionic = new google_maps_1.LatLng(lat, lng);
        var position = {
            target: ionic,
            zoom: 18,
            tilt: 30
        };
        this.map.moveCamera(position);
    };
    MapNativeComponent.prototype.loadMap = function () {
        var _this = this;
        var params = this.initialPosition || this.default;
        var lat = params.latitude, lng = params.longitude;
        var location = new google_maps_1.LatLng(lat, lng);
        var options = {
            backgroundColor: 'white',
            controls: {
                compass: false,
                myLocationButton: false,
                indoorPicker: false,
                zoom: false
            },
            gestures: {
                scroll: true,
                tilt: false,
                rotate: false,
                zoom: true
            },
            camera: {
                latLng: location,
                tilt: 0,
                zoom: 15,
                bearing: 0
            }
        };
        this.map = new google_maps_1.GoogleMap('map', options);
        this.map.getMyLocation(function (location) {
            _this.moveMap(location.latLng.lat, location.latLng.lng);
            _this.drawPosition(location.latLng);
        });
        this.map.on(google_maps_1.GoogleMapsEvent.MAP_READY).subscribe(function () {
            var params = _this.initialPosition || _this.default;
            var lat = params.latitude, lng = params.longitude;
            _this.moveMap(lat, lng);
        });
    };
    MapNativeComponent.prototype.drawMarkers = function (markers) {
        var _this = this;
        markers.map(function (marker) {
            _this.drawMarker(marker);
        });
    };
    MapNativeComponent.prototype.drawMarker = function (marker) {
        var _this = this;
        var latLng = new google_maps_1.LatLng(marker.latitude, marker.longitude);
        this.map.addMarker({
            position: latLng
        }).then(function (marker) {
            _this.map.on('categories_change').subscribe(function (categories) {
                marker.setVisible(categories.indexOf(marker.type) ? true : false);
            });
        });
    };
    MapNativeComponent.prototype.drawPosition = function (latLng) {
        var _this = this;
        this.map.addMarker({
            position: new google_maps_1.LatLng(latLng.lat, latLng.lng)
        }).then(function (marker) {
            _this.map.on('user_move').subscribe(function (latLng) {
                marker.setPosition(new google_maps_1.LatLng(latLng.lat, latLng.lng));
            });
        });
    };
    return MapNativeComponent;
}());
MapNativeComponent = __decorate([
    core_1.Component({
        selector: 'map-native',
        template: "<div id=\"map\"></div>",
        styles: ["\n    ion-app._gmaps_cdv_ .nav-decor{\n      background-color: transparent !important;\n    }\n\n    #map {\n      display: block;\n      width: 100%;\n      height: 100%;\n      position: absolute;\n    }\n  "]
    }),
    __param(0, core_1.Inject(ionic_angular_1.Platform)),
    __metadata("design:paramtypes", [Object])
], MapNativeComponent);
exports.MapNativeComponent = MapNativeComponent;
//# sourceMappingURL=native.js.map