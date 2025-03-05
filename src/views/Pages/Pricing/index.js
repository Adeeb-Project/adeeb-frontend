//Land Page

import {
  Box,
  Button,
  Flex,
  Icon,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import basic from "assets/img/basic-auth.png";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function Pricing() {

  const textColor = useColorModeValue("gray.700", "white");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const bgActiveButton = useColorModeValue("#fff", "gray.700");
  const bgButtonGroup = useColorModeValue("gray.50", "gray.600");
  const bgTimesIcon = useColorModeValue("gray.700", "gray.500");

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: "70vh", xl: "50vh" }}
        w={{ sm: "calc(100vw - 25px)", md: "calc(100vw - 25px)" }}
        borderRadius={{ sm: "15px" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={basic}
        bgSize="cover"
        mx={{ sm: "auto" }}
        mt={{ sm: "14px" }}
      ></Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="6.5rem"
        mb="38px"
      >
        <Text 
        fontSize="3xl" 
        color="white" 
        fontWeight="bold"
        >
          Welcome to Adeeb
        </Text>
       
        
        <Stack
          direction={{ sm: "column", lg: "row" }}
          spacing="20px"
          mt="50px"
          mb="80px"
        >
          <Card
            boxShadow={"0px 2px 5.5px rgba(0, 0, 0, 0.1)"}
            w={{ sm: "300px", md: "650px", lg: "300px" }}
          >
            <CardHeader mb="30px">
              <Flex direction="column" w="100%" align="center">
                <Tag size="sm">Basic</Tag>
                <Text color={textColor} fontSize="5xl" fontWeight="bold">
                  $299
                </Text>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex direction="column" w="100%">
                <Stack direction="column" spacing="16px" w="100%" mb="35px">
                  <Flex align="center">
                    <Icon
                      w="20px"
                      h="20px"
                      as={FaCheckCircle}
                      mr="8px"
                      color="teal.300"
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="md">
                      2 Team Members
                    </Text>
                  </Flex>
                  <Flex align="center">
                    <Icon
                      w="20px"
                      h="20px"
                      as={FaCheckCircle}
                      mr="8px"
                      color="teal.300"
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="md">
                      Generate Graphs
                    </Text>
                  </Flex>
                  <Flex align="center">
                    <Icon
                      w="20px"
                      h="20px"
                      as={FaCheckCircle}
                      mr="8px"
                      color="teal.300"
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="md">
                      Generate Insights
                    </Text>
                  </Flex>
                  <Flex align="center">
                  <Icon
                      w="20px"
                      h="20px"
                      as={FaCheckCircle}
                      mr="8px"
                      color="teal.300"
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="md">
                      Generate Report
                    </Text>
                  </Flex>
                  <Flex align="center">
                    <Icon
                      w="20px"
                      h="20px"
                      as={FaTimesCircle}
                      mr="8px"
                      color={bgTimesIcon}
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="md">
                      Customize Template
                    </Text>
                  </Flex>
                  <Flex align="center">
                    <Icon
                      w="20px"
                      h="20px"
                      as={FaTimesCircle}
                      mr="8px"
                      color={bgTimesIcon}
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="md">
                      Adeeb Ai Suggestions
                    </Text>
                  </Flex>
                </Stack>
                <Button
                  variant="no-hover"
                  fontSize="xs"
                  bg={bgButton}
                  color="#fff"
                >
                  JOIN NOW
                </Button>
              </Flex>
            </CardBody>
          </Card>
      
          <Card
            boxShadow={"0px 2px 5.5px rgba(0, 0, 0, 0.1)"}
            w={{ sm: "300px", md: "650px", lg: "300px" }}
          >
            <CardHeader mb="30px">
              <Flex direction="column" w="100%" align="center">
                <Tag size="sm">Premium</Tag>
                <Text color={textColor} fontSize="5xl" fontWeight="bold">
                  $599
                </Text>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex direction="column" w="100%">
                <Stack direction="column" spacing="16px" w="100%" mb="35px">
                  <Flex align="center">
                    <Icon
                      w="20px"
                      h="20px"
                      as={FaCheckCircle}
                      mr="8px"
                      color="teal.300"
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="md">
                      +5 Team Members
                    </Text>
                  </Flex>
                  <Flex align="center">
                    <Icon
                      w="20px"
                      h="20px"
                      as={FaCheckCircle}
                      mr="8px"
                      color="teal.300"
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="md">
                      Generate Graphs
                    </Text>
                  </Flex>
                  <Flex align="center">
                    <Icon
                      w="20px"
                      h="20px"
                      as={FaCheckCircle}
                      mr="8px"
                      color="teal.300"
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="md">
                      Generate Insights
                    </Text>
                  </Flex>
                  <Flex align="center">
                  <Icon
                      w="20px"
                      h="20px"
                      as={FaCheckCircle}
                      mr="8px"
                      color="teal.300"
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="md">
                      Generate Report
                    </Text>
                  </Flex>
                  <Flex align="center">
                    <Icon
                      w="20px"
                      h="20px"
                      as={FaCheckCircle}
                      mr="8px"
                      color="teal.300"
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="md">
                      Customize Template
                    </Text>
                  </Flex>
                  <Flex align="center">
                    <Icon
                      w="20px"
                      h="20px"
                      as={FaCheckCircle}
                      mr="8px"
                      color="teal.300"
                    />
                    <Text color="gray.500" fontWeight="normal" fontSize="md">
                      Adeeb Ai Suggestions
                    </Text>
                  </Flex>
                </Stack>
                <Button
                  variant="no-hover"
                  fontSize="xs"
                  bg={bgButton}
                  color="#fff"
                >
                  JOIN NOW
                </Button>
              </Flex>
            </CardBody>
          </Card>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default Pricing;
