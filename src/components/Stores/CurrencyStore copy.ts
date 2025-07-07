import React from "react"

import { makeAutoObservable, reaction, runInAction  } from "mobx";

interface CurrencyRate {
  CharCode: string;
  Value: number;
  Nominal: number;
  Name: string;
}

class CurrencyStore {
  rates: Record<string, CurrencyRate> = {};
  currencyPairs: Array<{ from: string; to: string }> = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
    this.fetchRates();

    // Автосохранение при изменении пар
    reaction(
      () => this.currencyPairs,
      pairs => localStorage.setItem('currencyPairs', JSON.stringify(pairs))
 ) }

  private loadFromLocalStorage() {
    const savedPairs = localStorage.getItem('currencyPairs');
    this.currencyPairs = savedPairs 
      ? JSON.parse(savedPairs) 
      : [{ from: "USD", to: "RUB" }, 
      { from: "EUR", to: "RUB" }];
  }

  async fetchRates() {
    this.loading = true;
    try {
      const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
      const data = await response.json();
      this.rates = data.Valute;
      this.rates.RUB = { CharCode: "RUB", Value: 1, Nominal: 1, Name: "Российский рубль" };
    } catch (error) {
      this.error = "Ошибка загрузки курсов";
    } finally {
      this.loading = false;
    }
  }

  addPair(from: string, to: string) {
    if (!this.currencyPairs.some(p => p.from === from && p.to === to)) {
      this.currencyPairs.push({ from, to });
    }
  }

  removePair(index: number) {
    this.currencyPairs.splice(index, 1);
  }

  convert(amount: number, from: string, to: string): number {
    if (from === to) return amount;
    const fromRate = this.rates[from]?.Value / this.rates[from]?.Nominal;
    const toRate = this.rates[to]?.Value / this.rates[to]?.Nominal;
    return (amount * fromRate) / toRate;
  }

  removeCurrencyPair(index: number) {
    this.currencyPairs.splice(index, 1);
    // Для MobX лучше использовать runInAction:
    runInAction(() => {
      this.currencyPairs = this.currencyPairs.filter((_, i) => i !== index);
    });
  }
}

 export const currencyStore = new CurrencyStore();

