import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { CheckboxComponent } from "../../components/checkbox/checkbox.component";
import { InterestCardComponent } from "../../components/interest-card/interest-card.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InterestService } from '../../services/interest.service';
import { InterestRequest } from '../../types/interest-request.type';
import { InputComponent } from '../../components/input/input.component';
import { CommonModule } from '@angular/common';

interface InterestForm{
  capital: FormControl,
  monthlyValue: FormControl,
  interestRate: FormControl,
  time: FormControl,
  type: FormControl
}

interface interestResponseString {
  finalAmount: string,
  interestAmount: string,
  valueInvested: string,
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonComponent, CheckboxComponent, InterestCardComponent, ReactiveFormsModule, InputComponent, CommonModule],
  providers:[
    InterestService
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  interestForm!: FormGroup<InterestForm>;
  interest: interestResponseString | null = null;

  constructor(
    private interestService: InterestService
  ){
    this.interestForm = new FormGroup({
      capital: new FormControl('', [Validators.required]),
      monthlyValue: new FormControl(''),
      interestRate: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required])
    })
  }

  submit() {
    if (this.interestForm.invalid) {
      this.interestForm.markAllAsTouched();
      return;
    }
  
    const formValue = this.interestForm.value;
  
    const request: InterestRequest = {
      capital: Number(formValue.capital),
      monthlyValue: Number(formValue.monthlyValue),
      interestRate: Number(formValue.interestRate),
      time: Number(formValue.time),
      type: Number(formValue.type)
    };
  
    this.interestService.calculator(request).subscribe({
      next: (response) => {
        this.interest = {
          finalAmount: response.finalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          interestAmount: response.interestAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          valueInvested: response.valueInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        };
      },
      error: (err) => {
        console.error('Erro ao calcular:', err);
      }
    });
  }

  clear() {
    this.interestForm.reset();
    this.interest = null;
  }
}
