import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { boxHeight, zoom2ColumnWidth } from "@/constants";
import { Day } from "@/types/global";

dayjs.extend(timezone);

export const drawCurrentHourLine = (
  lineCanvas: HTMLCanvasElement,
  rows: number,
  cols: number,
  parsedStartDate: Day
) => {
  if (!lineCanvas) return;
  const ctx = lineCanvas.getContext("2d");
  if (!ctx) return;

  const width = lineCanvas.clientWidth;
  const height = rows * boxHeight;

  lineCanvas.width = width * window.devicePixelRatio;
  lineCanvas.height = height * window.devicePixelRatio;

  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  ctx.clearRect(0, 0, width, height);

  const now = dayjs();
  const start = dayjs(
    `${parsedStartDate.year}-${parsedStartDate.month + 1}-${parsedStartDate.dayOfMonth + 1}T${
      parsedStartDate.hour
    }:00:00`
  );
  const diffHours = now.diff(start, "hour", true);

  // out of range
  if (diffHours < 0 || diffHours > cols) {
    return;
  }

  /**
   * TODO: SET TO CURRENT HOUR
   */
  const xLine = diffHours * zoom2ColumnWidth + zoom2ColumnWidth / 2;

  ctx.beginPath();
  ctx.strokeStyle = "#ff0000";
  ctx.lineWidth = 3;
  ctx.shadowColor = "rgba(255, 0, 0, 0.7)";
  ctx.shadowBlur = 5;
  ctx.moveTo(xLine, 0);
  ctx.lineTo(xLine, height);
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
};
