/*!
=========================================================
* Purity UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard-pro
* Copyright 2021 Creative Tim
* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import avatar4 from "assets/img/avatars/avatar4.png";

// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import IconBox from "components/Icons/IconBox";

import { MdModeEdit } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";
import React, { useRef, useState } from "react";

function EmployeeWizard() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgPrevButton = useColorModeValue("gray.100", "gray.100");

  // Using three steps: Personal, Job, Address
  const [activeBullets, setActiveBullets] = useState({
    personal: true,
    job: false,
    address: false,
  });

  const personalTab = useRef();
  const jobTab = useRef();
  const addressTab = useRef();

  return (
    <Flex
      direction="column"
      minH="100vh"
      align="center"
      pt={{ sm: "125px", lg: "75px" }}
    >
      <Flex direction="column" textAlign="center" mb={{ sm: "25px", md: "45px" }}>
        <Text
          color={textColor}
          fontSize={{ sm: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="bold"
          mb="8px"
        >
          Create New Employee
        </Text>
        <Text color="gray.400" fontWeight="normal" fontSize={{ sm: "sm", md: "lg" }}>
          Please fill out the details below to add a new employee.
        </Text>
      </Flex>
      <Tabs variant="unstyled" mt="24px" display="flex" flexDirection="column">
        <TabList
          display="flex"
          align="center"
          alignSelf="center"
          justifySelf="center"
        >
          {/* Personal Tab */}
          <Tab
            ref={personalTab}
            _focus="none"
            w={{ sm: "120px", md: "250px", lg: "300px" }}
            onClick={() =>
              setActiveBullets({
                personal: true,
                job: false,
                address: false,
              })
            }
          >
            <Flex
              direction="column"
              justify="center"
              align="center"
              position="relative"
              _before={{
                content: "''",
                width: { sm: "120px", md: "250px", lg: "300px" },
                height: "3px",
                bg: activeBullets.job ? textColor : "gray.200",
                left: { sm: "12px", md: "26px" },
                top: { sm: activeBullets.personal ? "6px" : "4px" },
                position: "absolute",
                bottom: activeBullets.personal ? "40px" : "38px",
                zIndex: -1,
                transition: "all .3s ease",
              }}
            >
              <Icon
                as={BsCircleFill}
                color={activeBullets.personal ? textColor : "gray.300"}
                w={activeBullets.personal ? "16px" : "12px"}
                h={activeBullets.personal ? "16px" : "12px"}
                mb="8px"
              />
              <Text
                color={activeBullets.personal ? textColor : "gray.300"}
                fontWeight={activeBullets.personal ? "bold" : "normal"}
                display={{ sm: "none", md: "block" }}
                fontSize="sm"
              >
                Personal
              </Text>
            </Flex>
          </Tab>
          {/* Job Tab */}
          <Tab
            ref={jobTab}
            _focus="none"
            w={{ sm: "120px", md: "250px", lg: "300px" }}
            onClick={() =>
              setActiveBullets({
                personal: true,
                job: true,
                address: false,
              })
            }
          >
            <Flex
              direction="column"
              justify="center"
              align="center"
              position="relative"
              _before={{
                content: "''",
                width: { sm: "120px", md: "250px", lg: "300px" },
                height: "3px",
                bg: activeBullets.address ? textColor : "gray.200",
                left: { sm: "12px", md: "28px" },
                top: { sm: activeBullets.job ? "6px" : "4px" },
                position: "absolute",
                bottom: activeBullets.job ? "40px" : "38px",
                zIndex: -1,
                transition: "all .3s ease",
              }}
            >
              <Icon
                as={BsCircleFill}
                color={activeBullets.job ? textColor : "gray.300"}
                w={activeBullets.job ? "16px" : "12px"}
                h={activeBullets.job ? "16px" : "12px"}
                mb="8px"
              />
              <Text
                color={activeBullets.job ? textColor : "gray.300"}
                fontWeight={activeBullets.job ? "bold" : "normal"}
                fontSize="sm"
                display={{ sm: "none", md: "block" }}
              >
                Job
              </Text>
            </Flex>
          </Tab>
          {/* Address Tab */}
          <Tab
            ref={addressTab}
            _focus="none"
            w={{ sm: "120px", md: "250px", lg: "300px" }}
            onClick={() =>
              setActiveBullets({
                personal: true,
                job: true,
                address: true,
              })
            }
          >
            <Flex
              direction="column"
              justify="center"
              align="center"
              position="relative"
              _before={{
                content: "''",
                width: { sm: "120px", md: "250px", lg: "300px" },
                height: "3px",
                left: { sm: "12px", md: "32px" },
                top: { sm: activeBullets.address ? "6px" : "4px" },
                position: "absolute",
                bottom: activeBullets.address ? "40px" : "38px",
                zIndex: -1,
                transition: "all .3s ease",
              }}
            >
              <Icon
                as={BsCircleFill}
                color={activeBullets.address ? textColor : "gray.300"}
                w={activeBullets.address ? "16px" : "12px"}
                h={activeBullets.address ? "16px" : "12px"}
                mb="8px"
              />
              <Text
                color={activeBullets.address ? textColor : "gray.300"}
                fontWeight={activeBullets.address ? "bold" : "normal"}
                fontSize="sm"
                display={{ sm: "none", md: "block" }}
              >
                Address
              </Text>
            </Flex>
          </Tab>
        </TabList>
        <TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto">
          {/* Personal Information TabPanel */}
          <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
            <Card>
              <CardHeader mb="40px">
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  textAlign="center"
                  w="80%"
                  mx="auto"
                >
                  <Text
                    color={textColor}
                    fontSize="lg"
                    fontWeight="bold"
                    mb="4px"
                  >
                    Enter Personal Information
                  </Text>
                  <Text color="gray.400" fontWeight="normal" fontSize="sm">
                    Provide the employee's personal details.
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>
                <Flex direction="column" w="100%">
                  <Flex
                    direction={{ sm: "column", md: "row" }}
                    w="100%"
                    mb="24px"
                  >
                    <Box
                      position="relative"
                      minW={{ sm: "110px", xl: "150px" }}
                      h={{ sm: "110px", xl: "150px" }}
                      mx={{ sm: "auto", md: "40px", xl: "85px" }}
                      mb={{ sm: "25px" }}
                    >
                      <Avatar
                        src={avatar4}
                        w="100%"
                        h="100%"
                        borderRadius="12px"
                      />
                      <IconBox
                        bg="#fff"
                        h="35px"
                        w="35px"
                        boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.06)"
                        position="absolute"
                        right="-10px"
                        bottom="-10px"
                        cursor="pointer"
                      >
                        <Icon as={MdModeEdit} w="15px" h="15px" color="#333" />
                      </IconBox>
                    </Box>
                    <Stack direction="column" spacing="20px" w="100%">
                      <FormControl>
                        <FormLabel
                          color={textColor}
                          fontSize="xs"
                          fontWeight="bold"
                        >
                          First Name
                        </FormLabel>
                        <Input
                          borderRadius="15px"
                          placeholder="e.g., John"
                          fontSize="xs"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          color={textColor}
                          fontSize="xs"
                          fontWeight="bold"
                        >
                          Last Name
                        </FormLabel>
                        <Input
                          borderRadius="15px"
                          placeholder="e.g., Doe"
                          fontSize="xs"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          color={textColor}
                          fontSize="xs"
                          fontWeight="bold"
                        >
                          Email Address
                        </FormLabel>
                        <Input
                          borderRadius="15px"
                          placeholder="e.g., john.doe@example.com"
                          fontSize="xs"
                        />
                      </FormControl>
                    </Stack>
                  </Flex>
                  <Button
                    variant="no-hover"
                    bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                    alignSelf="flex-end"
                    mt="24px"
                    w={{ sm: "75px", lg: "100px" }}
                    h="35px"
                    onClick={() => jobTab.current.click()}
                  >
                    <Text fontSize="xs" color="#fff" fontWeight="bold">
                      NEXT
                    </Text>
                  </Button>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
          {/* Job Information TabPanel */}
          <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
            <Card>
              <CardHeader mb="40px">
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  textAlign="center"
                  w="80%"
                  mx="auto"
                >
                  <Text
                    color={textColor}
                    fontSize="lg"
                    fontWeight="bold"
                    mb="4px"
                  >
                    Enter Job Details
                  </Text>
                  <Text color="gray.400" fontWeight="normal" fontSize="sm">
                    Provide the employee's job information.
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>
                <Flex direction="column" w="100%">
                  <Stack direction="column" spacing="20px" mb="24px">
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        Position
                      </FormLabel>
                      <Input
                        borderRadius="15px"
                        placeholder="e.g., Software Engineer"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        Department
                      </FormLabel>
                      <Input
                        borderRadius="15px"
                        placeholder="e.g., Development"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        Employee ID
                      </FormLabel>
                      <Input
                        borderRadius="15px"
                        placeholder="e.g., EMP12345"
                        fontSize="xs"
                      />
                    </FormControl>
                  </Stack>
                  <Flex justify="space-between">
                    <Button
                      variant="no-hover"
                      bg={bgPrevButton}
                      alignSelf="flex-end"
                      mt="24px"
                      w={{ sm: "75px", lg: "100px" }}
                      h="35px"
                      onClick={() => personalTab.current.click()}
                    >
                      <Text fontSize="xs" color="gray.700" fontWeight="bold">
                        PREV
                      </Text>
                    </Button>
                    <Button
                      variant="no-hover"
                      bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                      alignSelf="flex-end"
                      mt="24px"
                      w={{ sm: "75px", lg: "100px" }}
                      h="35px"
                      onClick={() => addressTab.current.click()}
                    >
                      <Text fontSize="xs" color="#fff" fontWeight="bold">
                        NEXT
                      </Text>
                    </Button>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
          {/* Address Information TabPanel */}
          <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
            <Card>
              <CardHeader mb="40px">
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  textAlign="center"
                  w="80%"
                  mx="auto"
                >
                  <Text
                    color={textColor}
                    fontSize="lg"
                    fontWeight="bold"
                    mb="4px"
                  >
                    Enter Address Information
                  </Text>
                  <Text color="gray.400" fontWeight="normal" fontSize="sm">
                    Provide the employee's address details.
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>
                <Flex direction="column" w="100%">
                  <Stack direction="column" spacing="20px">
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Address 1
                      </FormLabel>
                      <Input
                        borderRadius="15px"
                        placeholder="e.g., 123 Main St"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Address 2
                      </FormLabel>
                      <Input
                        borderRadius="15px"
                        placeholder="e.g., Apt 4B"
                        fontSize="xs"
                      />
                    </FormControl>
                    <Grid
                      templateColumns={{ sm: "1fr 1fr", lg: "2fr 1fr 1fr" }}
                      gap="30px"
                    >
                      <FormControl gridColumn={{ sm: "1 / 3", lg: "auto" }}>
                        <FormLabel
                          color={textColor}
                          fontWeight="bold"
                          fontSize="xs"
                        >
                          City
                        </FormLabel>
                        <Input
                          borderRadius="15px"
                          placeholder="e.g., New York"
                          fontSize="xs"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          color={textColor}
                          fontWeight="bold"
                          fontSize="xs"
                        >
                          State
                        </FormLabel>
                        <Input
                          borderRadius="15px"
                          placeholder="e.g., NY"
                          fontSize="xs"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          color={textColor}
                          fontWeight="bold"
                          fontSize="xs"
                        >
                          ZIP
                        </FormLabel>
                        <Input
                          borderRadius="15px"
                          placeholder="e.g., 10001"
                          fontSize="xs"
                        />
                      </FormControl>
                    </Grid>
                  </Stack>
                  <Flex justify="space-between">
                    <Button
                      variant="no-hover"
                      bg={bgPrevButton}
                      alignSelf="flex-end"
                      mt="24px"
                      w={{ sm: "75px", lg: "100px" }}
                      h="35px"
                      onClick={() => jobTab.current.click()}
                    >
                      <Text fontSize="xs" color="gray.700" fontWeight="bold">
                        PREV
                      </Text>
                    </Button>
                    <Button
                      variant="no-hover"
                      bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                      alignSelf="flex-end"
                      mt="24px"
                      w={{ sm: "75px", lg: "100px" }}
                      h="35px"
                    >
                      <Text fontSize="xs" color="#fff" fontWeight="bold">
                        CREATE
                      </Text>
                    </Button>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default EmployeeWizard;
