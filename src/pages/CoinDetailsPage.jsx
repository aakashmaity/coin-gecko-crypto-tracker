import { useParams } from "react-router-dom"

function CoinDetailsPage() {

    const { coinId } = useParams()


    return (
        <div>CoinDetailsPage {coinId}</div>
    )
}

export default CoinDetailsPage