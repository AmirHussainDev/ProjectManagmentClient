import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-modal-control',
  templateUrl: './select-modal-control.component.html',
  styleUrls: ['./select-modal-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectModalControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectModalControlComponent),
      multi: true,
    },
  ],
})
export class SelectModalControlComponent implements ControlValueAccessor, Validator {
  @Input() data: any[] = [];
  @Input() displayColumns: any[] = [];
  @Input() header: string = 'Select Item';
  @Input() modelValue: string = 'all';
  @Input() addCustom: boolean = false;
  value: any;
  isDisabled: boolean;
  showModal: boolean = false;
  searchValue: string = '';
  customValue: string = '';
  ngModelChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.ngModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  stopEvent(event: any) {
    event.target.stopPropagation();
  }

  validate(control: FormControl) {
    if (control.hasValidator(Validators.required) && !control.value) {
      return { required: true };
    }
    return null;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  selectItem(item: any) {
    this.value = this.modelValue === 'all' ? item : item[this.modelValue];
    this.ngModelChange(this.value);
    this.closeModal();
  }

  selectCustomItem() {
    if (this.customValue) {
      const customData = {
        isCustom: true,
        name: this.customValue
      }
    this.data.push(customData)
    this.selectItem(customData);
    }
  }


  filterData() {
    if (!this.searchValue) return this.data;
    return this.data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }
}
