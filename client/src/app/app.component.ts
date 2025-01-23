import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculateTaxComponent } from './component/calculate-tax/calculate-tax.component';

@Component({
  selector: 'app-root',
  imports: [CalculateTaxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'client';

  ngOnInit(): void {
    //this.http.post('http://localhost:')
  }
}

