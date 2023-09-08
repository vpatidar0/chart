"use client";
import styles from './styles.module.css'
import FilterButton from './FilterButton/page';
import { CURMAPPING } from '@/ui/page-components/constant';
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { useState } from 'react';
import useChart from '../../hooks/useChart';
const LightChart = ({ selectFilter }) => {

  const { setSelectedInterval, toolTipValue,
    selectedInterval, chartContainerRef } = useChart({ selectFilter })

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
  };
  const { open, high, low, close, color, value, percentageChange,vloume } = toolTipValue || {}
  const style = { color: color, padding: '0px 5px 0px 2px' }
  
  return <div className={styles.container}>
    <div className={styles.header} >
      CHART{" "}
      <span className={styles.ti}>{CURMAPPING[selectFilter]}</span>
    </div>

    <div className={styles.head_box}>


      <div className={styles.title}>
        <div className={styles.heading}>{CURMAPPING[selectFilter]}</div>
        <div className={styles.sub_type}>O<span style={style}> {open}</span></div>
        <div className={styles.sub_type}>H<span style={style} >{high}</span></div>
        <div className={styles.sub_type}>L<span style={style}> {low}</span></div>
        <div className={styles.sub_type}>C<span style={style}> {close}</span></div>
        <div style={style}>{value} ({percentageChange})</div>
      </div>
      <div className={styles.volume}>Volume <span style={style}>{vloume||0}</span></div>
    </div>
    <div ref={chartContainerRef} id='contain' style={{ width: '100%', height: '395px' }} />
    <FilterButton handleIntervalChange={handleIntervalChange} selectedInterval={selectedInterval} />
  </div>;
};

export default LightChart;
