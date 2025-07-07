// import React, { useState } from 'react';
// import { currencyStore } from './Stores/CurrencyStore';
// import { observer } from 'mobx-react-lite';

// const AddCurrency = observer(() => {
//   const [from, setFrom] = useState('RUB');
//   const [to, setTo] = useState('USD');

//   const handleAdd = () => {
//     currencyStore.addCurrencyPair(from, to); // Теперь метод существует
//     setFrom('RUB');
//     setTo('USD');
//   };

//   return (
//     <div className="add-currency">
//       <select 
//         value={from} 
//         onChange={(e) => setFrom(e.target.value)}
//         aria-label="Выберите исходную валюту"
//       >
//         {currencyStore.getAvailableCurrencies().map((code) => (
//           <option key={`from-${code}`} value={code}>
//             {code}
//           </option>
//         ))}
//       </select>

//       <span>→</span>

//       <select
//         value={to}
//         onChange={(e) => setTo(e.target.value)}
//         aria-label="Выберите целевую валюту"
//       >
//         {currencyStore.getAvailableCurrencies().map((code) => (
//           <option key={`to-${code}`} value={code}>
//             {code}
//           </option>
//         ))}
//       </select>

//       <button onClick={handleAdd} aria-label="Добавить валютную пару">
//         Добавить
//       </button>
//     </div>
//   );
// });

// export default AddCurrency;


import React, { useState } from 'react';
import { currencyStore } from './Stores/CurrencyStore';
import { observer } from 'mobx-react-lite';

const AddCurrency = observer(() => {
  const [from, setFrom] = useState('RUB');
  const [to, setTo] = useState('USD');

  const handleAdd = () => {
    currencyStore.addCurrencyPair(from, to);
    setFrom('RUB');
    setTo('USD');
  };

  return (
    <div className="add-currency">
      <select 
        value={from} 
        onChange={(e) => setFrom(e.target.value)}
        aria-label="Выберите исходную валюту"
      >
        {currencyStore.getAvailableCurrencies().map((code) => (
          <option key={`from-${code}`} value={code}>
            {code} - {currencyStore.getCurrencyName(code)}
          </option>
        ))}
      </select>

      <span>→</span>

      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        aria-label="Выберите целевую валюту"
      >
        {currencyStore.getAvailableCurrencies().map((code) => (
          <option key={`to-${code}`} value={code}>
            {code} - {currencyStore.getCurrencyName(code)}
          </option>
        ))}
      </select>

      <button className='button' onClick={handleAdd} aria-label="Добавить валютную пару">
        Добавить
      </button>
    </div>
  );
});

export default AddCurrency;