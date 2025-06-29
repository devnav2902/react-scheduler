import dayjs from "dayjs";
import { boxHeight, tileYOffset } from "@/constants";
import { TileProperties } from "@/types/global";
import { getTileXAndWidth } from "./getTileXAndWidth";

export const getTileProperties = (
  row: number,
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
  resourceStartDate: Date,
  resourceEndDate: Date,
  zoom: number
): TileProperties => {
  const y = row * boxHeight + tileYOffset;
  const rangeStartHour = startDate.hour();
  const rangeEndHour = endDate.hour();
  let parsedResourceStartDate;
  let parsedResourceEndDate;
  let parsedStartDate;
  let parsedEndDate;

  switch (zoom) {
    case 2: {
      parsedResourceStartDate = dayjs(resourceStartDate);
      parsedResourceEndDate = dayjs(resourceEndDate);
      parsedStartDate = dayjs(startDate).hour(rangeStartHour).minute(0);
      // parsedEndDate = dayjs(endDate).hour(rangeEndHour).minute(0);
      // this shows the tile ends prematurely at the 23:00 column even though the endDate is 01:22:27 (next day). That confirms the tile width is being clipped, most likely because your range.endDate only covers up to midnight (00:00) or 23:59 of the same day.
      parsedEndDate = dayjs(startDate).startOf("day").add(1, "day").add(3, "hour");

      break;
    }
    default: {
      parsedResourceStartDate = dayjs(resourceStartDate).hour(0).minute(0).second(0);
      parsedResourceEndDate = dayjs(resourceEndDate).hour(23).minute(59).second(59);
      parsedStartDate = startDate;
      parsedEndDate = endDate;
      break;
    }
  }

  return {
    ...getTileXAndWidth(
      { startDate: parsedResourceStartDate, endDate: parsedResourceEndDate },
      { startDate: parsedStartDate, endDate: parsedEndDate },
      zoom
    ),
    y
  };
};
