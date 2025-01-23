import { Component, Input } from '@angular/core';
import { Payroll } from '../../model/Payroll';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list'

@Component({
  selector: 'app-payroll',
  imports: [CommonModule, MatListModule],
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.css'
})
export class PayrollComponent {
  @Input({required:true}) payroll: Payroll | null = null;
}
