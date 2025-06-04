import {
  weekWidth,
  dayWidth,
  outsideWrapperId,
  leftColumnWidth,
  screenWidthMultiplier,
  zoom2ColumnWidth,
  hoursInDay
} from "@/constants";

export const getCols = (zoom: number) => {
  const wrapperWidth = document.getElementById(outsideWrapperId)?.clientWidth || 0;
  const componentWidth = wrapperWidth - leftColumnWidth;

  switch (zoom) {
    case 1:
      return Math.ceil(componentWidth / dayWidth) * screenWidthMultiplier;
    case 2:
      return hoursInDay * screenWidthMultiplier;
    default:
      return Math.ceil(componentWidth / weekWidth) * screenWidthMultiplier;
  }
};

export const getVisibleCols = (zoom: number) =>
  zoom === 2 ? hoursInDay : getCols(zoom) / screenWidthMultiplier;
