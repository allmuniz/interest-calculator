import { Component } from '@angular/core';
import { InputComponent } from "../../components/input/input.component";
import { ButtonComponent } from "../../components/button/button.component";
import { CheckboxComponent } from "../../components/checkbox/checkbox.component";
import { InterestCardComponent } from "../../components/interest-card/interest-card.component";

@Component({
  selector: 'app-dashboard',
  imports: [InputComponent, ButtonComponent, CheckboxComponent, InterestCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
