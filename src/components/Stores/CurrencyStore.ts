import React from "react"

import { makeAutoObservable, reaction, runInAction  } from "mobx";



interface CurrencyRate {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
}

interface CurrencyPair {
  from: string;
  to: string;
  isDefault?: boolean;
}

interface CbrResponse {
  Valute: Record<string, CurrencyRate>;
}

class CurrencyStore {
  rates: Record<string, CurrencyRate> = {};
  currencyPairs: CurrencyPair[] = [
    { from: "USD", to: "RUB", isDefault: true },
    { from: "EUR", to: "RUB", isDefault: true }
  ];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
    this.fetchRates();
  }

  private loadFromLocalStorage() {
    const saved = localStorage.getItem('customCurrencyPairs');
    if (saved) {
      try {
        const customPairs: CurrencyPair[] = JSON.parse(saved);
        this.currencyPairs = [
          ...this.getDefaultPairs(),
          ...customPairs
        ];
      } catch (e) {
        console.error("Failed to parse saved pairs", e);
      }
    }
  }

  private saveToLocalStorage() {
    const customPairs = this.currencyPairs.filter(p => !p.isDefault);
    localStorage.setItem('customCurrencyPairs', JSON.stringify(customPairs));
  }

  private getDefaultPairs(): CurrencyPair[] {
    return [
      { from: "USD", to: "RUB", isDefault: true },
      { from: "EUR", to: "RUB", isDefault: true }
    ];
  }

  async fetchRates() {
    this.loading = true;
    this.error = null;
    try {
      const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
      const data: CbrResponse = await response.json();
      
      runInAction(() => {
        this.rates = data.Valute;
        // Добавляем RUB для корректной конвертации
        this.rates.RUB = {
          ID: "R00000",
          NumCode: "643",
          CharCode: "RUB",
          Nominal: 1,
          Name: "Российский рубль",
          Value: 1,
          Previous: 1
        };
      });
    } catch (err) {
      runInAction(() => {
        this.error = "Ошибка загрузки курсов";
        console.error("Failed to fetch rates:", err);
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  addCurrencyPair(from: string, to: string) {
    if (!this.currencyPairs.some(p => p.from === from && p.to === to)) {
      runInAction(() => {
        this.currencyPairs.push({ from, to });
      });
      this.saveToLocalStorage();
    }
  }

  removeCurrencyPair(index: number) {
    if (!this.currencyPairs[index].isDefault) {
      this.currencyPairs.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  convert(amount: number, from: string, to: string): number {
    if (from === to) return amount;

    const fromRate = this.rates[from]?.Value / this.rates[from]?.Nominal;
    const toRate = this.rates[to]?.Value / this.rates[to]?.Nominal;

    if (!fromRate || !toRate) return 0;

    return parseFloat(((amount * fromRate) / toRate).toFixed(2));
  }

  // В классе CurrencyStore добавим метод для получения названия валюты:

getCurrencyName(code: string): string {
  return this.rates[code]?.Name || code;
}

  // getAvailableCurrencies(): string[] {
  //   return Object.keys(this.rates).sort();
  // }

  getAvailableCurrencies(): string[] {
    return Object.keys(this.rates).sort();
  }

}

export const currencyStore = new CurrencyStore();