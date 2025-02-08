import CoinInfo from "./CoinInfo"
import PageLoader from "../PageLoader/PageLoader";
import Alert from "../Alert/Alert";
import useFetchCoinHistory from "../../hooks/useFetchCoinHistory";


function CoinInfoContainer({ coinId }) {

  const { historicData, isLoading, isError, days, setDays, setCoinInterval, currency } = useFetchCoinHistory(coinId)

  
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