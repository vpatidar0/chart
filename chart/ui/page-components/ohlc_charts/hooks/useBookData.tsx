import React, { useEffect, useState } from "react";

const useBookData = ({selectFilter}) => {
  const [orderBook, setOrderBook] = useState<{ bids: any; asks: any }>({
    bids: [],
    asks: [],
  });

  useEffect(() => {
    const ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          event: "subscribe",
          channel: "book",
          symbol: selectFilter,
          prec: "P0",
          freq: "F0",
          len: 25,
        })
      );
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data as string);
      if (Array.isArray(response)) {
        const [_, data] = response;
        const [price, count, amount] = data;
        if (count > 0) {
          setOrderBook((prevOrderBook) => {
            const updatedBids = [...prevOrderBook.bids];
            const updatedAsks = [...prevOrderBook.asks];
            const existingBidIndex = updatedBids.findIndex(
              (bid) => bid.price === price
            );
            const existingAskIndex = updatedAsks.findIndex(
              (ask) => ask.price === price
            );
            if (existingBidIndex !== -1) {
              updatedBids[existingBidIndex] = { price, count, amount };
            } else if (existingAskIndex !== -1) {
              updatedAsks[existingAskIndex] = { price, count, amount };
            } else if (amount > 0) {
              updatedBids.push({ price, count, amount });
            } else {
              updatedAsks.push({ price, count, amount });
            }
            return {
              bids: updatedBids,
              asks: updatedAsks,
            };
          });
        } else {
          setOrderBook((prevOrderBook) => {
            const updatedBids = prevOrderBook.bids.filter(
              (bid: any) => bid.price !== price
            );
            const updatedAsks = prevOrderBook.asks.filter(
              (ask: any) => ask.price !== price
            );
            return {
              bids: updatedBids,
              asks: updatedAsks.sort((a: any, b: any) => b - a),
            };
          });
        }
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return { orderBook };
};

export default useBookData;
