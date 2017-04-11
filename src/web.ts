import { Inject, Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { MapsAPILoader } from 'angular2-google-maps/core';

declare var google:any;

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
  initialPosition:any;
  map:any;
  apiLoaded:boolean = false;

  default:Coord = {
    longitude: 0,
    latitude: 0,
    speed: 0
  };

  view:Coord = this.default;
  user:Coord = this.default;
  markers:Array<any>;

  constructor(
    @Inject(Platform) public platform:any,
    public geolocation: Geolocation,
    private loader: MapsAPILoader
  ) {

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
    this.loader.load().then(()=>{
      this.apiLoaded = true;
    });
    this.geolocation.getCurrentPosition().then((position:any) => {
      this.setUserCoordinates(position.coords);
      this.setViewCoordinates(position.coords);
      this.initialPosition = this.initialPosition || position.coords;
    });
    this.watch = this.geolocation.watchPosition().subscribe((position:any) => {
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
    // let latLng = new LatLng(marker.latitude, marker.longitude);
    this.map.addMarker({
      // position: latLng
    }).then((marker:any) => {
      this.map.on('categories_change').subscribe((categories:any) => {
        marker.setVisible(categories.indexOf(marker.type) ? true:false);
      });
    });
  }

  drawPosition(latLng:any):void
  {
    this.map.addMarker({
      // position: new LatLng(latLng.lat, latLng.lng)
    }).then((marker:any) => {
      this.map.on('user_move').subscribe((latLng:any) => {
        // marker.setPosition(new LatLng(latLng.lat, latLng.lng));
      });
    });
  }

}

interface Coord {
  latitude:number;
  longitude:number;
  speed:number;
}
