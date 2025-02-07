import { useQuery } from "@tanstack/react-query"
import CoinInfo from "./CoinInfo"
import { fetchCoinHistoricData } from "../../services/fetchCoinHistoricData"
import currencyStore from "../../state/store"
import { useState } from "react";
import PageLoader from "../PageLoader/PageLoader";
import Alert from "../Alert/Alert";


function CoinInfoContainer({ coinId }) {

  const { currency } = currencyStore();

  const [days, setDays] = useState(1);
  const [interval, setCoinInterval] = useState('daily');

  const { data: historicData, isLoading, isError } = useQuery({
    queryKey: ['coinHistoricData', coinId, currency, days],
    queryFn: () => fetchCoinHistoricData(coinId, interval, days, currency),
    retryDelay: 1000,
    staleTime: 1000 * 60 * 2
  })
  console.log("historicData:", historicData)

  if (isLoading) {
    return <PageLoader />
  }

  if (isError) {
    return <Alert message="Error while fetching data" type="error" />
  }

  return (
    <CoinInfo
      historicData={historicData}
      days={days}
      setDays={setDays}
      setCoinInterval={setCoinInterval}
      currency={currency}
    />
  )
}

export default CoinInfoContainer