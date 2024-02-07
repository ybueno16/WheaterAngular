import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from './weather.model';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css'],
})
//TODO Lazy Load no formulario de cidade
export class WeatherPageComponent implements OnInit {
  cityName = 'Limeira';
  weatherData?: WeatherData;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(this.cityName);
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
