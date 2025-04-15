import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { CheckboxComponent } from "../../components/checkbox/checkbox.component";
import { InterestCardComponent } from "../../components/interest-card/interest-card.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InterestService } from '../../services/interest.service';
import { InterestRequest } from '../../types/interest-request.type';
import { InputComponent } from '../../components/input/input.component';

interface InterestForm{
  capital: FormControl,
  interestRate: FormControl,
  time: FormControl,
  typeTime: FormControl,
  type: FormControl
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonComponent, CheckboxComponent, InterestCardComponent, ReactiveFormsModule, InputComponent],
  providers:[
    InterestService
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  interestForm!: FormGroup<InterestForm>;

  constructor(
    private interestService: InterestService
  ){
    this.interestForm = new FormGroup({
      capital: new FormControl('', [Validators.required]),
      interestRate: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      typeTime: new FormControl(2, [Validators.required]),
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
      interestRate: Number(formValue.interestRate),
      time: Number(formValue.time),
      typeTime: Number(formValue.typeTime),
      type: Number(formValue.type)
    };
  
    this.interestService.calculator(request).subscribe({
      next: (response) => {
        console.log('Resposta do backend:', response);
      },
      error: (err) => {
        console.error('Erro ao calcular:', err);
      }
    });
  }

  teste(){
    const formValue = this.interestForm.value;
    console.log("Capital: " + formValue.capital);
    console.log("Porcentagem de juros: " + formValue.interestRate);
    console.log("Tempo: " + formValue.time);
    console.log("Tipo de tempo: " + formValue.typeTime);
    console.log("Tipo de juros: " + formValue.type);
  }
  
}
