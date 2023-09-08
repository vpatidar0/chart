import styles from '../styles.module.css';

import { roundPrice ,widthCal} from '@/ui/page-components/constant'

const Body = ({ data, pointData,name='' }) => {
    return <div className={styles.body}>  {
        (data||[]).map((item) => {
            return <div className={styles.head} key={item.total}>
                <div className={styles[name]} style={{ width: `${widthCal({item,data})}%`}}/>
                {(pointData||[]).map((point) => {
                    return <div className={styles.value} key={point}>{roundPrice({item,point})}
                    </div>
                })}
            </div>
        })
    }
    </div>
}
export default Body;