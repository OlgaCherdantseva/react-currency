import React from "react"

import { observer } from "mobx-react-lite";
import { currencyStore } from "./Stores/CurrencyStore";
import { useState } from "react";
import '../index.css';

import UsFlag from 'country-flag-icons/react/3x2/US';
import EuFlag from 'country-flag-icons/react/3x2/EU';
import RuFlag from 'country-flag-icons/react/3x2/RU';
// Добавьте другие флаги по необходимости

const FLAG_COMPONENTS = {
  USD: <UsFlag style={{ width: '24px', height: '18px'}} />,
  EUR: <EuFlag style={{ width: '24px', height: '18px'}} />,
  RUB: <RuFlag style={{ width: '24px', height: '18px'}} />,
};

const FLAG_EMOJI: Record<string, string> = {
  USD: "🇺🇸", EUR: "🇪🇺", RUB: "🇷🇺", 
  GBP: "🇬🇧", JPY: "🇯🇵", CNY: "🇨🇳"
};

interface CurrencyPairProps {
  from: string;
  to: string;
  onRemove: () => void;
}

const CurrencyPair = observer(({ from, to, onRemove }: CurrencyPairProps) => {
  const [amount, setAmount] = useState(1);

  const convertedAmount = currencyStore.convert(amount, from, to);

  return (
    <div className="currency-pair">
      <div className="currency-input">
        <span className="flag">{FLAG_EMOJI[from] || "🏳️"}</span>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <span className="currency-code">{from}</span>
      </div>
      
      <div className="conversion-arrow">→</div>

      <div className="currency-result">
        {/* <span className="flag">{FLAG_EMOJI[to] || "🏳️"}</span> */}
        {/* <span className="flag">
  {FLAGS[from] || (
    <svg viewBox="0 0 24 18" width="24" height="18">
      <rect width="24" height="18" fill="#ddd"/>
    </svg>
  )}
</span>  */}
<span className="flag">
  {FLAG_COMPONENTS[from] || (
    <svg viewBox="0 0 24 18" width="24" height="18">
      <rect width="24" height="18" fill="#ddd" />
    </svg>
  )}
</span>

        <input
          type="number"
          value={convertedAmount.toFixed(4)}
          readOnly
        />
        <span className="currency-code">{to}</span>
      </div>

      <button className="remove-btn" onClick={onRemove}>×</button>
    </div>
  );
});

export default CurrencyPair;