import React from "react";
import { Sell } from "../../types/global.type";
import ChartWeekSellings from "./ChartWeekSellings";
import ChartYearSellings from "./ChartYearSellings";
import ChartMonthSellings from "./ChartMonthSellings";

type Props = {
  sellings: Sell[];
  width: number;
  height: number;
  chartRangeType: "week" | "month" | "year" | "allTime";
};

const ChartSellings = ({ sellings, width, height, chartRangeType }: Props) => {
  return (
    <>
      {sellings && (
        <div>
          {chartRangeType === "week" && (
            <ChartWeekSellings
              sellings={sellings}
              width={width}
              height={height}
            />
          )}
          {chartRangeType === "year" && (
            <ChartYearSellings
              sellings={sellings}
              width={width}
              height={height}
            />
          )}
          {chartRangeType === "month" && (
            <ChartMonthSellings
              sellings={sellings}
              width={width}
              height={height}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ChartSellings;
