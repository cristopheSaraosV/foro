import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal(false);

  toggleTheme() {
    this.isDark.update(d => !d);
    const classList = document.documentElement.classList;
    if (this.isDark()) {
      classList.add('dark-theme');
    } else {
      classList.remove('dark-theme');
    }
  }
}
