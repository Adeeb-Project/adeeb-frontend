
import { Badge, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useState } from "react";

const FullBody = () => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card>
      <CardHeader mb="24px">
        <Flex justify="space-between" w="100%" align="center">
          <Text color={textColor} fontWeight="bold" fontSize="lg">
            Full Body
          </Text>
          <Badge
            colorScheme="red"
            w="85px"
            py="6px"
            borderRadius="12px"
            textAlign="center"
          >
            MODERATE
          </Badge>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text color="gray.400" fontWeight="normal" fontSize="sm">
          What matters is the people who are sparked by it. And the people who
          are liked.
        </Text>
      </CardBody>
    </Card>
  );
};

export default FullBody;
