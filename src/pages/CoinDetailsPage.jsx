import { useParams } from "react-router-dom"
import parse from 'html-react-parser'
import PageLoader from "../components/PageLoader/PageLoader"
import CoinInfoContainer from "../components/CoinInfo/CoinInfoContainer"
import useFetchCoin from "../hooks/useFetchCoin"


function CoinDetailsPage() {

    const { coinId } = useParams()
    const { coin, error, isLoading, currency, isError } = useFetchCoin(coinId)
    

    if(isLoading){
        return <PageLoader />
    }

    if(isError){
        return <span>Error: {error.message}</span>
    }

    return (
        <div className="flex flex-col md:flex-row">

            <div className="md:w-1/3 w-full flex flex-col items-center mt-6 md:mt-0 border-r-2 border-gray-500">
                <img
                    alt={coin?.name}
                    src={coin?.image.large}
                    className="h-52 mb-5"
                />
                <h1 className="text-4xl font-bold mb-5">{coin?.name}</h1>
                <p className="w-full px-6 py-4 text-justify">
                    {parse(coin?.description.en.slice(0, 300))}
                </p>

                <div className="w-full flex flex-col md:flex-row md:justify-around">
                    <div className="flex items-center mb-4 md:mb-0">

                        <h2 className="text-xl font-bold">Rank</h2>
                        <span className="ml-3 text-xl">
                            {coin?.market_cap_rank}
                        </span>
                    </div>

                    <div className="flex items-center mb-4 md:mb-0">

                        <h2 className="text-xl text-yellow-400 font-bold">Current Price</h2>
                        <span className="ml-3 text-xl">
                            {coin?.market_data.current_price[currency]}
                        </span>
                    </div>
                </div>
            </div>


            <div className="md:w-2/3 w-full p-6">
                <CoinInfoContainer coinId={coin?.id}/>
            </div>
        </div>
    )
}

export default CoinDetailsPage