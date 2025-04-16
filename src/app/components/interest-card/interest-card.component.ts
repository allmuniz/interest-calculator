import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-interest-card',
  imports: [],
  templateUrl: './interest-card.component.html',
  styleUrl: './interest-card.component.css'
})
export class InterestCardComponent {

  @Input() finalAmount: string = '';
  @Input() interestAmount: string = '';
  @Input() valueInvested: string = '';

}
