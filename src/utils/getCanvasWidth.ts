import {
  outsideWrapperId,
  leftColumnWidth,
  screenWidthMultiplier,
  hoursInDay,
  zoom2ColumnWidth
} from "@/constants";

export const getCanvasWidth = () => {
  const wrapperWidth = document.getElementById(outsideWrapperId)?.clientWidth || 0;

  // Exclude the sidebar
  const canvasVisibleWidth = wrapperWidth - leftColumnWidth;

  // Set the full scrollable width to fit 24 hours, even if screen is smaller
  const totalCanvasWidth = hoursInDay * zoom2ColumnWidth;

  return Math.max(canvasVisibleWidth, totalCanvasWidth); // Ensure it's at least 24 hours wide
};
