
import { Flex, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// Custom icons
import {
  CartIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React from "react";
import ChartStatistics from "./ChartStatistics";

const ActiveUsers = ({ title, percentage, chart }) => {
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card p="16px">
      <CardBody>
        <Flex direction="column" w="100%">
          <Card
            py="1rem"
            height={{ sm: "200px" }}
            width="100%"
            bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
            position="relative"
          >
            {chart}
          </Card>
          <Flex direction="column" mt="24px" mb="36px" alignSelf="flex-start">
            <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
              {title}
            </Text>
            <Text fontSize="md" fontWeight="medium" color="gray.400">
              <Text
                as="span"
                color={percentage > 0 ? "green.400" : "red.400"}
                fontWeight="bold"
              >
                {percentage > 0 ? `+${percentage}%` : `-${percentage}%`}
              </Text>{" "}
              than last week
            </Text>
          </Flex>

        {/* Participation Rate admin/dashboard/default */}

          <SimpleGrid gap={{ sm: "25px" }} columns={4}  >
            <ChartStatistics
              title={"Employees"}
              amount={"384"}
              percentage={65}
              icon={<WalletIcon  h={"15px"} w={"40px"} color={iconBoxInside } />}
            />
            <ChartStatistics
              title={"Surveys"}
              amount={"450"}
              percentage={80}
              icon={<RocketIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
          </SimpleGrid>
        </Flex>
        
        {/* Add a Pie chart here */}

      </CardBody>
    </Card>
  );
};

export default ActiveUsers;
