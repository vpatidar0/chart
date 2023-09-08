"use client";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import styles from './styles.module.css'
const TradingView = () => {
    
    return <div className={styles.container}> 
    <TradingViewWidget
        symbol="NASDAQ:AAPL"
        theme={Themes.DARK} autosize
        popup_height={100}
    /></div>
}
export default TradingView;