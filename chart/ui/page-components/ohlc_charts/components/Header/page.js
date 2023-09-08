const Config = [
    'Chart', 'Book', 'TradingView'
]
import Select from "@/ui/common/select";
import { options } from '../../../constant/filter'
import styles from './style.module.css'
const Header = ({ setSelcetType, selectType, setSelectFilter }) => {
    return <div className={styles.container}>
        <div className={styles.head}>
            {Config.map((item) => {
                return <div className={`${selectType === item ? styles.active : ''} ${styles.text}`}
                    onClick={() => { setSelcetType(item) }}
                    key={item}>{item}</div>

            })}</div>
        <Select
            onChange={(e) => {
                setSelectFilter(e)
            }}
            options={options}
        /></div>
}
export default Header;