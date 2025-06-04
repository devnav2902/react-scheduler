import dayjs from "dayjs";
import { getCols } from "./getCols";

export type DatesRange = {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
};

export type ParsedDatesRange = {
  startDate: Date;
  endDate: Date;
};

export const getDatesRange = (date: dayjs.Dayjs, zoom: number): DatesRange => {
  const colsOffset = getCols(zoom) / 2;

  let startDate;
  let endDate;

  switch (zoom) {
    case 1:
      startDate = date.subtract(colsOffset, "days").startOf("day");
      endDate = date.add(colsOffset, "days").endOf("day");
      break;
    case 2:
      // Lock to a single day
      startDate = date.startOf("day");
      endDate = date.endOf("day");
      break;
    default:
      startDate = date.subtract(colsOffset, "weeks").startOf("week");
      endDate = date.add(colsOffset, "weeks").endOf("week");
      break;
  }

  return {
    startDate,
    endDate
  };
};

export const getParsedDatesRange = (date: dayjs.Dayjs, zoom: number): ParsedDatesRange => {
  const dates = getDatesRange(date, zoom);

  return {
    startDate: dates.startDate.toDate(),
    endDate: dates.endDate.toDate()
  };
};
