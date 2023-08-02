import { TranslateConfigService } from './../../../translate-config.service';
import { RequestService } from './../../request/request.service';
/* eslint-disable @typescript-eslint/naming-convention */
import {
  GoogleMapUrl,
  serverBaseUrl,
  serviceEndpoint,
} from './../../config/endpoints';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ApproveSuccessComponent } from 'src/app/pages/requests/request-details/components/approve-success/approve-success.component';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  ABSOLUTE_URL_REGEX = /^(?:[a-z]+:)?\/\//;
  showTabs$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor(
    private reqS: RequestService,
    private alertController: AlertController,
    private appT: TranslateConfigService,
    private modalController: ModalController
  ) {}

  getTranslateObject() {
    const lang = this.appT.getDefaultLanguage();
    return this.reqS.get('/assets/i18n/' + lang + '.json').toPromise();
  }

  async presentModal(message) {
    const modal = await this.modalController.create({
      component: ApproveSuccessComponent,
      cssClass: 'successModal',
      componentProps: {
        message,
      },
    });
    await modal.present();
  }

  nearestPlaces(searchText) {
    const key = environment.mapsKey;
    const url = GoogleMapUrl + searchText + '&inputtype=textquery&key=' + key;
    return this.reqS.get(url);
  }

  getUrlString(path, queryParams = {}) {
    const baseURL = path.includes('http')
      ? path
      : this.pathJoin([serverBaseUrl, path], '/');
    const url = this.pathJoin([baseURL, this.getQueryString(queryParams)], '?');
    const absoluteUrl = this.toAbsolutePath(url);
    return absoluteUrl;
  }

  toAbsolutePath(baseUrl) {
    return this.ABSOLUTE_URL_REGEX.test(baseUrl)
      ? baseUrl
      : this.pathJoin([window.location.origin, baseUrl], '/');
  }

  getQueryString(params = {}) {
    return Object.entries(params)
      .filter(([, value]) => this.isValueNotEmpty(value))
      .map(([key, value]) => [
        encodeURIComponent(key),
        encodeURIComponent(this.processQueryStringValue(value)),
      ])
      .map((entry) => entry.join('='))
      .join('&');
  }

  isValueNotEmpty(value: unknown): unknown {
    if (Array.isArray(value)) {
      return value.length !== 0;
    }
    return value != null;
  }

  processQueryStringValue(value: any): string | number | boolean {
    if (Array.isArray(value)) {
      return value.join(',');
    }
    return value;
  }

  pathJoin(parts, separator = '/') {
    return parts
      .map((part, index) => {
        if (index > 0) {
          return part.replace(new RegExp(`^\\${separator}`), '');
        }

        if (index !== parts.length - 1) {
          return part.replace(new RegExp(`\\${separator}$`), '');
        }

        return part;
      })
      .filter((part) => part != null && part !== '')
      .join(separator);
  }

  async simpleAlert(header, subHeader, message) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  getEndpoint(name) {
    if (name === 'POLICE EXTRACT') {
      return serviceEndpoint.approveExtract;
    } else if (name === 'POLICE CHARACTER CERTIFICATE') {
      return serviceEndpoint.approveExtract;
    }
  }

  computeCBSBody(
    method,
    url,
    headers,
    hashField = '',
    hashmessage = '',
    body = null
  ) {
    return {
      requestObject: {
        body,
        headers: {
          ...headers,
        },
        helpers: {
          method,
          url,
          hashField,
          hashmessage,
          clientSecret: environment.clientSecret,
        },
      },
    };
  }
  startEnd() {
    const today = new Date();
    const From = new Date(new Date().setDate(today.getDate() - 90)).toLocaleDateString(
      'en-GB'
      );
    const End = new Date().toLocaleDateString('en-GB');
    return {
      From,
      End,
    };
  }
}
