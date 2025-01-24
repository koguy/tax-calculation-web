import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculateTaxComponent } from './calculate-tax.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('CalculateTaxComponent', () => {
  let component: CalculateTaxComponent;
  let fixture: ComponentFixture<CalculateTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculateTaxComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
        provideAnimations(),
        provideNoopAnimations()
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
});
