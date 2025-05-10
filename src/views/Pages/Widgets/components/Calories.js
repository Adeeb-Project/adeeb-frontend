
import {
  Box,
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import LineChart from "components/Charts/LineChart";
import React from "react";
import {
  lineChartDataWidgets3,
  lineChartOptionsWidgets3,
} from "variables/charts";

const Calories = () => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card px="0px" pb="0px" gridColumn={{ md: "1 / 3", lg: "auto" }}>
      <CardHeader px="22px">
        <Stat me="auto">
          <StatLabel fontSize="xs" color="gray.400" fontWeight="normal">
            Calories
          </StatLabel>
          <Flex>
            <StatNumber fontSize="lg" color={textColor}>
              187
            </StatNumber>
            <StatHelpText
              alignSelf="flex-end"
              justifySelf="flex-end"
              m="0px"
              ps="4px"
              color="green.400"
              fontWeight="bold"
              fontSize="sm"
            >
              +5%
            </StatHelpText>
          </Flex>
        </Stat>
      </CardHeader>
      <CardBody>
        <Box w="100%" maxH="100px">
          <LineChart
            chartData={lineChartDataWidgets3}
            chartOptions={lineChartOptionsWidgets3}
          />
        </Box>
      </CardBody>
    </Card>
  );
};

export default Calories;
