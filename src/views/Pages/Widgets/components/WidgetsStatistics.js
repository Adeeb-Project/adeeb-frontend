
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import IconBox from "components/Icons/IconBox";
import React, { useState } from "react";

const WidgetsStatistics = ({ title, percentage, icon }) => {
  const iconBoxInside = useColorModeValue("white", "white");
  return (
    <Card bg="teal.300">
      <CardBody>
        <Flex justify="space-between" w="100%" align="center">
          <Flex direction="column">
            <Text fontSize="sm" color="#fff" fontWeight="normal" mb="2px">
              {title}
            </Text>
            <Text fontSize="lg" color="#fff" fontWeight="bold">
              {`${percentage}%`}
            </Text>
          </Flex>
          <IconBox as="box" h={"45px"} w={"45px"} bg={iconBoxInside}>
            {icon}
          </IconBox>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default WidgetsStatistics;
