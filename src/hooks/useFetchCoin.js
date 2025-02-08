import { useQuery } from "@tanstack/react-query"
import { fetchCoinDetails } from "../services/fetchCoinDetails"
import currencyStore from "../state/currencyStore"


function useFetchCoin(coinId){
    const { currency } = currencyStore()

    const { data: coin, error, isLoading, isError } = useQuery({
        queryKey: ['coins', coinId],
        queryFn: () => fetchCoinDetails(coinId),
        // retry: 2,
        retryDelay: 1000 * 60 * 2,
        staleTime: 1000 * 60 * 2,
    })

    return {
        coin,
        error,
        isLoading,
        isError,
        currency
    }
}

export default useFetchCoin