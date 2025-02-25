import { axiosInstance } from "../helpers/axiosInstance";

export async function fetchCoinData(pageParam, currency = 'usd') {
    const perPage = 10;

    try {
        const response = await axiosInstance.get(`/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${pageParam}`)
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
} 