import { Day } from "@/types/global";
import { canvasWrapperId, currentHourLineWrapperId } from "@/constants";
import { Theme } from "@/styles";
import { drawMonthlyView } from "./drawMonthlyView";
import { drawYearlyView } from "./drawYearlyView";
import { drawHourlyView } from "./drawHourlyView";
import { drawCurrentHourLine } from "./drawCurrentHourLine";

export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  zoom: number,
  rows: number,
  cols: number,
  parsedStartDate: Day,
  theme: Theme
) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const canvasWrapper = document.getElementById(canvasWrapperId);
  if (!canvasWrapper) return;

  switch (zoom) {
    case 0:
      drawYearlyView(ctx, rows, cols, parsedStartDate, theme);
      break;
    case 1:
      drawMonthlyView(ctx, rows, cols, parsedStartDate, theme);
      break;
    case 2: {
      drawHourlyView(ctx, rows, cols, parsedStartDate, theme);

      const currentHourLineWrapper = document.getElementById(
        currentHourLineWrapperId
      ) as HTMLCanvasElement;

      if (currentHourLineWrapper) {
        drawCurrentHourLine(currentHourLineWrapper, rows, cols, parsedStartDate);
      }
      break;
    }
  }
};
