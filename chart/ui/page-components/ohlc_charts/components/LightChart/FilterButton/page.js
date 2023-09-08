import styles from './styles.module.css'
import { control } from '@/ui/page-components/constant'
const FilterButton = ({ handleIntervalChange, selectedInterval }) => {
    return <div className={styles.button_box}>
        {control.map((item) => {
            return <div key={item.time} onClick={() => handleIntervalChange(item)}
                className={item.labal === selectedInterval.labal ? styles.active : ''}>{item.labal}</div>
        })}

    </div>
}
export default FilterButton;