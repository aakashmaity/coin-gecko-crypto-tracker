import { Chart, registerables } from "chart.js"
import Alert from "../Alert/Alert"
import { Line } from "react-chartjs-2"
import { chartDays } from "../../helpers/constants"

function CoinInfo({ historicData, days, setDays, setCoinInterval, currency }) {

  Chart.register(...registerables)

  function handleDayChange(e){
    const daySelected = e.target.value

    if(daySelected == 1){
      setCoinInterval?.('')
    } else {
      setCoinInterval?.('daily')
    }
    
    setDays?.(daySelected)
  }


  if (!historicData) {
    return <Alert message="No data available" type="warning" />
  }


  return (
    <div className="flex flex-col items-center justify-center mt-6 p-6 w-full ">

      <div className="h-[500px] w-full">
        <Line
          data={{
            labels: historicData.prices.map(coinPrice => {
              let date = new Date(coinPrice[0]);  // 
              let time = date?.getHours() > 12 ? `${date?.getHours() - 12}:${date?.getMinutes()} PM` : `${date?.getHours()}:${date?.getMinutes()} AM`
              return days == 1 ? time : date?.toLocaleDateString()
            }),

            datasets: [
              {
                label: `Price (Past ${days} ${days == 1 ? 'day' : 'days'}) in ${currency?.toUpperCase()}`,
                data: historicData?.prices.map(coinPrice => coinPrice[1])
              }
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              point: {
                radius: 0
              }
            },
          }}
        />
      </div>


      <div className="flex justify-center mt-5 w-full">
        <select 
          className="select select-primary w-full max-w-xs"
          onChange={handleDayChange}
          value={days}
        >
          {chartDays.map((day, index) => (
            <option
              key={index}
              value={day.value}
            >
              {day.label}
            </option>
          ))}
        </select>

      </div>
    </div>
  )
}

export default CoinInfo