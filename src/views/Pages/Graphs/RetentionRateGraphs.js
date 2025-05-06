// RetentionRateGraphs.js
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
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import LineChart from "components/Charts/LineChart";

import {
  combinedLineChartOptions,
  turnoverLineChartOptions,
  retentionLineChartOptions,
} from "variables/employeeMetricsCharts";

const RetentionRateGraphs = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );

  const [selectedGraph, setSelectedGraph] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [chartResponse, setChartResponse] = useState({
    labels: [],
    data: { turnover: [], retention: [] },
    currentStatus: { turnover: 0, retention: 0 },
    lastUpdated: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const chartRef = useRef(null);
  const token = localStorage.getItem("authToken");
  const headers = { headers: { Authorization: `${token}` } };

  const handleGraphChange = (e) => setSelectedGraph(e.target.value);
  const handlePeriodChange = (e) => setSelectedPeriod(e.target.value);

  const handleNextClick = async () => {
    if (!selectedGraph || !selectedPeriod) return;
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5347/api/companies/charts?period=${selectedPeriod}&graphType=${selectedGraph}`,
        headers
      );
      setChartResponse(res.data);
      setShowChart(true);
    } catch (err) {
      console.error("Failed to load chart data", err);
    } finally {
      setIsLoading(false);
    }
  };


  const renderChart = () => {
    const { labels, data, currentStatus } = chartResponse;
    let chartData;
    let chartOptions;

    switch (selectedGraph) {
      case "combined":
        chartData = [
          { name: "Turnover Rate", data: data.turnover },
          { name: "Retention Rate", data: data.retention },
        ];
        chartOptions = {
          ...combinedLineChartOptions,
          xaxis: {
            ...combinedLineChartOptions.xaxis,
            categories: labels,
          },
        };
        return <LineChart chartData={chartData} chartOptions={chartOptions} chartRef={chartRef} />;
      case "turnover":
        chartData = [{ name: "Turnover Rate", data: data.turnover }];
        chartOptions = {
          ...turnoverLineChartOptions,
          xaxis: { ...turnoverLineChartOptions.xaxis, categories: labels },
        };
        return <LineChart chartData={chartData} chartOptions={chartOptions} chartRef={chartRef} />;
      case "retention":
        chartData = [{ name: "Retention Rate", data: data.retention }];
        chartOptions = {
          ...retentionLineChartOptions,
          xaxis: { ...retentionLineChartOptions.xaxis, categories: labels },
        };
        return <LineChart chartData={chartData} chartOptions={chartOptions} chartRef={chartRef} />;
      default:
        return null;
    }
  };

  const getChartTitle = () => {
    const periodMap = { quarterly: "Quarterly", yearly: "Yearly"};
    const graphMap = {
      combined: "Combined",
      turnover: "Turnover",
      retention: "Retention",

    };
    return `${graphMap[selectedGraph] || ""} Chart - ${periodMap[selectedPeriod] || ""}`;
  };

  return (
    <>
      <Card overflowX={{ sm: "scroll", lg: "hidden" }}>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <CardHeader mb="40px">
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                Retention Rate Graphs
              </Text>
            </CardHeader>
            <CardBody>
              <Stack direction="column" spacing="20px" w="100%">
                <Stack direction={{ sm: "column", lg: "row" }} spacing={{ sm: "24px", lg: "30px" }}>
                  <FormControl flex="1">
                    <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                      Which Graph?
                    </FormLabel>
                    <Select
                      borderRadius="15px"
                      placeholder="Choose a Graph"
                      color="gray.400"
                      fontSize="xs"
                      onChange={handleGraphChange}
                      isDisabled={isLoading}
                    >
                      <option value="combined">Combined Line Chart</option>
                      <option value="turnover">Turnover Line Chart</option>
                      <option value="retention">Retention Line Chart</option>

                    </Select>
                  </FormControl>
                  <FormControl flex="1">
                    <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                      Which Period?
                    </FormLabel>
                    <Select
                      borderRadius="15px"
                      placeholder="Choose a Period"
                      color="gray.400"
                      fontSize="xs"
                      onChange={handlePeriodChange}
                      isDisabled={isLoading}
                    >
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                    </Select>
                  </FormControl>
                  <Button
                    variant="no-hover"
                    bg={bgButton}
                    w="150px"
                    h="35px"
                    alignSelf="flex-end"
                    onClick={handleNextClick}
                    isLoading={isLoading}
                    isDisabled={!selectedGraph || !selectedPeriod}
                  >
                    <Text fontSize="xs" color="#fff" fontWeight="bold">
                      NEXT
                    </Text>
                  </Button>
                </Stack>
              </Stack>
            </CardBody>
          </Table>
        </CardBody>
      </Card>

      {isLoading && (
        <Box textAlign="center" p={10}>
          <Spinner size="xl" />
        </Box>
      )}

      {showChart && !isLoading && (
        <Card mt="20px">
          <CardHeader display="flex" justifyContent="space-between" alignItems="center" px="22px">
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              {getChartTitle()}
            </Text>
          </CardHeader>
          <CardBody>
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
