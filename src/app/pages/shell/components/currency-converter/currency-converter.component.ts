import { Component, Input, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterModalComponent implements OnInit {

  amount: number = 0;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  convertedAmount: number | null = null;
  converterForm: FormGroup;
  conversionRates: { [key: string]: number } = {
    USD_EUR: 0.85,
    USD_GBP: 0.75,
    USD_INR: 73.5,
    USD_JPY: 110,
    EUR_USD: 1.18,
    EUR_GBP: 0.88,
    EUR_INR: 86.5,
    EUR_JPY: 129,
  };
  isVisible: boolean;

  constructor( private appService:AppService) { }

  ngOnInit(): void {
    this.conversionRates = JSON.parse(localStorage.getItem("currency") || '{}');

    this.converterForm = new FormGroup({
      amount: new FormControl(0, [Validators.required]),
      fromCurrency: new FormControl("USD", [Validators.required]),
      toCurrency: new FormControl("USD", [Validators.required]),
    }) as FormGroup;
  }
  showModal(): void {
    this.isVisible = true;
  }
  convertCurrency() {
      this.convertedAmount = this.appService.convertCurrency(
        this.converterForm.value.amount,
        this.converterForm.value.fromCurrency,
        this.converterForm.value.toCurrency
      );
  }

  handleOk(): void {
    this.convertCurrency();
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
