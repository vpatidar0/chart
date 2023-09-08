"use client";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();
import Book from "./components/Book";
import { useState } from "react";
import Header from "./components/Header/page";
import LightChart from './components/LightChart/page'
import dynamic from 'next/dynamic';
const TradingView = dynamic(() => import('../trading-view/components/page'), {
  ssr: false,
});
const renderMapping = {
  'Chart': LightChart ,
  'Book': Book ,
  "TradingView":TradingView
}

const OHLC = () => {
  const [selectType, setSelcetType] = useState('Chart')
  const [selectFilter, setSelectFilter] = useState('tBTCUSD')
  const Component = renderMapping[selectType] || null

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Header setSelcetType={setSelcetType} selectType={selectType} setSelectFilter={setSelectFilter}/>

        {Component ? <Component selectFilter={selectFilter}/> : null}
      </QueryClientProvider>
    </div>
  );
};
export default OHLC;
