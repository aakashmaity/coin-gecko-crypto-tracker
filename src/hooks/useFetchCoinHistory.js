import { useQuery } from "@tanstack/react-query";
import currencyStore from "../state/store"
import { useState } from "react";
import { fetchCoinHistoricData } from "../services/fetchCoinHistoricData";


function useFetchCoinHistory(coinId ) {
    const { currency } = currencyStore();

    const [days, setDays] = useState(1);
    const [interval, setCoinInterval] = useState('');
  
    const { data: historicData, isLoading, isError } = useQuery({
      queryKey: ['coinHistoricData', coinId, currency, days],
      queryFn: () => fetchCoinHistoricData(coinId, interval, days, currency),
      retryDelay: 1000 * 60 * 2,
      staleTime: 1000 * 60 * 2
    })

    return [
        historicData,
        isLoading,
        isError,
        days,
        setDays,
        setCoinInterval,
        currency
    ]
}

export default useFetchCoinHistory