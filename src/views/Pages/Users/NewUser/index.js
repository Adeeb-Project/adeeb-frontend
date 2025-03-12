
import {
  Avatar,
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
  Textarea,
  useColorModeValue,
  Switch,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import avatar4 from "assets/svg/person-circle-auth.svg";
import React, { useRef, useState } from "react";
import { BsCircleFill } from "react-icons/bs";

function NewUser() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgPrevButton = useColorModeValue("gray.100", "gray.100");
  const [activeBullets, setActiveBullets] = useState({
    userInfo: true,
    address: false,
    socials: false,
    profile: false,
  });

  const userInfoTab = useRef();
  //const addressTab = useRef();
  //const socialsTab = useRef();
  const profileTab = useRef();

  return (
    <Flex
      direction="column"
      minH="100vh"
      align="center"
      pt={{ sm: "120px", md: "75px" }}
    >
      <Tabs variant="unstyled" mt="24px">
        <TabList display="flex" align="center" justifyContent="center">
          <Tab
            ref={userInfoTab}
            _focus="none"
            w={{ sm: "80px", md: "350px" }}
            onClick={() =>
              setActiveBullets({
                userInfo: true,
                address: false,
                socials: false,
                profile: false,
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
                width: { sm: "80px", md: "270px" },
                height: "3px",
                bg: activeBullets.address ? textColor : "gray.200",
                left: { sm: "12px", md: "32px" },
                top: { sm: activeBullets.userInfo ? "6px" : "4px", md: null },
                position: "absolute",
                bottom: activeBullets.userInfo ? "40px" : "38px",
                zIndex: -1,
                transition: "all .3s ease",
              }}
            >
              <Icon
                as={BsCircleFill}
                color={activeBullets.userInfo ? textColor : "gray.300"}
                w={activeBullets.userInfo ? "16px" : "12px"}
                h={activeBullets.userInfo ? "16px" : "12px"}
                mb="8px"
              />
              <Text
                color={activeBullets.userInfo ? { textColor } : "gray.300"}
                fontWeight={activeBullets.userInfo ? "bold" : "normal"}
                display={{ sm: "none", md: "block" }}
              >
                User Info
              </Text>
            </Flex>
          </Tab>
          
          <Tab
            ref={profileTab}
            _focus="none"
            w={{ sm: "80px", md: "200px" }}
            onClick={() =>
              setActiveBullets({
                userInfo: true,
                address: true,
                socials: true,
                profile: true,
              })
            }
          >
            <Flex direction="column" justify="center" align="center">
              <Icon
                as={BsCircleFill}
                color={activeBullets.profile ? textColor : "gray.300"}
                w={activeBullets.profile ? "16px" : "12px"}
                h={activeBullets.profile ? "16px" : "12px"}
                mb="8px"
              />
              <Text
                color={activeBullets.profile ? { textColor } : "gray.300"}
                fontWeight={activeBullets.profile ? "bold" : "normal"}
                transition="all .3s ease"
                _hover={{ color: textColor }}
                display={{ sm: "none", md: "block" }}
              >
                Profile
              </Text>
            </Flex>
          </Tab>
        </TabList>
        <TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto">
          <TabPanel>
            <Card>
              <CardHeader mb="40px">
                <Flex direction="column">
                  <Text
                    color={textColor}
                    fontSize="lg"
                    fontWeight="bold"
                    mb="3px"
                  >
                    User Informations
                  </Text>
                  <Text color="gray.400" fontWeight="normal" fontSize="sm">
                    Mandatory Informations
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>
                <Flex direction="column" w="100%">
                  <Grid
                    templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)" }}
                    templateRows={{ md: "repeat(2, 1fr)" }}
                    gap="24px"
                  >
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        First Name
                      </FormLabel>
                      <Input
                        borderRadius="15px"
                        placeholder="eg. Michael"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Last Name
                      </FormLabel>
                      <Input
                        borderRadius="15px"
                        placeholder="eg. Jackson"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Position
                      </FormLabel>
                      <Input
                        borderRadius="15px"
                        placeholder="HR Manager"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Email Address
                      </FormLabel>
                      <Input
                        borderRadius="15px"
                        type="email"
                        placeholder="anonymous@example.com"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Password
                      </FormLabel>
                      <Input
                        borderRadius="15px"
                        type="password"
                        placeholder="******"
                        fontSize="xs"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        color={textColor}
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        Repeat Password
                      </FormLabel>
                      <Input
                        borderRadius="15px"
                        placeholder="******"
                        fontSize="xs"
                      />
                    </FormControl>
                  </Grid>
                  <Button
                    variant="no-hover"
                    bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                    alignSelf="flex-end"
                    mt="24px"
                    w="100px"
                    h="35px"
                    onClick={() => profileTab.current.click()}
                  >
                    <Text fontSize="xs" color="#fff" fontWeight="bold">
                      NEXT
                    </Text>
                  </Button>
                </Flex>
              </CardBody>
            </Card>
          </TabPanel>
          <TabPanel>
            <Card>
              <CardHeader mb="40px">
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="bold"
                  mb="3px"
                >
                  Profile
                </Text>
              </CardHeader>
              <CardBody>
                <Flex direction="column" w="100%">
                  <Stack direction="column" spacing="24px">

                  <CardBody>
          <Flex
            direction={{ sm: "column", md: "row" }}
            justify="space-between"
            align="center"
            w="100%"
          >
            <Flex align="center">
              <Avatar
                src={avatar4}
                w="85px"
                h="85px"
                me="25px"
                borderRadius="50px"
              />
              <Flex direction="column">
                <Text color={textColor} fontWeight="bold" fontSize="lg">
                  Muath Alghamdi
                </Text>
                <Text color="gray.400" fontWeight="normal" fontSize="sm">
                  muath@adeeb.com
                </Text>
              </Flex>
            </Flex>
            <Flex
              align="center"
              alignSelf={{ sm: "flex-start", lg: null }}
              mt={{ sm: "16px", lg: null }}
              ms={{ sm: "6px", lg: null }}
            >

            </Flex>
          </Flex>
        </CardBody>
                  </Stack>
                  <Flex justify="space-between">
                    <Button
                      variant="no-hover"
                      bg={bgPrevButton}
                      alignSelf="flex-end"
                      mt="24px"
                      w="100px"
                      h="35px"
                      onClick={() => userInfoTab.current.click()}
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
                      w="100px"
                      h="35px"
                    >
                      <Text fontSize="xs" color="#fff" fontWeight="bold">
                        SEND
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

export default NewUser;
