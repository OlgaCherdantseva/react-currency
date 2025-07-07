// import React from "react"

// import { observer } from "mobx-react-lite";
// import { currencyStore } from "./Stores/CurrencyStore";
// import { useState } from "react";
// import '../index.css';

// import UsFlag from 'country-flag-icons/react/3x2/US';
// import EuFlag from 'country-flag-icons/react/3x2/EU';
// import RuFlag from 'country-flag-icons/react/3x2/RU';
// // Добавьте другие флаги по необходимости



// import { getCurrencyFlag } from './Stores/Flags';

// interface CurrencyPairProps {
//   from: string;
//   to: string;
//   isDefault?: boolean;
//   onRemove: () => void;
// }

// const CurrencyPair = observer(({ from, to, isDefault, onRemove }: CurrencyPairProps) => {
//   const [amount, setAmount] = useState<number>(1);
//   const [isFromInput, setIsFromInput] = useState<boolean>(true);

//   const handleFromChange = (value: number) => {
//     setAmount(value);
//     setIsFromInput(true);
//   };

//   const handleToChange = (value: number) => {
//     setAmount(value);
//     setIsFromInput(false);
//   };

//   const convertedAmount = isFromInput
//     ? currencyStore.convert(amount, from, to)
//     : currencyStore.convert(amount, to, from);

//   return (
//     <div className={`currency-pair ${isDefault ? 'default-pair' : ''}`}>
//       <div className="currency-input">
//         {getCurrencyFlag(from)}
//         <input
//           type="number"
//           value={isFromInput ? amount : convertedAmount}
//           onChange={(e) => handleFromChange(parseFloat(e.target.value))}
//           aria-label={`Сумма в ${from}`}
//         />
//         <span className="currency-code">{from}</span>
//       </div>
      
//       <div className="conversion-arrow">→</div>

//       <div className="currency-result">
//         {getCurrencyFlag(to)}
//         <input
//           type="number"
//           value={isFromInput ? convertedAmount : amount}
//           onChange={(e) => handleToChange(parseFloat(e.target.value))}
//           aria-label={`Сумма в ${to}`}
//         />
//         <span className="currency-code">{to}</span>
//       </div>

//       {!isDefault && (
//         <button 
//           className="remove-btn"
//           onClick={onRemove}
//           aria-label={`Удалить пару ${from}/${to}`}
//         >
//           ×
//         </button>
//       )}
//     </div>
//   );
// });

// export default CurrencyPair;

import React from "react"
import { observer } from "mobx-react-lite";
import { currencyStore } from "./Stores/CurrencyStore";
import { useState } from "react";
import '../index.css';
import { getCurrencyFlag } from './Stores/Flags';

interface CurrencyPairProps {
  from: string;
  to: string;
  isDefault?: boolean;
  onRemove: () => void;
}

const CurrencyPair = observer(({ from, to, isDefault, onRemove }: CurrencyPairProps) => {
  const [amount, setAmount] = useState<number>(1);
  const [isFromInput, setIsFromInput] = useState<boolean>(true);

  const handleFromChange = (value: number) => {
    setAmount(value);
    setIsFromInput(true);
  };

  const handleToChange = (value: number) => {
    setAmount(value);
    setIsFromInput(false);
  };

  const convertedAmount = isFromInput
    ? currencyStore.convert(amount, from, to)
    : currencyStore.convert(amount, to, from);

  return (
    <div className={`currency-pair ${isDefault ? 'default-pair' : ''}`}>
      <div className="currency-input">
        <div className="currency-header">
          {getCurrencyFlag(from)}
          <span className="currency-name">{currencyStore.getCurrencyName(from)}</span>
        </div>
        <input
          type="number"
          value={isFromInput ? amount : convertedAmount}
          onChange={(e) => handleFromChange(parseFloat(e.target.value))}
          aria-label={`Сумма в ${from}`}
        />
        <span className="currency-code">{from}</span>
      </div>
      
      <div className="conversion-arrow">→</div>

      <div className="currency-result">
        <div className="currency-header">
          {getCurrencyFlag(to)}
          <span className="currency-name">{currencyStore.getCurrencyName(to)}</span>
        </div>
        <input
          type="number"
          value={isFromInput ? convertedAmount : amount}
          onChange={(e) => handleToChange(parseFloat(e.target.value))}
          aria-label={`Сумма в ${to}`}
        />
        <span className="currency-code">{to}</span>
      </div>

      {!isDefault && (
        <button 
          className="remove-btn"
          onClick={onRemove}
          aria-label={`Удалить пару ${from}/${to}`}
        >
          ×
        </button>
      )}
    </div>
  );
});

export default CurrencyPair;