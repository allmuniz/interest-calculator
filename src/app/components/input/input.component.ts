import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl  } from '@angular/forms';
type InputTypes = "text" | "number"
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements ControlValueAccessor{

  @Input() label: string = '';
  @Input() type: InputTypes = 'number';
  @Input() placeholder: string = '';
  @Input() span: string = '';

  value: string = '';
  onChange:any = () => {}
  onTouched:any = () => {}

  constructor(
    @Self() @Optional() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: any): void {
      this.value = value
  }

  registerOnChange(fn: any): void {
      this.onChange = fn
  }

  registerOnTouched(fn: any): void {
     this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {}

}
