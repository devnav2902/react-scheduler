import { FC, MouseEventHandler } from "react";
import { useTheme } from "styled-components";
import { Icon, IconButton, Toggle } from "@/components";
import { HeaderCustomProps } from "@/components/Scheduler/types";
import { useCalendar } from "@/context/CalendarProvider";
import { useLanguage } from "@/context/LocaleProvider";
import {
  Filters,
  NavBtn,
  NavigationWrapper,
  OptionsContainer,
  Today,
  Wrapper,
  Zoom
} from "./styles";
import { TopbarProps } from "./types";

const Topbar: FC<TopbarProps> = ({ width, showThemeToggle, toggleTheme }) => {
  const { topbar } = useLanguage();
  const {
    data,
    config,
    handleGoNext,
    handleGoPrev,
    handleGoToday,
    zoomIn,
    zoomOut,
    changeZoom,
    isNextZoom,
    isPrevZoom,
    handleFilterData,
    onClearFilterData,
    centerHeaderRender,
    leftHeaderRender,
    rightHeaderRender
  } = useCalendar();
  const { colors } = useTheme();
  const { filterButtonState = -1 } = config;

  const handleClearFilters: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    onClearFilterData?.();
  };

  const calendarConfig: HeaderCustomProps = {
    data,
    config,
    isNextZoom,
    isPrevZoom,
    changeZoom,
    zoomIn,
    zoomOut,
    handleGoNext,
    handleGoPrev,
    handleGoToday,
    handleFilterData,
    onClearFilterData
  };

  return (
    <Wrapper width={width}>
      <Filters>
        {(() => {
          if (leftHeaderRender) {
            return leftHeaderRender(calendarConfig);
          }

          return (
            filterButtonState >= 0 && (
              <IconButton
                variant={filterButtonState ? "filled" : "outlined"}
                iconName="filter"
                width="16"
                height="16"
                onClick={handleFilterData}>
                {topbar.filters}
                {!!filterButtonState && (
                  <span onClick={handleClearFilters}>
                    <Icon iconName="close" height="16" width="16" fill={colors.textSecondary} />
                  </span>
                )}
              </IconButton>
            )
          );
        })()}
      </Filters>
      <NavigationWrapper>
        {centerHeaderRender ? (
          centerHeaderRender(calendarConfig)
        ) : (
          <>
            <NavBtn disabled={!data?.length} onClick={handleGoPrev}>
              <Icon iconName="arrowLeft" height="15" fill={colors.textPrimary} />
              {topbar.prev}
            </NavBtn>
            <Today onClick={handleGoToday}>{topbar.today}</Today>
            <NavBtn disabled={!data?.length} onClick={handleGoNext}>
              {topbar.next}
              <Icon iconName="arrowRight" height="15" fill={colors.textPrimary} />
            </NavBtn>
          </>
        )}
      </NavigationWrapper>
      <OptionsContainer>
        {showThemeToggle && <Toggle toggleTheme={toggleTheme} />}
        {rightHeaderRender ? (
          rightHeaderRender(calendarConfig)
        ) : (
          <Zoom>
            {topbar.view}
            <IconButton
              isDisabled={!isPrevZoom}
              onClick={zoomOut}
              isFullRounded
              iconName="subtract"
              width="14"
            />
            <IconButton
              isDisabled={!isNextZoom}
              onClick={zoomIn}
              isFullRounded
              iconName="add"
              width="14"
            />
          </Zoom>
        )}
      </OptionsContainer>
    </Wrapper>
  );
};
export default Topbar;
