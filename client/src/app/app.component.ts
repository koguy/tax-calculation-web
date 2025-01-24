import { Component } from '@angular/core';
import { CalculateTaxComponent } from './component/calculate-tax/calculate-tax.component';

@Component({
  selector: 'app-root',
  imports: [CalculateTaxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}

