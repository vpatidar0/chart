

import { calculateOptionsForInterval } from '@/ui/page-components/hepler';
import { useEffect, useState, useRef } from 'react';
import { createChart} from 'lightweight-charts';



const useChart = ({selectFilter}) => {
  const [selectedInterval, setSelectedInterval] = useState({
    time: 1,
    type: 'h',
    labal: '1h',
    parma: '1m',
    page: '330'
  },);

  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const areaSeriesRef = useRef(null);
  const candlestickSeriesRef = useRef(null);
  const [toolTipValue, setToolTipValue] = useState(null);
  const [loading,setLoading]=useState(false)

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/candles/trade:${selectedInterval.parma}:${selectFilter}/hist?limit=${selectedInterval.page}`
    );

    const data = await response.json();
    if(response.status){setLoading(false)}
    const responseValue = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/stats1/pos.size:${selectedInterval.parma}:${selectFilter}:long/hist`
    );
    const dataValue = await responseValue.json();
    const dataTime = data.map((item) => {
      return { time: item[0] / 1000, value: item[5] }
    })

    const cdata = data.map((d) => {
      return {
        time: d[0] / 1000,
        open: parseFloat(d[1]),
        close: parseFloat(d[2]),
        high: parseFloat(d[3]),
        low: parseFloat(d[4]),
        vloume:d[5]
      };
    });
    const len=cdata.length-1;
    const lastData=cdata[len]
    const {open,high,low,close,vloume}=lastData
    const color = close >= open ? 'green' : 'red';
    setToolTipValue({
      open: Math.ceil(open),
      high: Math.ceil(high),
      low: Math.ceil(low),
      close: Math.ceil(close),
      vloume: vloume >= 0.5?Math.ceil(vloume||0):0,
      color: color,
      value: ((high - low +1 ) >= 0 ? ' +' : '') + (high - low+1).toFixed(2),
      percentageChange: `${(((high - low) / low) * 100).toFixed(2)}%`
    })
    if (!chartRef.current) {
      const chartOptions = {
        layout: {
          textColor: '#fff',
          background: { type: 'solid', color: '#172d3e' },
        },
        grid: {
          vertLines: {
            color: '#385062',
          },
          horzLines: {
            color: '#385062',
          },
        },
        priceScale: {
          borderColor: '#385062',
        },
        timeScale: {
          borderColor: '#385062',
        },
      };


      const chartContainer = chartContainerRef.current || '';
     
      const chart = createChart(chartContainer, chartOptions);
  
      const areaSeries = chart.addAreaSeries({
        lineColor: '#2962FF',
        topColor: '#2962FF',
        bottomColor: 'rgba(41, 98, 255, 0.28)',
      });
      // const histogramSeries = chart.addHistogramSeries({ color: '#26a69a' });
      // histogramSeries.setData(dataTime.sort((a, b) => a.time - b.time));
      // areaSeries.setData(dataTime.sort((a, b) => a.time - b.time))

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });

      chartRef.current = chart;
      areaSeriesRef.current = areaSeries;
      candlestickSeriesRef.current = candlestickSeries;
    }
    candlestickSeriesRef.current?.setData(cdata.sort((a, b) => a.time - b.time));

    chartRef.current.timeScale().fitContent();

    chartRef.current.subscribeCrosshairMove((param) => {

      if (param !== undefined && param.time !== undefined) {
        const currentTime = param.time;
        const candleData = cdata.find((data) => data.time === currentTime);
        if (candleData) {
          const { open, high, low, close ,vloume} = candleData;
          const color = close >= open ? 'green' : 'red';
          setToolTipValue({
            open: Math.ceil(open),
            high: Math.ceil(high),
            low: Math.ceil(low),
            close: Math.ceil(close),
            vloume: vloume >= 0.5?Math.ceil(vloume||0):0,
            color: color,
            value: ((high - low +1 ) >= 0 ? ' +' : '') + (high - low+1).toFixed(2),
            percentageChange: `${(((high - low) / low) * 100).toFixed(2)}%`
          })
        }
      }
    });
    const { tickMarkFormatter, visibleRange } = calculateOptionsForInterval(selectedInterval);
    chartRef.current.timeScale().applyOptions({
      timeVisible: true,
      secondsVisible: true,
      tickMarkFormatter,
    });

    chartRef.current.timeScale().setVisibleRange(visibleRange);
  };
  useEffect(() => {
    fetchData()
  }, [selectedInterval, selectFilter]);

  return { selectedInterval, chartContainerRef, setSelectedInterval,  toolTipValue ,loading}
}
export default useChart;