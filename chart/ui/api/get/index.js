
import {request} from '@/packages/request/helpers/request'

export const getCandlesList = (paylaod) => request.get(
	'/candles/trade:1W:tBTCUSD/hist',
	{
		params: paylaod,
	},
);
export const getBookList = (paylaod) => request.get(
	'/book/tBTCUSD/P0?len=25',
	{
		params: paylaod,
	},
);