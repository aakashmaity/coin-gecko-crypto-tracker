import { useState } from "react"
import { fetchCoinData } from "../../services/fetchCoinData"
import { useQuery } from "@tanstack/react-query";

function CoinTable({ currency }) {

    const [page, setPage] = useState(1);

    // If your query function depends on a variable, include it in your query key
    // query keys uniquely describe the data they are fetching whenever any change happens

    const { data, status, error , isLoading} = useQuery({
        queryKey: ['coins', page, currency],   
        queryFn: () => fetchCoinData(page, currency),
        // retry: 2,
        retryDelay: 1000,
        staleTime: 1000 * 60 * 2  // how long you're expecting your data is fresh or not updated anything till 2 minutes 
    })


    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }


    return (
        <div className="my-5 flex flex-col items-center justify-center gap-5 w-[80vw] mx-auto">
            {currency}
            <div className="w-full bg-yellow-300 text-black flex py-4 px-2 font-semibold items-center justify-center">
                <div className="basis-[35%]">Coin</div>
                <div className="basis-[25%]">Price</div>
                <div className="basis-[20%]">24h change</div>
                <div className="basis-[20%]">Market cap</div>
            </div>


            <div className="flex flex-col w-[80vw] mx-auto">
                {isLoading && <div>Loading...</div>}
                {data && data.map((coin) => {
                    return (
                        <div key={coin.id} className="w-full bg-transparent text-white flex py-4 px-2 items-center justify-between">
                            <div className="flex items-center justify-start gap-3 basis-[35%]">
                                <div className="w-[5rem] h-[5rem]">
                                    <img src={coin.image} className="w-full h-full" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-xl">{coin.name}</div>
                                    <div className="text-md">{coin.symbol}</div>
                                </div>
                            </div>
                            <div className="basis-[25%]">
                                {coin.current_price}
                            </div>
                            <div className="basis-[20%]">
                                {coin.price_change_24h}
                            </div>
                            <div className="basis-[20%]">
                                {coin.market_cap}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="flex gap-4 justify-center items-center">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="btn btn-primary btn-wide text-white text-2xl"
                >
                    Prev
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    className="btn btn-secondary btn-wide text-white text-2xl"
                >
                    Next
                </button>
            </div>

        </div>
    )
}

export default CoinTable