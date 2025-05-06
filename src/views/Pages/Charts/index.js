/*!

=========================================================
* Purity UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.adeebcompany.com/product/purity-ui-dashboard-pro
* Copyright 2021 Creative Tim (https://www.adeebcompany.com/)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, Grid, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import BarChart from "components/Charts/BarChart";
import BubbleChart from "components/Charts/BubbleChart";
import DonutChart from "components/Charts/DonutChart";
import LineBarChart from "components/Charts/LineBarChart";
import LineChart from "components/Charts/LineChart";
import PieChart from "components/Charts/PieChart";
import PolarChart from "components/Charts/PolarChart";
import RadarChart from "components/Charts/RadarChart";
// Assets
import React from "react";
import {
  barChartDataCharts1,
  barChartDataCharts2,
  barChartOptionsCharts1,
  barChartOptionsCharts2,
  bubbleChartData,
  bubbleChartOptions,
  donutChartDataCharts1,
  donutChartOptionsCharts1,
  lineBarChartData,
  lineBarChartOptions,
  lineChartDataCharts1,
  lineChartDataCharts2,
  lineChartOptionsCharts1,
  lineChartOptionsCharts2,
  pieChartDataCharts1,
  pieChartOptionsCharts1,
  polarChartDataCharts,
  polarChartOptionsCharts,
  radarChartDataCharts,
  radarChartOptionsCharts,
} from "variables/charts";

// Import our employee metrics chart configurations
import {
  combinedLineChartOptions,
  turnoverLineChartOptions,
  retentionLineChartOptions,
  combinedBarChartOptions,
  currentStatusDonutOptions,
} from "variables/employeeMetricsCharts";

function Charts() {
  const textColor = useColorModeValue("gray.700", "white");

  // Example data - replace with actual API data
  const chartData = {
    quarterly: {
      turnover: [5.2, 4.8, 6.1, 5.5],
      retention: [94.8, 95.2, 93.9, 94.5],
    },
    yearly: {
      turnover: [5.4, 5.1, 4.9, 5.3],
      retention: [94.6, 94.9, 95.1, 94.7],
    },
    allTime: {
      turnover: [5.2, 5.4, 5.1, 4.9, 5.3, 5.0],
      retention: [94.8, 94.6, 94.9, 95.1, 94.7, 95.0],
    },
  };

  return (
    <Grid
      templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)" }}
      templateRows={{ sm: "repeat(8, 1fr)", md: "repeat(4, 1fr)" }}
      gap="24px"
      pt={{ sm: "125px", lg: "75px" }}
    >
      {/* Combined Line Chart */}
      <Card px="0px" pb="0px">
        <CardHeader mb="34px" px="22px">
          <Text color={textColor} fontSize="lg" fontWeight="bold">
            Combined Turnover & Retention
          </Text>
        </CardHeader>
        <CardBody h="100%">
          <Box w="100%" h="100%">
            <LineChart
              chartData={[
                {
                  name: "Turnover Rate",
                  data: chartData.quarterly.turnover,
                },
                {
                  name: "Retention Rate",
                  data: chartData.quarterly.retention,
                },
              ]}
              chartOptions={combinedLineChartOptions}
            />
          </Box>
        </CardBody>
      </Card>

      {/* Turnover Line Chart */}
      <Card px="0px" pb="0px">
        <CardHeader mb="34px" px="22px">
          <Text color={textColor} fontSize="lg" fontWeight="bold">
            Turnover Rate
          </Text>
        </CardHeader>
        <CardBody h="100%">
          <Box w="100%" h="100%">
            <LineChart
              chartData={[
                {
                  name: "Turnover Rate",
                  data: chartData.quarterly.turnover,
                },
              ]}
              chartOptions={turnoverLineChartOptions}
            />
          </Box>
        </CardBody>
      </Card>

      {/* Retention Line Chart */}
      <Card px="0px" pb="0px">
        <CardHeader mb="34px" px="22px">
          <Text color={textColor} fontSize="lg" fontWeight="bold">
            Retention Rate
          </Text>
        </CardHeader>
        <CardBody h="100%">
          <Box w="100%" h="100%">
            <LineChart
              chartData={[
                {
                  name: "Retention Rate",
                  data: chartData.quarterly.retention,
                },
              ]}
              chartOptions={retentionLineChartOptions}
            />
          </Box>
        </CardBody>
      </Card>

      {/* Bar Chart */}
      <Card px="0px" pb="0px">
        <CardHeader mb="34px" px="22px">
          <Text color={textColor} fontSize="lg" fontWeight="bold">
            Turnover & Retention Comparison
          </Text>
        </CardHeader>
        <CardBody h="100%">
          <Box w="100%" h="100%">
            <BarChart
              chartData={[
                {
                  name: "Turnover Rate",
                  data: chartData.quarterly.turnover,
                },
                {
                  name: "Retention Rate",
                  data: chartData.quarterly.retention,
                },
              ]}
              chartOptions={combinedBarChartOptions}
            />
          </Box>
        </CardBody>
      </Card>

      {/* Donut Chart */}
      <Card px="0px" pb="0px">
        <CardHeader mb="34px" px="22px">
          <Text color={textColor} fontSize="lg" fontWeight="bold">
            Current Status
          </Text>
        </CardHeader>
        <CardBody h="100%">
          <Box w="100%" minH={{ sm: "200px", lg: "300px" }}>
            <DonutChart
              chartData={[
                chartData.quarterly.turnover[chartData.quarterly.turnover.length - 1],
                chartData.quarterly.retention[chartData.quarterly.retention.length - 1],
              ]}
              chartOptions={currentStatusDonutOptions}
            />
          </Box>
        </CardBody>
      </Card>
    </Grid>
  );
}

export default Charts;
