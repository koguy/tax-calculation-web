import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payroll } from '../model/Payroll';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  apiUrl='http://localhost:5080/api/payrolls/calculate'

  constructor(private http:HttpClient) { }

  calculate(salary: number) : Observable<Payroll> {
    return this.http.post<Payroll>(this.apiUrl, salary);
  }
}
