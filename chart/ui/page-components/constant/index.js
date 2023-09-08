export const positiveDataPoint = ["count", "amount", "total", "price"];
export const negativeDataPoint = ["price", "total", "amount", "count"];

export const CHARTTYPE = [
  { value: "hollowcandlestick", label: "hollowcandlestick" },
  { value: "ohlc", label: "OHLC" },
];

export const roundPrice = ({ item, point }) => {
  if (["amount", "total"].includes(point)) {
    return Math.abs(item?.[point]).toFixed(3);
  }
  return Math.abs(item?.[point]);
};

export const widthCal = ({ item, data }) => {
  return (item?.total / data[data.length - 1].total) * 100;
};

export const addTotal=({data})=>{
    let total=0
    return data
    .map((item) => {
        total +=item.amount 
        return { ...item, total:Math.abs(total) };
      });
}

export const CURMAPPING={
    'tBTCUSD':'BTC/USD',
    'tLTCUSD':'LTC/USD',
    'tETHUSD': 'ETH/USD',
}

export const control = [
    { time: 3, type: 'y', labal: '3y', parma: '1W',page:630 },
    { time: 1, type: 'y', labal: '1y', parma: '1D',page:630 },
    { time: 3, type: 'M', labal: '3m', parma: '12h',page:330 },
    { time: 1, type: 'M', labal: '1m', parma: '6h',page:330 },
    { time: 7, type: 'd', labal: '7d', parma: '1h',page:330 },
    { time: 3, type: 'd', labal: '3d', parma: '30m',page:330 },
    { time: 1, type: 'd', labal: '1d', parma: '15m',page:330 },
    { time: 6, type: 'h', labal: '6h', parma: '5m',page:330 },
    { time: 1, type: 'h', labal: '1h', parma: '1m',page:330 },

]