import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MuiButtonComponent } from '@diz1/mui-kit';

@Component({
  imports: [ RouterModule, MuiButtonComponent ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'mui_storybook';
}
