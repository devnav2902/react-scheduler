import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { SchedulerData, SchedulerProjectData } from "@/types/global";
import { ParsedDatesRange } from "@/utils/getDatesRange";

const secondsInWorkDay = 28800;

export const mockedOnRangeChange = (range: ParsedDatesRange, data: SchedulerData) => {
  console.log("Mocked on range change has been triggered. New range: ", range, data);
};

const getRandomWords = (amount?: number) =>
  amount ? faker.random.words(amount) : faker.random.word();

const getRandomDates = (): { startDate: Date; endDate: Date } => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  // Define start and end range
  const startRange = new Date(year, month, day - 1, 22, 0, 0); // Yesterday 22:00:00
  const endRange = new Date(year, month, day + 1, 2, 0, 0); // Tomorrow 02:00:00

  // Random start time within the range
  const randomStartTime = new Date(
    startRange.getTime() + Math.random() * (endRange.getTime() - startRange.getTime())
  );

  // Random duration: 1–3 hours in milliseconds
  const durationMs = (1 + Math.floor(Math.random() * 3)) * 60 * 60 * 1000;

  // Calculate endDate and clamp if it exceeds endRange
  let endDate = new Date(randomStartTime.getTime() + durationMs);
  if (endDate > endRange) {
    endDate = endRange;
  }

  return { startDate: randomStartTime, endDate };
};

export const generateProjects = (
  years: number,
  maxProjectsPerYear: number,
  amountOfDscWords = 5,
  title: string
): SchedulerProjectData[] => {
  const startYear = dayjs()
    .subtract(Math.floor(years / 2), "years")
    .get("year");

  const endYear = dayjs()
    .add(Math.floor(years / 2), "years")
    .get("year");

  const data = [];
  const bgColor = `rgb(${Math.ceil(Math.random() * 255)},${Math.ceil(
    Math.random() * 200
  )},${Math.ceil(Math.random() * 200)})`;

  for (let yearIndex = startYear; yearIndex <= endYear; yearIndex++) {
    const projectsPerYear = Math.ceil(Math.random() * maxProjectsPerYear);

    for (let projectIndex = 0; projectIndex < projectsPerYear; projectIndex++) {
      const { startDate, endDate } = getRandomDates();
      data.push({
        id: faker.datatype.uuid(),
        startDate,
        endDate,
        occupancy: Math.ceil(Math.random() * secondsInWorkDay),
        title,
        subtitle: getRandomWords(),
        description: getRandomWords(amountOfDscWords),
        bgColor
      });
    }
  }
  return data;
};

export const createMockData = (
  amountOfPeople: number,
  years: number,
  maxProjectsPerYear: number,
  amountOfDscWords = 5
): SchedulerData => {
  const schedulerData: SchedulerData = [];
  for (let i = 0; i < amountOfPeople; i++) {
    const title = getRandomWords(2);
    const data: SchedulerProjectData[] = generateProjects(
      years,
      maxProjectsPerYear,
      amountOfDscWords,
      title
    );

    const item = {
      id: faker.datatype.uuid(),
      label: {
        icon: "https://picsum.photos/24",
        title,
        subtitle: getRandomWords()
      },
      data
    };
    schedulerData.push(item);
  }
  return schedulerData;
};
