const TIMEMAPPING={
    '6h':6,
    '15m':15,
    '30m':30,
    '1h':1,
    '3h':3,
    '1M':1,
    '14D':14,
    '1d':1,
    '3d':3
  }

export const calculateOptionsForInterval = (inter) => {
    const {type,time}=inter||{}
  
    let tickMarkFormatter;
    let visibleRange;
    const currentTimestamp = Math.floor(Date.now() / 1000);

  switch (type) {

  case 'h':
      tickMarkFormatter = (time) => {
        const date = new Date(time * 1000);
        const hours = date.getHours() % 12 || 12; 
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM'; 
        const minutes = date.getMinutes().toString().padStart(2, '0'); 
        return `${hours}:${minutes} ${ampm}`;
      };
      const secondsInHour = 3600;
      visibleRange = { from: currentTimestamp - (time * secondsInHour), to: currentTimestamp };
      break;
  
    case 'd':
      tickMarkFormatter = (time) => {
        const date = new Date(time * 1000);
        const month = date.toLocaleString('default', { month: 'short' });
        return `${date.getDate()} ${month}`;
      };
      const secondsInDay = 86400;
      visibleRange = { from: currentTimestamp - (time * secondsInDay), to: currentTimestamp };
      break;
  
    case 'M':
      tickMarkFormatter = (time) => {
        const date = new Date(time * 1000);
        const month = date.toLocaleString('default', { month: 'short' });
        return `${month} ${date.getDate()}`;
      };
      const secondsInMonth = 30 * 24 * 60 * 60;
      visibleRange = { from: currentTimestamp - (time * secondsInMonth), to: currentTimestamp };
      break;
    default:
        tickMarkFormatter = (time) => {
          const date = new Date(time * 1000);
          const month = date.toLocaleString('default', { month: 'short' });
          return `${month} ${date.getFullYear().toString()}`;
        };

        const secondsInYear = 365 * 24 * 60 * 60;
        visibleRange = { from: currentTimestamp - (time * secondsInYear), to: currentTimestamp };  
    break;
  

  };
  return {tickMarkFormatter,visibleRange}
  }