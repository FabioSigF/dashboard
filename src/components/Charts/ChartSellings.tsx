import React from "react";
import { Sell } from "../../types/global.type";
import ChartWeekSellings from "./ChartWeekSellings";
import ChartYearSellings from "./ChartYearSellings";

type Props = {
  sellings: Sell[];
  width: number;
  height: number;
  chartRangeType: "week" | "month" | "year" | "allTime";
};

const ChartSellings = ({ sellings, width, height, chartRangeType }: Props) => {
  console.log(sellings);
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
        </div>
      )}
    </>
  );
};

export default ChartSellings;
