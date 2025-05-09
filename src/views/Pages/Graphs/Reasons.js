import React, { useState, useRef } from "react";
import {
  Table,
  useColorModeValue,
  Button,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { Element } from "react-scroll";

// Import your custom chart components and chart configs
import LineChart from "components/Charts/LineChart";
import BarChart from "components/Charts/BarChart";
import BubbleChart from "components/Charts/BubbleChart";
import DonutChart from "components/Charts/DonutChart";
import LineBarChart from "components/Charts/LineBarChart";
import PieChart from "components/Charts/PieChart";
import PolarChart from "components/Charts/PolarChart";
import RadarChart from "components/Charts/RadarChart";

import {
  lineChartDataCharts1,
  lineChartOptionsCharts1,
  lineChartDataCharts2,
  lineChartOptionsCharts2,
  barChartDataCharts1,
  barChartOptionsCharts1,
  barChartDataCharts2,
  barChartOptionsCharts2,
  lineBarChartData,
  lineBarChartOptions,
  bubbleChartData,
  bubbleChartOptions,
  donutChartDataCharts1,
  donutChartOptionsCharts1,
  pieChartDataCharts1,
  pieChartOptionsCharts1,
  radarChartDataCharts,
  radarChartOptionsCharts,
  polarChartDataCharts,
  polarChartOptionsCharts,
} from "variables/charts";

const RetentionRateGraphs = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );

  // State to store the user's selected graph type and whether to show the chart card
  const [selectedGraph, setSelectedGraph] = useState("");
  const [showChart, setShowChart] = useState(false);

  // Reference to the chart instance (requires your custom charts to forward refs)
  const chartRef = useRef(null);

  // Handle the "which Graph?" selection
  const handleGraphChange = (event) => {
    setSelectedGraph(event.target.value);
  };

  // Show the chart card when NEXT is clicked
  const handleNextClick = () => {
    setShowChart(true);
  };

  // Download chart as PNG
  const handleDownloadPNG = () => {
    if (!chartRef.current) return;
    // chartRef.current should be the Chart.js instance
    const chartInstance = chartRef.current;
    const base64Image = chartInstance.toBase64Image();
    // Create a temporary link to trigger the download
    const link = document.createElement("a");
    link.href = base64Image;
    link.download = "chart.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download chart data as CSV (simple example)
  const handleDownloadCSV = () => {
    if (!chartRef.current) return;
    const chartInstance = chartRef.current;
    const { labels, datasets } = chartInstance.data;
    // Build a simple CSV (Label, Value) for each dataset
    let csvContent = "data:text/csv;charset=utf-8,Label,Value\n";

    // If you have multiple datasets, you can enhance the logic to export them all
    datasets.forEach((dataset) => {
      dataset.data.forEach((value, index) => {
        csvContent += `${labels[index]},${value}\n`;
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "chart_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render the appropriate chart based on the user selection
  const renderChart = () => {
    switch (selectedGraph) {
      case "option1":
        return (
          <LineChart
            chartData={lineChartDataCharts1}
            chartOptions={lineChartOptionsCharts1}
            chartRef={chartRef}
          />
        );
      case "option2":
        return (
          <LineChart
            chartData={lineChartDataCharts2}
            chartOptions={lineChartOptionsCharts2}
            chartRef={chartRef}
          />
        );
      case "option3":
        return (
          <BarChart
            chartData={barChartDataCharts1}
            chartOptions={barChartOptionsCharts1}
            chartRef={chartRef}
          />
        );
      case "option4":
        return (
          <BarChart
            chartData={barChartDataCharts2}
            chartOptions={barChartOptionsCharts2}
            chartRef={chartRef}
          />
        );
      case "option5":
        return (
          <LineBarChart
            chartData={lineBarChartData}
            chartOptions={lineBarChartOptions}
            chartRef={chartRef}
          />
        );
      case "option6":
        return (
          <DonutChart
            chartData={donutChartDataCharts1}
            chartOptions={donutChartOptionsCharts1}
            chartRef={chartRef}
          />
        );
      case "option7":
        return (
          <PieChart
            chartData={pieChartDataCharts1}
            chartOptions={pieChartOptionsCharts1}
            chartRef={chartRef}
          />
        );
      case "option8":
        return (
          <RadarChart
            chartData={radarChartDataCharts}
            chartOptions={radarChartOptionsCharts}
            chartRef={chartRef}
          />
        );
      default:
        return null;
    }
  };

  // Dynamically update the chart title based on the selected graph
  const getChartTitle = () => {
    switch (selectedGraph) {
      case "option1":
        return "Line Chart";
      case "option2":
        return "Line Chart with Gradient";
      case "option3":
        return "Bar Chart";
      case "option4":
        return "Bar Chart Horizontal";
      case "option5":
        return "Mixed Chart";
      case "option6":
        return "Doughnut Chart";
      case "option7":
        return "Pie Chart";
      case "option8":
        return "Radar Chart";
      default:
        return "";
    }
  };

  return (
    <>
      {/* Main card with form controls */}
      <Card overflowX={{ sm: "scroll", lg: "hidden" }}>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Element id="info" name="info">
              <CardHeader mb="40px">
                <Text color={textColor} fontSize="lg" fontWeight="bold">
                  Reasons Graphs
                </Text>
              </CardHeader>
              <CardBody>
                <Stack direction="column" spacing="20px" w="100%">
                  <Stack
                    direction={{ sm: "column", lg: "row" }}
                    spacing={{ sm: "24px", lg: "30px" }}
                  >
                    {/* 1. Graphs For? */}
                    <FormControl flex="1">
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Graphs For?
                      </FormLabel>
                      <Select
                        borderRadius="15px"
                        placeholder="Choose a Category"
                        color="gray.400"
                        fontSize="xs"
                      >
                        <option value="option1">Company</option>
                        <option value="option2">Departments</option>
                        <option value="option3">Gender</option>
                      </Select>
                    </FormControl>

                    {/* 2. which Graph? */}
                    <FormControl flex="1">
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        which Graph?
                      </FormLabel>
                      <Select
                        borderRadius="15px"
                        placeholder="Choose a Graph"
                        color="gray.400"
                        fontSize="xs"
                        onChange={handleGraphChange}
                      >
                        <option value="option1">Line chart</option>
                        <option value="option2">Line chart with gradient</option>
                        <option value="option3">Bar chart</option>
                        <option value="option4">Bar chart horizontal</option>
                        <option value="option5">Mixed chart</option>
                        <option value="option6">Doughnut chart</option>
                        <option value="option7">Pie chart</option>
                        <option value="option8">Radar chart</option>
                      </Select>
                    </FormControl>

                    {/* 3. Which Period? */}
                    <FormControl flex="1">
                      <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                        Which Period?
                      </FormLabel>
                      <Select
                        borderRadius="15px"
                        placeholder="Choose a Period"
                        color="gray.400"
                        fontSize="xs"
                      >
                        <option value="option1">Last quarter</option>
                        <option value="option2">Last 2 quarters</option>
                        <option value="option3">Last year</option>
                        <option value="option4">All time</option>
                      </Select>
                    </FormControl>

                    {/* NEXT Button */}
                    <Button
                      variant="no-hover"
                      bg={bgButton}
                      w="150px"
                      h="35px"
                      alignSelf="flex-end"
                      onClick={handleNextClick}
                    >
                      <Text fontSize="xs" color="#fff" fontWeight="bold">
                        NEXT
                      </Text>
                    </Button>
                  </Stack>
                </Stack>
              </CardBody>
            </Element>
          </Table>
        </CardBody>
      </Card>

      {/* Conditionally render the chart card once NEXT is clicked */}
      {showChart && (
        <Card mt="20px">
          <CardHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px="22px"
          >
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              {getChartTitle()}
            </Text>

            {/* Download menu (Hamburger icon) */}
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
                size="sm"
              />
              <MenuList>
                {/* PNG download */}
                <MenuItem onClick={handleDownloadPNG}>Download PNG</MenuItem>

                {/* CSV download */}
                <MenuItem onClick={handleDownloadCSV}>Download CSV</MenuItem>

                
              </MenuList>
            </Menu>
          </CardHeader>

          <CardBody>
            {/* 
              Set a dynamic / responsive min height so the chart grows for larger screens. 
              You can adjust these values as needed.
            */}
            <Box w="100%" minH={{ base: "300px", md: "400px", xl: "500px" }}>
              {renderChart()}
            </Box>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default RetentionRateGraphs;