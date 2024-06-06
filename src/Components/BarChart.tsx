import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface BarChartProps {
  data: { name: string; y: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Products in selected Category",
    },
    xAxis: {
      categories: data.map((item) => item.name),
    },
    yAxis: {
      title: {
        text: "Smartphones",
      },
    },
    series: [
      {
        name: "Products",
        data: data.map((item) => item.y),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
