import dayjs from "dayjs";
import {
  fonts,
  hoursInDay,
  zoom2ColumnWidth,
  zoom2HeaderMiddleRowHeight,
  zoom2HeaderTopRowHeight
} from "@/constants";
import { Day } from "@/types/global";
import { Theme } from "@/styles";
import { drawRow } from "../../drawRow";

export const drawZoom2DaysInMiddle = (
  ctx: CanvasRenderingContext2D,
  cols: number,
  startDate: Day,
  theme: Theme
) => {
  const hoursPerDay = 24;
  const daysInRange = Math.ceil(cols / hoursPerDay) + 2;
  const width = hoursPerDay * zoom2ColumnWidth;

  const startDateHour = dayjs(
    `${startDate.year}-${startDate.month + 1}-${startDate.dayOfMonth}T00:00:00`
  );
  let xPos = 0;

  for (let i = 0; i < daysInRange; i++) {
    const day = startDateHour.add(i, "day");
    const dayLabel = day.format("dddd DD.MM.YYYY").toUpperCase();

    drawRow(
      {
        ctx,
        x: xPos,
        y: zoom2HeaderTopRowHeight,
        width,
        height: zoom2HeaderMiddleRowHeight,
        textYPos: zoom2HeaderTopRowHeight + zoom2HeaderMiddleRowHeight / 2 + 2,
        label: dayLabel,
        font: fonts.bottomRow.number
      },
      theme
    );

    xPos += width;
  }
};
