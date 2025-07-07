import React from "react"
import { useEffect, useState, useCallback } from 'react'
import Button from './Button/Button'
import Modal from './Modal/Modal'
import useInput from '../hooks/useInput'

import { observer } from "mobx-react-lite";
import { currencyStore } from "./Stores/CurrencyStore";
import CurrencyPair from "./CurrencyPair";
import AddCurrency from "./AddCurrency";
// import { useEffect } from "react";

const CurrencyStoreSection = observer(() => {
    if (currencyStore.loading) return <div className="loading">Загрузка...</div>;
    if (currencyStore.error) return <div className="error">{currencyStore.error}</div>;
  
    return (
      <section className="currency-section">
        <h2>Курсы валют</h2>
        <AddCurrency />
        
        <div className="currency-pairs-list">
          {currencyStore.currencyPairs.map((pair, index) => (
            <CurrencyPair
              key={`${pair.from}-${pair.to}-${index}`}
              from={pair.from}
              to={pair.to}
              isDefault={pair.isDefault}
              onRemove={() => currencyStore.removeCurrencyPair(index)}
            />
          ))}
        </div>
      </section>
    );
  });
  
  export default CurrencyStoreSection;