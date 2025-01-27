import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CalculateTaxComponent } from './calculate-tax.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PayrollService } from '../../service/payroll.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Payroll } from '../../model/Payroll';
import { delay, finalize, of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CalculateTaxComponent', () => {
  let component: CalculateTaxComponent;
  let fixture: ComponentFixture<CalculateTaxComponent>;
  let mockPayrollService: jasmine.SpyObj<PayrollService>;

  beforeEach(async () => {

    mockPayrollService = jasmine.createSpyObj('PayrollService', ['calculate']);

    await TestBed.configureTestingModule({
      imports: [
        CalculateTaxComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
        provideAnimations(),
        provideNoopAnimations(),
        {provide: PayrollService, useValue: mockPayrollService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculateTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form group with salaryInputField', () => {
    expect(component.taxCalculationFormGroup.contains('salaryInputField')).toBeTrue();
  });

  it('should mark salaryInputField as invalid if empty', () => {
    const control = component.taxCalculationFormGroup.get('salaryInputField');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
    expect(control?.hasError('required')).toBeTrue();
  });

  it('should mark salaryInputField as invalid if value is negative', () => {
    const control = component.taxCalculationFormGroup.get('salaryInputField');
    control?.setValue('-10');
    expect(control?.valid).toBeFalse();
    expect(control?.hasError('min')).toBeTrue();
  });

  it('should mark salaryInputField as valid if a non-negative value is entered', () => {
    const control = component.taxCalculationFormGroup.get('salaryInputField');
    control?.setValue('1000');
    expect(control?.valid).toBeTrue();
  });

  it('should not call PayrollService if the form is invalid', () => {
    component.taxCalculationFormGroup.controls.salaryInputField.setValue('');
    component.onFormSubmitCalculateTax();
    expect(mockPayrollService.calculate).not.toHaveBeenCalled();
  });

  it('should call PayrollService with correct value when form is valid', () => {
    mockPayrollService.calculate.and.returnValue(of({} as Payroll));

    component.taxCalculationFormGroup.controls.salaryInputField.setValue('40000');
    component.onFormSubmitCalculateTax();

    expect(mockPayrollService.calculate).toHaveBeenCalledOnceWith(40000);
  });

  it('should set isLoading to true when form is submitted', () => {

    expect(component.isLoading).toBeFalse();

    mockPayrollService.calculate.and.returnValue(of({} as Payroll));
    component.taxCalculationFormGroup.controls.salaryInputField.setValue('1000');

    component.onFormSubmitCalculateTax();

    expect(component.isLoading).toBeTrue();
  });

  it('should set isLoading to false after payroll calculation completes', () => {

    const mockPayroll: Payroll = {
      grossAnnualSalary: 40000,
      grossMonthlySalary: 3333.33,
      netAnnualSalary: 29000,
      netMonthlySalary: 2416.67,
      annualTaxPaid: 11000,
      monthlyTaxPaid: 916.67
    };

    let mockObservable = of(mockPayroll).pipe(delay(1000));

    mockPayrollService.calculate.and.returnValue(of(mockPayroll).pipe(delay(1000)));

    component.taxCalculationFormGroup.controls.salaryInputField.setValue('40000');
    component.onFormSubmitCalculateTax();
    expect(component.isLoading).toBeTrue();

    mockObservable.pipe(finalize(() => {
      expect(component.isLoading).toBeFalse();
    }))
  });

  it('should display a loading spinner when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should hide the loading spinner when isLoading is false', () => {
    component.isLoading = false;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(spinner).toBeFalsy();
  });

});
