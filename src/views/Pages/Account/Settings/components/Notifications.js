import {
  Flex,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useState } from "react";
import { Element } from "react-scroll";

const Notifications = () => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card
      pb="0px"
      w={{ sm: "100%", lg: "70%" }}
      alignSelf="flex-end"
      justifySelf="flex-end"
    >
      <Element to="notifications" name="notifications">
        <CardHeader mb="40px">
          <Flex direction="column">
            <Text
              color={textColor}
              fontSize="lg"
              fontWeight="semibold"
              mb="4px"
            >
              Notifications
            </Text>
            <Text color="gray.400" fontWeight="normal" fontSize="sm">
              Choose how you receive notifications. These notification settings
              apply to the things you’re watching.
            </Text>
          </Flex>
        </CardHeader>
        <CardBody overflowX={{ sm: "scroll", lg: "hidden" }}>
          <Table>
            <Thead>
              <Tr>
                <Th
                  color="gray.400"
                  fontSize="md"
                  fontWeight="normal"
                  ps="0px"
                  textTransform="capitalise"
                >
                  Activity
                </Th>
                <Th
                  color="gray.400"
                  fontSize="md"
                  fontWeight="normal"
                  textTransform="capitalise"
                >
                  Email
                </Th>
                <Th
                  color="gray.400"
                  fontSize="md"
                  fontWeight="normal"
                  textTransform="capitalise"
                >
                  Push
                </Th>
                <Th
                  color="gray.400"
                  fontSize="md"
                  fontWeight="normal"
                  textTransform="capitalise"
                >
                  SMS
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td ps="0px" minW={{ sm: "300px" }}>
                  <Flex direction="column">
                    <Text
                      color={textColor}
                      fontWeight="normal"
                      fontSize="sm"
                      mb="4px"
                    >
                      Changes
                    </Text>
                    <Text color="gray.400" fontSize="xs" fontWeight="normal">
                      Notify when another user edit any thing (e.g. create a template or add employees)
                    </Text>
                  </Flex>
                </Td>
                <Td>
                  <Switch colorScheme="teal" />
                </Td>
                <Td>
                  <Switch defaultIsChecked colorScheme="teal" />
                </Td>
                <Td>
                  <Switch defaultIsChecked colorScheme="teal" />
                </Td>
              </Tr>
              <Tr>
                <Td ps="0px" minW={{ sm: "300px" }}>
                  <Flex direction="column">
                    <Text
                      color={textColor}
                      fontWeight="normal"
                      fontSize="sm"
                      mb="4px"
                    >
                      New Insights
                    </Text>
                    <Text color="gray.400" fontSize="xs" fontWeight="normal">
                      Notify when Adeeb generate new insights.
                    </Text>
                  </Flex>
                </Td>
                <Td>
                  <Switch defaultIsChecked colorScheme="teal" />
                </Td>
                <Td>
                  <Switch defaultIsChecked colorScheme="teal" />
                </Td>
                <Td>
                  <Switch colorScheme="teal" />
                </Td>
              </Tr>
              <Tr>
                <Td ps="0px" minW={{ sm: "300px" }}>
                  <Flex direction="column">
                    <Text
                      color={textColor}
                      fontWeight="normal"
                      fontSize="sm"
                      mb="4px"
                    >
                      New Graphs
                    </Text>
                    <Text color="gray.400" fontSize="xs" fontWeight="normal">
                      Notify when Adeeb generate new graphs.
                    </Text>
                  </Flex>
                </Td>
                <Td>
                  <Switch defaultIsChecked colorScheme="teal" />
                </Td>
                <Td>
                  <Switch colorScheme="teal" />
                </Td>
                <Td>
                  <Switch defaultIsChecked colorScheme="teal" />
                </Td>
              </Tr>
              <Tr>
                <Td ps="0px" minW={{ sm: "300px" }}>
                  <Flex direction="column">
                    <Text
                      color={textColor}
                      fontWeight="normal"
                      fontSize="sm"
                      mb="4px"
                    >
                      Updates
                    </Text>
                    <Text color="gray.400" fontSize="xs" fontWeight="normal">
                      Notify when there is a new update for Adeeb website.
                    </Text>
                  </Flex>
                </Td>
                <Td>
                  <Switch defaultIsChecked colorScheme="teal" />
                </Td>
                <Td>
                  <Switch colorScheme="teal" />
                </Td>
                <Td>
                  <Switch defaultIsChecked colorScheme="teal" />
                </Td>
              </Tr>
              <Tr>
                <Td border="none" ps="0px" py="24px" minW={{ sm: "300px" }}>
                  <Flex direction="column">
                    <Text
                      color={textColor}
                      fontWeight="normal"
                      fontSize="xs"
                      mb="4px"
                    >
                      Log in from a new device
                    </Text>
                  </Flex>
                </Td>
                <Td border="none">
                  <Switch colorScheme="teal" />
                </Td>
                <Td border="none">
                  <Switch defaultIsChecked colorScheme="teal" />
                </Td>
                <Td border="none">
                  <Switch colorScheme="teal" />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </CardBody>
      </Element>
    </Card>
  );
};

export default Notifications;
