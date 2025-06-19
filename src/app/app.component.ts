import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import {MatTooltipModule} from '@angular/material/tooltip'

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, MatIconModule,MatButtonModule,MatTooltipModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Foro';

  themeService = inject(ThemeService);
  
}
