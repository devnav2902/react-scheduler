import { forwardRef, useCallback, useEffect, useRef } from "react";
import { useTheme } from "styled-components";
import { Loader, Tiles } from "@/components";
import {
  boxHeight,
  canvasWrapperId,
  currentHourLineWrapperId,
  leftColumnWidth,
  outsideWrapperId
} from "@/constants";
import { useCalendar } from "@/context/CalendarProvider";
import { drawGrid } from "@/utils/drawGrid/drawGrid";
import { getCanvasWidth } from "@/utils/getCanvasWidth";
import { resizeCanvas } from "@/utils/resizeCanvas";
import { GridProps } from "./types";
import {
  StyledCanvas,
  StyledCurrentHourLineCanvas,
  StyledInnerWrapper,
  StyledSpan,
  StyledWrapper
} from "./styles";

const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { zoom, rows, data, onTileClick },
  ref
) {
  const { handleScrollNext, handleScrollPrev, date, isLoading, cols, startDate, scrollToLoadData } =
    useCalendar();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const refRight = useRef<HTMLSpanElement>(null);
  const refLeft = useRef<HTMLSpanElement>(null);
  const lineCanvasRef = useRef<HTMLCanvasElement>(null);

  const theme = useTheme();

  const handleResize = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const width = getCanvasWidth();
      const height = rows * boxHeight + 1;
      resizeCanvas(ctx, width, height);
      drawGrid(ctx, zoom, rows, cols, startDate, theme);
    },
    [cols, startDate, rows, zoom, theme]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const onResize = () => handleResize(ctx);

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [handleResize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.letterSpacing = "1px";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    handleResize(ctx);
  }, [date, rows, zoom, handleResize]);

  useEffect(() => {
    if (!refRight.current || !scrollToLoadData) return;
    const observerRight = new IntersectionObserver(
      (e) => (e[0].isIntersecting ? handleScrollNext() : null),
      { root: document.getElementById(outsideWrapperId) }
    );
    observerRight.observe(refRight.current);

    return () => observerRight.disconnect();
  }, [handleScrollNext, scrollToLoadData]);

  useEffect(() => {
    if (!refLeft.current || !scrollToLoadData) return;
    const observerLeft = new IntersectionObserver(
      (e) => (e[0].isIntersecting ? handleScrollPrev() : null),
      {
        root: document.getElementById(outsideWrapperId),
        rootMargin: `0px 0px 0px -${leftColumnWidth}px`
      }
    );
    observerLeft.observe(refLeft.current);

    return () => observerLeft.disconnect();
  }, [handleScrollPrev, scrollToLoadData]);

  return (
    <StyledWrapper id={canvasWrapperId}>
      <StyledInnerWrapper ref={ref}>
        <StyledSpan position="left" ref={refLeft} />
        <Loader isLoading={isLoading} position="left" />
        <StyledCanvas ref={canvasRef} style={{ position: "relative", zIndex: 0 }} />
        {zoom === 2 && (
          <StyledCurrentHourLineCanvas
            className="current-hour-line"
            id={currentHourLineWrapperId}
            ref={lineCanvasRef}
          />
        )}
        <Tiles data={data} zoom={zoom} onTileClick={onTileClick} />
        <StyledSpan ref={refRight} position="right" />
        <Loader isLoading={isLoading} position="right" />
      </StyledInnerWrapper>
    </StyledWrapper>
  );
});

export default Grid;
