
import {
  Stat,
  StatHelpText,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";

const Steps = () => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card>
      <CardHeader mb="42px">
        <Text color="gray.400" fontSize="xs" fontWeight="normal">
          STEPS
        </Text>
      </CardHeader>
      <CardBody>
        <Stat>
          <StatNumber
            color={textColor}
            fontWeight="bold"
            fontSize="2xl"
            mb="6px"
          >
            11.4K
          </StatNumber>
          <StatHelpText
            bg="green.100"
            color="green"
            w="50px"
            borderRadius="12px"
            fontSize="sm"
            p="4px"
          >
            +4.3%
          </StatHelpText>
        </Stat>
      </CardBody>
    </Card>
  );
};

export default Steps;
