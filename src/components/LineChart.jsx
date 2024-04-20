import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const criminalData = [
  {
    id: "Maharashtra",
    color: tokens("dark").greenAccent[500],
    data: [
      { x: "murder", y: 101 },
      { x: "robbery", y: 75 },
      { x: "assault", y: 36 },
      { x: "theft", y: 216 },
      { x: "homicide", y: 35 },
      { x: "burglary", y: 236 },
      { x: "fraud", y: 88 },
      { x: "forgery", y: 232 },
      { x: "drug_offense", y: 281 },
      { x: "vandalism", y: 1 },
      { x: "others", y: 35 },
      { x: "unknown", y: 14 },
    ],
  },
  {
    id: "Uttar Pradesh",
    color: tokens("dark").blueAccent[300],
    data: [
      { x: "murder", y: 212 },
      { x: "robbery", y: 190 },
      { x: "assault", y: 270 },
      { x: "theft", y: 9 },
      { x: "homicide", y: 75 },
      { x: "burglary", y: 175 },
      { x: "fraud", y: 33 },
      { x: "forgery", y: 189 },
      { x: "drug_offense", y: 97 },
      { x: "vandalism", y: 87 },
      { x: "others", y: 299 },
      { x: "unknown", y: 251 },
    ],
  },
  {
    id: "Bihar",
    color: tokens("dark").redAccent[200],
    data: [
      { x: "murder", y: 191 },
      { x: "robbery", y: 136 },
      { x: "assault", y: 91 },
      { x: "theft", y: 190 },
      { x: "homicide", y: 211 },
      { x: "burglary", y: 152 },
      { x: "fraud", y: 189 },
      { x: "forgery", y: 152 },
      { x: "drug_offense", y: 8 },
      { x: "vandalism", y: 197 },
      { x: "others", y: 107 },
      { x: "unknown", y: 170 },
    ],
  },
];

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveLine
      data={criminalData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Type of Crime",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
