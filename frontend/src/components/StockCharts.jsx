import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import more from "highcharts/highcharts-more";
import Indicators from "highcharts/indicators/indicators-all.js";
import AnnotationsAdvanced from "highcharts/modules/annotations-advanced.js";
import DragPanes from "highcharts/modules/drag-panes.js";
import FullScreen from "highcharts/modules/full-screen.js";
import PriceIndicator from "highcharts/modules/price-indicator.js";
import StockTools from "highcharts/modules/stock-tools.js";
import React from "react";
import { parseUnixTime } from "../utils/parseUnix";

const StockCharts = ({ data }) => {
  const date_ohlc_volume = data.map((item) => [
    parseUnixTime(item.Date),
    parseFloat(item.Open),
    parseFloat(item.High),
    parseFloat(item.Low),
    parseFloat(item.Close),
  ]);

  more(Highcharts);

  const options = {
    yAxis: {
      title: {
        text: "Stock Price",
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    chart: {
      type: "candlestick",
    },
    title: {
      text: "Candle Stick Graph",
    },
    navigator: {
      enabled: true,
      series: [
        {
          data: date_ohlc_volume,
        },
      ],
    },
    rangeSelector: {
      buttons: [
        {
          type: "day",
          count: 3,
          text: "3d",
        },
        {
          type: "week",
          count: 1,
          text: "1w",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "all",
          text: "All",
        },
      ],
      selected: 3,
    },
    xAxis: {
      labels: {
        formatter: function () {
          var date = new Date(this.value);
          var month = date.toLocaleString("default", { month: "long" });
          var year = date.getFullYear();
          return month + " " + year;
        },
      },
      plotBands: [
        {
          color: "#FCFFC5",
          from: 1424473600000,
          to: 1424560000000,
          label: {
            text: "3 days",
          },
        },
      ],
    },
    chart: {
      zoomType: "x",
    },
  };

  return (
    <div className="flex w-5/6">
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default StockCharts;
