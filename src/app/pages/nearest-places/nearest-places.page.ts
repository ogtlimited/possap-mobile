import { ModalController, AlertController } from "@ionic/angular";
import { environment } from "./../../../environments/environment.prod";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { GoogleMap } from "@capacitor/google-maps";
import { Geolocation } from "@capacitor/geolocation";
import {Location} from '@angular/common'

@Component({
  selector: 'app-nearest-places',
  templateUrl: './nearest-places.page.html',
  styleUrls: ['./nearest-places.page.scss'],
})
export class NearestPlacesPage implements OnInit {

  @ViewChild("map") mapRef: ElementRef;
  map: GoogleMap;
  location = 'MY MAP'
  constructor(private alert: AlertController, private loc: Location) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    // const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
    this.map = await GoogleMap.create({
      id: "sos-map",
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      forceCreate: true,
      config: {
        center: {
          lat: 33.6,
          lng: 9.7,
        },
        zoom: 8,
      },
    });

    // CapacitorGoogleMaps.addListener('onMapReady', async () => {
    //   CapacitorGoogleMaps.setMapType({
    //     type: "normal" // hybrid, satellite, terrain
    //   });

    //   this.showCurrentPosition();
    // });
  }

  mapLocation(val){
    this.location = val
  }
  back(){
    this.loc.back()
  }


}
