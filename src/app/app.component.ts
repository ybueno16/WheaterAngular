import { Component, OnInit } from '@angular/core';
import { WeatherService, WeatherData } from './services/weather.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}
  weatherData?: WeatherData;
  ngOnInit(): void {
    this.weatherService.getWeatherData('Americana').subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
