import React from 'react';
import './App.css';
import { Body } from './components/transaction/Body';
import { AppContextProvider } from './context/appContext';

export default function App() {
  return (
    <AppContextProvider>
        <Body />
    </AppContextProvider>
    )
};