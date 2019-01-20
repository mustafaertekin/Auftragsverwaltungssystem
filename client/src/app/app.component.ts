import { Component, OnInit } from '@angular/core';
import { AppSettingsService } from '@avs-ecosystem/services/app-settings.service';

@Component({
  selector: 'avs-main',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  theme: string;

  constructor(private settingsService: AppSettingsService) {
    this.settingsService.listenThemaChanges().subscribe(theme => {
      this.theme = theme;
    });
  }

  ngOnInit() { }
}



