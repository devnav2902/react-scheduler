import { ReactNode } from "react";
import { CalendarContextType } from "@/context/CalendarProvider/types";
import {
  Config,
  SchedulerData,
  SchedulerItemClickData,
  SchedulerProjectData
} from "@/types/global";
import { ParsedDatesRange } from "@/utils/getDatesRange";

export type HeaderCustomProps = Pick<
  CalendarContextType,
  | "handleGoNext"
  | "handleGoPrev"
  | "handleGoToday"
  | "handleFilterData"
  | "onClearFilterData"
  | "zoomIn"
  | "zoomOut"
  | "changeZoom"
> & {
  data?: SchedulerData;
  config?: Config;
  isNextZoom?: boolean;
  isPrevZoom?: boolean;
};

export type SchedulerProps = {
  data: SchedulerData;
  isLoading?: boolean;
  config?: Config;
  startDate?: string;
  onRangeChange?: (range: ParsedDatesRange) => void;
  onTileClick?: (data: SchedulerProjectData) => void;
  onFilterData?: () => void;
  onClearFilterData?: () => void;
  onItemClick?: (data: SchedulerItemClickData) => void;
  leftHeaderRender?: (props: HeaderCustomProps) => ReactNode;
  rightHeaderRender?: (props: HeaderCustomProps) => ReactNode;
  centerHeaderRender?: (props: HeaderCustomProps) => ReactNode;
};

export type StyledOutsideWrapperProps = {
  showScroll: boolean;
};
