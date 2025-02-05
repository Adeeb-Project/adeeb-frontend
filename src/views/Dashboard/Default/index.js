/*!

=========================================================
* Purity UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
    Box,
    Flex,
    Grid, SimpleGrid, Stack, Text, useColorModeValue
} from "@chakra-ui/react";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import Globe from "components/Globe/Globe";
// Custom icons
import {
    CartIcon,
    DocumentIcon,
    GlobeIcon, WalletIcon
} from "components/Icons/Icons.js";
import React from "react";
import {
    barChartDataDefault,
    barChartOptionsDefault,
    lineChartDataDefault,
    lineChartOptionsDefault
} from "variables/charts";
import { salesData } from "variables/general";
import ActiveUsers from "./components/ActiveUsers";
import MiniStatistics from "./components/MiniStatistics";
import SalesByCountry from "./components/SalesByCountry";
import SalesOverview from "./components/SalesOverview";


export default function Default() {
  // Chakra Color Mode
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Text
        color={textColor}
        fontWeight="bold"
        fontSize="3xl"
        mb="30px"
        ps="20px"
      >
      Exit Interviews insights
      </Text>
      <Grid
        templateColumns={{ sm: "4fr 1fr", xl: "1.2fr 1fr" }}
        gap="32px"
        maxW="100%"
        w="100%"
      >
        <Box
          minW="700px"
          h="700px"
          position="absolute"
          right="30px"
          top="14%"
          display={{ sm: "none", md: "block" }}
        >
          <Globe />
        </Box>
        <Stack
          direction="column"
          spacing="24px"
          w="100%"
          mb="24px"
          maxW={{ sm: "315px", md: "100%" }}
          zIndex="0"
        >
          <SimpleGrid columns={{ sm: "1", md: "2" }} spacing="24px">
            <MiniStatistics
              title={"Response Rate"}
              amount={"1,200"}
              percentage={55}
              icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
            />
            <MiniStatistics
              title={"Top Reason"}
              amount={"Career growth"}
              percentage={14}
              icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
            />
            <MiniStatistics
              title={"Retention Trend"}
              amount={"82%"}
              percentage={5}
              icon={
                <DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              }
            />
            <MiniStatistics
              title={"Average Tenure"}
              amount={"2.5 years"}
              percentage={2}
              icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
            />
          </SimpleGrid>
          <SalesByCountry
            title={"Top Reasons for leaving"}
            labels={["Reason", "Occurance", "Imact", "Rate"]}
            salesData={salesData}
          />
        </Stack>
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        gap="24px"
        mb={{ lg: "26px" }}
      >
        <ActiveUsers
          title={"Participation Rate"}
          percentage={23}
          chart={
            <BarChart
              chartData={barChartDataDefault}
              chartOptions={barChartOptionsDefault}
            />
          }
        />
        <SalesOverview
          title={"Exit Feedbacks trends"}
          percentage={5}
          chart={
            <LineChart
              chartData={lineChartDataDefault}
              chartOptions={lineChartOptionsDefault}
            />
          }
        />
      </Grid>
    </Flex>
  );
}
