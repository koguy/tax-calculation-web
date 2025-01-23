import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PayrollService } from '../../service/payroll.service';
import { Observable } from 'rxjs';
import { Payroll } from '../../model/Payroll';
import { CommonModule } from '@angular/common';
import { PayrollComponent } from "../payroll/payroll.component";
import { MatProgressSpinner } from '@angular/material/progress-spinner';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-calculate-tax',
  imports: [MatFormField, MatLabel, MatButton, MatInputModule, ReactiveFormsModule, CommonModule, PayrollComponent, MatProgressSpinner],
  templateUrl: './calculate-tax.component.html',
  styleUrl: './calculate-tax.component.css'
})
export class CalculateTaxComponent {
  payrollCalculation$?: Observable<Payroll>;
  taxCalculationFormGroup = new FormGroup({
    salaryInputField: new FormControl('', [Validators.required, Validators.min(0)])
  });
  isLoading = false;

  constructor(private service:PayrollService)
  {
  }

  onFormSubmitCalculateTax() {
    if (this.taxCalculationFormGroup.valid) 
    {
      this.isLoading = true;
      const salary = this.taxCalculationFormGroup.controls.salaryInputField.value as unknown as number;
  
      setTimeout(() => {
        this.payrollCalculation$ = this.service.calculate(salary);
        this.isLoading = false;
      }, 3000);
    }
  }
}
