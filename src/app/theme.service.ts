import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {IonicStorageModule} from '@ionic/Storage';

const THEME_KEY = 'selected-app-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkMode = false;

  constructor(private plt: Platform, private storage: Storage) {
    this.plt.ready().then(() => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      prefersDark.addEventListener('change', e => {
        console.log(e.matches);
        this.setAppTheme(e.matches);
        console.log('nesto');
      });
    });
  }

  toggleAppTheme() {
    console.log('togle');
    this.darkMode = !this.darkMode;
    this.setAppTheme(this.darkMode);
  }

  private setAppTheme(dark) {
    this.darkMode = dark;

    if (this.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    this.storage.set(THEME_KEY, this.darkMode);
  }
}
