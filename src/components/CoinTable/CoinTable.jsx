import { useContext, useEffect, useState } from "react"
import { fetchCoinData } from "../../services/fetchCoinData"
import { useInfiniteQuery } from "@tanstack/react-query";
// import { CurrencyContext } from "../../context/CurrencyContext";
import { useNavigate } from "react-router-dom";
import PageLoader from "../PageLoader/PageLoader"
import currencyStore from "../../state/currencyStore";

function CoinTable() {

    // const { currency } = useContext(CurrencyContext);
    const { currency } = currencyStore();


    const navigate = useNavigate()

    const { data, isLoading, isError, error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['coins', currency],
        queryFn: ({ pageParam }) => fetchCoinData(pageParam, currency),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.length >= 10 ? pages.length + 1 : undefined
        },
    })


    // Implement infinite scroll
    function handleScroll() {
        const bottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 1;
        
        if (bottom) {
            fetchNextPage()
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        // cleanup function
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    // console.log("dataaa", data)



    function handleCoinRedirect(id) {
        navigate(`/details/${id}`)
    }

    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }


    return (
        <div className="my-5 flex flex-col items-center justify-center gap-5 w-[80vw] mx-auto">
            <div className="w-full bg-yellow-300 text-black flex py-4 px-2 font-semibold items-center justify-center">
                <div className="basis-[35%]">Coin</div>
                <div className="basis-[25%]">Price</div>
                <div className="basis-[20%]">24h change</div>
                <div className="basis-[20%]">Market cap</div>
            </div>


            <div className="flex flex-col w-[80vw] mx-auto">
                {isLoading && <PageLoader />}
                {data && data?.pages?.map((pages, index) => (
                    pages?.map((coin, idx) => {
                        return (
                            <div onClick={() => handleCoinRedirect(coin?.id)} key={`${coin?.id}-${idx}`} className="w-full bg-transparent text-white flex py-4 px-2 items-center justify-between">
                                <div className="flex items-center justify-start gap-3 basis-[35%]">
                                    <div className="w-[5rem] h-[5rem]">
                                        <img src={coin?.image} className="w-full h-full" loading="lazy" />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="text-xl">{coin?.name}</div>
                                        <div className="text-md">{coin?.symbol}</div>
                                    </div>
                                </div>
                                <div className="basis-[25%]">
                                    {coin?.current_price}
                                </div>
                                <div className="basis-[20%]">
                                    {coin?.price_change_24h}
                                </div>
                                <div className="basis-[20%]">
                                    {coin?.market_cap}
                                </div>
                            </div>
                        )
                    })
                ))}

            </div>

            {/* <div className="flex gap-4 justify-center items-center">
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
            </div> */}

        </div>
    )
}

export default CoinTable