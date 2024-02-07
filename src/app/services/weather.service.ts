import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmnet } from '../../environmnet/environmnet';
import { WeatherData } from '../weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getWeatherData(cityName: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      environmnet.weatherApiBaseUrl + '/city/' + cityName,
      {
        headers: new HttpHeaders()
          .set(
            environmnet.XRapidApiHostHeaderName,
            environmnet.XRapidApiHostHeaderValue
          )
          .set(
            environmnet.XRapidApiKeyHeaderName,
            environmnet.XRapidAPIKeyHeaderValue
          ),
      }
    );
  }
}
