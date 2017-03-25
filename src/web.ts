import { Inject, Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import {
  GoogleMap, GoogleMapsLatLng, Geolocation
} from 'ionic-native';

declare var google;

@Component({
  selector: 'map-web',
  template:  `
    <sebm-google-map
      [latitude]="view.latitude"
      [longitude]="view.longitude">

      <sebm-google-map-marker
        [latitude]="user.latitude"
        [longitude]="user.longitude">
        </sebm-google-map-marker>

      <div *ngFor="let marker of markers">

        <sebm-google-map-marker
          [latitude]="marker.latitude"
          [longitude]="marker.longitude">
          </sebm-google-map-marker>

      </div>

    </sebm-google-map>
  `,
  styles: [`
  sebm-google-map {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  `]
})
export class MapWebComponent {

  watch:any;
  initialPosition;
  map: GoogleMap;

  default:Coord = {
    longitude: 0,
    latitude: 0,
    speed: 0
  };

  view:Coord = this.default;
  user:Coord = this.default;
  markers:Array<any>;

  constructor(@Inject(Platform) public platform) {

    platform.ready().then(() => {
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

  }

  loadMap() {
    Geolocation.getCurrentPosition().then((position) => {
      this.setUserCoordinates(position.coords);
      this.setViewCoordinates(position.coords);
      this.initialPosition = this.initialPosition || position.coords;
    });
    this.watch = Geolocation.watchPosition().subscribe(position => {
      this.setUserCoordinates(position.coords);
      this.setViewCoordinates(position.coords);
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
    let latLng = new GoogleMapsLatLng(marker.latitude, marker.longitude);
    this.map.addMarker({
      position: latLng
    }).then(marker => {
      this.map.on('categories_change').subscribe(categories => {
        marker.setVisible(categories.indexOf(marker.type) ? true:false);
      });
    });
  }

  drawPosition(latLng:any):void
  {
    this.map.addMarker({
      position: new GoogleMapsLatLng(latLng.lat, latLng.lng)
    }).then(marker => {
      this.map.on('user_move').subscribe(latLng => {
        marker.setPosition(new GoogleMapsLatLng(latLng.lat, latLng.lng));
      });
    });
  }

}

interface Coord {
  latitude:number;
  longitude:number;
  speed:number;
}
