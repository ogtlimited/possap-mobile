import { serverBaseUrl } from './../../config/endpoints';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  ABSOLUTE_URL_REGEX = /^(?:[a-z]+:)?\/\//;
  constructor() {}

  getUrlString(path, queryParams = {}) {
    const baseURL = path.includes('http') ? path : this.pathJoin([serverBaseUrl, path], '/');
    const url = this.pathJoin([baseURL, this.getQueryString(queryParams)], '?');
    const absoluteUrl = this.toAbsolutePath(url);
    return absoluteUrl;
  }

  toAbsolutePath(baseUrl) {
    return this.ABSOLUTE_URL_REGEX.test(baseUrl) ? baseUrl : this.pathJoin([window.location.origin, baseUrl], '/');
  }

  getQueryString(params = {}) {
    return Object.entries(params)
      .filter(([, value]) => this.isValueNotEmpty(value))
      .map(([key, value]) => [
        encodeURIComponent(key),
        encodeURIComponent(this.processQueryStringValue(value)),
      ])
      .map((entry) => entry.join("="))
      .join("&");
  }

  isValueNotEmpty(value: unknown): unknown {
    if (Array.isArray(value)) {
      return value.length !== 0;
    }
    return value != null;
  }

  processQueryStringValue(value: any): string | number | boolean {
    if (Array.isArray(value)) {
      return value.join(",");
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
  
}
