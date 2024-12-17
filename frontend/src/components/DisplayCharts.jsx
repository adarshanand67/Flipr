import { Bar } from "react-chartjs-2";
import { companyToSvgPath, dateFormater } from "../utils/helpers";

const options = {
  responsive: true,
  maintainAspectRatio: true,
};

const DisplayCharts = ({ data, company }) => {
  const RupeeSymbol = "\u20B9";
  const dateLabels = data.map((item) => dateFormater(item.Date));
  const openPrices = data.map((item) => item.Open);
  const closePrices = data.map((item) => item.Close);
  const highPrices = data.map((item) => item.High);
  const lowPrices = data.map((item) => item.Low);
  const volume = data.map((item) => item.Volume);
  const adjClose = data.map((item) => item["Adj Close"]);
  const volatility = data.map((item) => ((item.High - item.Low) / item.Close).toFixed(2));

  const WeekHigh52 = Math.max(...highPrices).toFixed(2);
  const WeekLow52 = Math.min(...lowPrices).toFixed(2);
  const lastClosingPrice = parseInt(closePrices[closePrices.length - 1]).toFixed(2);
  const FirstOpeningPrice = parseInt(openPrices[0]).toFixed(2);
  const latestDate = dateLabels[dateLabels.length - 1];
  const priceChange = (lastClosingPrice - FirstOpeningPrice).toFixed(2);
  const priceChangePercentage = ((priceChange / FirstOpeningPrice) * 100).toFixed(2);
  const greenOrRed = priceChange > 0 ? "green" : "red";
  const upOrDownArrow = priceChange > 0 ? "▲" : "▼";
  const path = companyToSvgPath(company);

  const chartData = (label, data) => ({
    labels: dateLabels,
    datasets: [
      {
        label,
        data,
        backgroundColor: "#CCE4FF",
        borderColor: "#1A5BE3",
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="w-5/6 mt-5 m-auto p-5 border border-gray-400 rounded-lg">
      <div className="sm:grid sm:grid-cols-1 lg:grid-cols-2 m-5 rounded-lg">
        <div className="m-5 flex justify-start">
          <h1 className="text-3xl font-bold text-gray-500">
            {company} <br />
            <span className={`text-xl font-bold text-${greenOrRed}-500`}>
              {`${upOrDownArrow} ${priceChange} (${priceChangePercentage}%)`}
            </span>
            <br />
            <span className="text-gray-400 font-thin text-lg">Last Updated: {latestDate}</span>
          </h1>
        </div>
        <div className="flex justify-center sm:justify-end mx-5">
          <img src={path} alt="company" width="200px" />
        </div>
        <div className="flex gap-5 items-center justify-left mt-5 mx-5">
          <div>
            <h1 className="font-bold bg-green-300 text-center">52 Week High</h1>
            <h1 className="text-center">{RupeeSymbol + WeekHigh52}</h1>
          </div>
          <div>
            <h1 className="bg-red-400 font-bold text-center">52 Week Low</h1>
            <h1 className="text-center">{RupeeSymbol + WeekLow52}</h1>
          </div>
        </div>
        <div className="flex gap-5 items-center justify-end mt-5 mx-5">
          <div>
            <h1 className="font-bold bg-green-300 text-center">Last Closing Price</h1>
            <h1 className="text-center">{RupeeSymbol + lastClosingPrice}</h1>
          </div>
          <div>
            <h1 className="bg-red-400 font-bold text-center">First Opening Price</h1>
            <h1 className="text-center">{RupeeSymbol + FirstOpeningPrice}</h1>
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center sm:max-w-xs lg:max-w-lg">
          <h1 className="text-2xl font-bold">Open Price vs Date</h1>
          <Bar data={chartData("Open Price vs Date", openPrices)} options={options} />
        </div>
        <div className="flex flex-col items-center justify-center max-w-xs lg:max-w-lg">
          <h1 className="text-2xl font-bold">Close Price vs Date</h1>
          <Bar data={chartData("Close Price vs Date", closePrices)} options={options} />
        </div>
        <div className="flex flex-col items-center justify-center max-w-xs lg:max-w-lg">
          <h1 className="text-2xl font-bold">High Price vs Date</h1>
          <Bar data={chartData("High Price vs Date", highPrices)} options={options} />
        </div>
        <div className="flex flex-col items-center justify-center max-w-xs lg:max-w-lg">
          <h1 className="text-2xl font-bold">Low Price vs Date</h1>
          <Bar data={chartData("Low Price vs Date", lowPrices)} options={options} />
        </div>
        <div className="flex flex-col items-center justify-center max-w-xs lg:max-w-lg">
          <h1 className="text-2xl font-bold">Adj Close vs Date</h1>
          <Bar data={chartData("Adj Close vs Date", adjClose)} options={options} />
        </div>
        <div className="flex flex-col items-center justify-center max-w-xs lg:max-w-lg">
          <h1 className="text-2xl font-bold">Volume vs Date</h1>
          <Bar data={chartData("Volume vs Date", volume)} options={options} />
        </div>
        <div className="flex flex-col items-center justify-center max-w-xs lg:max-w-lg">
          <h1 className="text-2xl font-bold">Volatility vs Date</h1>
          <Bar data={chartData("Volatility vs Date", volatility)} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DisplayCharts;
