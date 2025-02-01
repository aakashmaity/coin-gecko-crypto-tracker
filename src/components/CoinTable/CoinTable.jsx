import { useEffect, useState } from "react"
import { fetchCoinData } from "../../services/fetchCoinData"
import { useQuery } from "@tanstack/react-query";

function CoinTable() {

    const [page, setPage] = useState(1);
    const { data, status, error } = useQuery({
        queryKey: ['coins', page],
        queryFn: () => fetchCoinData(page, 'usd'),
        retry: 3,
        retryDelay: 1000,
        staleTime: 1000
    })

    useEffect(() => {
        // console.log(data)
    },[data])

    if (status === 'pending') {
        return <span>Loading...</span>
    }

    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }


    return (
        <div>
            {data.map((coin) => <div key={coin.id}>{coin.name}</div>)}
            CoinTable
            <br />
            <button onClick={() => setPage(page - 1)}>Prev</button>
            <br />
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    )
}

export default CoinTable