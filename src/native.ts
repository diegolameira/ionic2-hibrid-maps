import { Inject, Component, AfterContentInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { GoogleMap, LatLng, CameraPosition, GoogleMapsEvent } from '@ionic-native/google-maps';

@Component({
  selector: 'map-native',
  template:  `<div id="map"><ng-content></ng-content></div>`,
  styles: [`
    ion-app._gmaps_cdv_ .nav-decor{
      background-color: transparent !important;
    }

    #map {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
    }
  `]
})
export class MapNativeComponent implements AfterContentInit {

  initialPosition: any;
  map: GoogleMap;

  default:Coord = {
    longitude: 0,
    latitude: 0,
    speed: 0
  };

  view:Coord = this.default;
  user:Coord = this.default;
  markers:Array<any>;

  constructor(@Inject(Platform) public platform: any) {
  }

  ngAfterContentInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  setUserCoordinates(coords:Coord):void {
    if ( coords && (!this.initialPosition || coords.speed >= 0.5) )
    {
      this.user = coords;
    }
  }

  setViewCoordinates(coords:Coord):void {
    // average human walk speed  = 0.5m/s
    if ( coords && (!this.initialPosition || coords.speed >= 0.5) )
    {
      this.view = coords;
      this.moveMap(coords.latitude, coords.longitude);
    }
  }

  moveMap(lat:number, lng:number):void {

    let ionic: LatLng = new LatLng(lat,lng);
    let position: CameraPosition = {
      target: ionic,
      zoom: 18,
      tilt: 30
    };
    this.map.moveCamera(position);

  }

  loadMap() {

    let params = this.initialPosition || this.default;
    let lat = params.latitude, lng = params.longitude;

    let location = new LatLng(lat,lng);
    let options = {
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
    }

    this.map = new GoogleMap('map', options);

    this.map.getMyLocation((location:any) => {
      this.moveMap(location.latLng.lat, location.latLng.lng);
      this.drawPosition(location.latLng);
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      let params = this.initialPosition || this.default;
      let lat = params.latitude, lng = params.longitude;
      this.moveMap(lat, lng);

    });
  }

  drawMarkers(markers:any[]):void
  {
    markers.map(marker => {
      this.drawMarker(marker)
    });
  }

  drawMarker(marker:any):void
  {
    let latLng = new LatLng(marker.latitude, marker.longitude);
    this.map.addMarker({
      position: latLng
    }).then((marker:any) => {
      this.map.on('categories_change').subscribe((categories:any) => {
        marker.setVisible(categories.indexOf(marker.type) ? true:false);
      });
    });
  }

  drawPosition(latLng:any):void
  {
    this.map.addMarker({
      position: new LatLng(latLng.lat, latLng.lng)
    }).then((marker:any) => {
      this.map.on('user_move').subscribe((latLng:any) => {
        marker.setPosition(new LatLng(latLng.lat, latLng.lng));
      });
    });
  }

}

interface Coord {
  latitude:number;
  longitude:number;
  speed:number;
}
