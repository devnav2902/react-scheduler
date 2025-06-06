import { createContext } from "react";
import dayjs from "dayjs";
import { CalendarContextType } from "./types";
import { ParsedDatesRange } from "@/utils/getDatesRange";

export const calendarContext = createContext<CalendarContextType>({
  handleGoNext: () => {},
  handleScrollNext: () => {},
  handleGoPrev: () => {},
  handleScrollPrev: () => {},
  handleGoToday: () => {},
  zoomIn: () => {},
  zoomOut: () => {},
  handleFilterData: () => {},
  updateTilesCoords: () => {},
  changeZoom: () => {},
  scrollToLoadData: false,
  tilesCoords: [],
  zoom: 0,
  isNextZoom: false,
  isPrevZoom: false,
  date: dayjs(),
  isLoading: false,
  cols: 0,
  startDate: {
    hour: 0,
    dayName: "",
    dayOfMonth: 0,
    weekOfYear: 0,
    month: 0,
    monthName: "",
    isCurrentDay: false,
    isBusinessDay: false,
    year: 0
  },
  dayOfYear: 0,
  recordsThreshold: 0,
  config: {
    zoom: 0
  },
  range: { startDate: new Date(), endDate: new Date() } as ParsedDatesRange,
  leftHeaderRender: (props) => {
    return null;
  },
  rightHeaderRender: (props) => {
    return null;
  },
  centerHeaderRender: (props) => {
    return null;
  },
  headerRender: (props) => {
    return null;
  }
});
