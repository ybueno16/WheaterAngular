import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from './weather.model';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css'],
})
//TODO Lazy Load no formulario de cidade
export class WeatherPageComponent implements OnInit, OnDestroy {
  cityName = 'Limeira';
  weatherData?: WeatherData;

  constructor(private weatherService: WeatherService) {}
  public searchControl = new FormControl();
  private searchSubscription!: Subscription;

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.searchSubscription = this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        console.log('search value', value);
      });
  }

  fahrenheitToCelsius(fahrenheit: number) {
    return ((fahrenheit - 32) * 5) / 9;
  }

  onSubmit() {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  private getWeatherData(cityName: string) {
    this.weatherService.getWeatherData(cityName).subscribe({
      next: (response) => {
        const celsiusTemp = this.fahrenheitToCelsius(response.main.temp);
        const celsiusTempMin = this.fahrenheitToCelsius(response.main.temp_min);
        const celsiusTempMax = this.fahrenheitToCelsius(response.main.temp_max);

        this.weatherData = {
          ...response,
          main: {
            ...response.main,
            temp: celsiusTemp,
            temp_min: celsiusTempMin,
            temp_max: celsiusTempMax,
          },
        };
      },
    });
  }
}
