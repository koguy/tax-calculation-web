import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PayrollService } from '../../service/payroll.service';
import { Observable } from 'rxjs';
import { Payroll } from '../../model/Payroll';
import { CommonModule } from '@angular/common';
import { PayrollComponent } from "../payroll/payroll.component";

@Component({
  selector: 'app-calculate-tax',
  imports: [MatFormField, MatLabel, MatButton, MatInputModule, ReactiveFormsModule, CommonModule, PayrollComponent],
  templateUrl: './calculate-tax.component.html',
  styleUrl: './calculate-tax.component.css'
})
export class CalculateTaxComponent {
  payrollCalculation$?: Observable<Payroll>;
  taxCalculationFormGroup = new FormGroup({
    salaryInputField: new FormControl('', [Validators.required])
  });

  constructor(private service:PayrollService)
  {
  }

  onFormSubmitCalculateTax() {
    if (this.taxCalculationFormGroup.valid) 
    {
      const salary = this.taxCalculationFormGroup.controls.salaryInputField.value as unknown as number;
      this.payrollCalculation$ = this.service.calculate(salary);
    }
  }
}
