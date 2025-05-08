import React, { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Icon,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  HStack,
  Container,
  Link,
} from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";

// Import Card components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";

function LandingPage() {
  const [activeButton, setActiveButton] = useState({
    monthly: true,
    yearly: false,
  });
  const history = useHistory();

  const textColor = useColorModeValue("gray.700", "white");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const bgActiveButton = useColorModeValue("#fff", "gray.700");
  const bgButtonGroup = useColorModeValue("gray.50", "gray.600");
  const bgTimesIcon = useColorModeValue("gray.700", "gray.500");
  const headerBg = useColorModeValue("white", "gray.800");
  const headerBorderColor = useColorModeValue("gray.200", "gray.700");

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogin = () => {
    history.push("/sign-in");
  };

  return (
    <Flex direction="column" overflow="hidden">
      {/* Header */}
      <Box 
        as="header" 
        position="fixed" 
        top="0" 
        left="0" 
        right="0" 
        zIndex="1000" 
        bg={headerBg}
        borderBottom="1px solid"
        borderColor={headerBorderColor}
        py="4"
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Text fontSize="28px" fontWeight="bold" color={textColor}>
              Adeeb
            </Text>
            <HStack spacing="8">
              <Link 
                color={textColor} 
                fontWeight="medium" 
                onClick={() => scrollToSection("home")}
                cursor="pointer"
                _hover={{ color: "teal.500" }}
              >
                Home
              </Link>
              <Link 
                color={textColor} 
                fontWeight="medium" 
                onClick={() => scrollToSection("pricing")}
                cursor="pointer"
                _hover={{ color: "teal.500" }}
              >
                Pricing
              </Link>
              <Link 
                color={textColor} 
                fontWeight="medium" 
                onClick={() => scrollToSection("faq")}
                cursor="pointer"
                _hover={{ color: "#1e88ff" }}
              >
                FAQ
              </Link>
              <Button
                bg="#1e88ff"              // base background color
                _hover={{ bg: "#250149" }} // slightly darker on hover
                color="white"             // ensure the text stays legible
                size="sm"
                onClick={() => {
                  window.location.hash = "#/authentication/sign-in/cover";
                }}
              >
                Login
            </Button>

            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Flex direction="column" overflow="hidden" pt="80px">
        {/* Home Section */}
        <Box id="home" py="80px" px="4">
          <Flex
            direction="column"
            textAlign="center"
            justifyContent="center"
            align="center"
          >
            <Text fontSize="4xl" color="black" fontWeight="bold">
              Welcome to Adeeb
            </Text>
            <Text
              fontSize="md"
              color="gray.600"
              fontWeight="normal"
              mt="10px"
              mb="26px"
              maxW="500px"
            >
              Adeeb offers innovative services and analytics to boost your business.
            </Text>
          </Flex>
        </Box>

        {/* Pricing Section */}
        <Box id="pricing" position="relative" py="80px" px="4">
          <Flex
            direction="column"
            textAlign="center"
            justifyContent="center"
            align="center"
          >
            <Text fontSize="3xl" color={textColor} fontWeight="bold">
              See our pricing
            </Text>
            <Text
              fontSize="md"
              color="gray.600"
              fontWeight="normal"
              mt="10px"
              mb="26px"
              maxW="300px"
            >
              Adeeb will provide support and unlimited updates on each package.
            </Text>
            <Flex bg={bgButtonGroup} borderRadius="12px" mb="20px">
              <Button
                variant="no-hover"
                w="135px"
                h="40px"
                fontSize="xs"
                boxShadow={
                  activeButton.monthly
                    ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)"
                    : "none"
                }
                bg={activeButton.monthly ? bgActiveButton : "transparent"}
                onClick={() => setActiveButton({ monthly: true, yearly: false })}
              >
                MONTHLY
              </Button>
              <Button
                variant="no-hover"
                w="135px"
                h="40px"
                fontSize="xs"
                boxShadow={
                  activeButton.yearly ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)" : "none"
                }
                bg={activeButton.yearly ? bgActiveButton : "transparent"}
                onClick={() => setActiveButton({ monthly: false, yearly: true })}
              >
                YEARLY
              </Button>
            </Flex>
            <Stack
              direction={{ sm: "column", lg: "row" }}
              spacing="20px"
              mt="50px"
              mb="80px"
              justify="center"
            >
              <Card
                boxShadow={"0px 2px 5.5px rgba(0, 0, 0, 0.1)"}
                w={{ sm: "300px", md: "650px", lg: "300px" }}
              >
                <CardHeader mb="30px">
                  <Flex direction="column" w="100%" align="center">
                    <Tag size="sm">BASIC</Tag>
                    <Text color={textColor} fontSize="5xl" fontWeight="bold">
                      $0
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
                          color="#1e88ff"
                        />
                        <Text color="gray.500" fontWeight="normal" fontSize="md">
                          1 Team Member
                        </Text>
                      </Flex>
                      <Flex align="center">
                        <Icon
                          w="20px"
                          h="20px"
                          as={FaCheckCircle}
                          mr="8px"
                          color="#1e88ff"
                        />
                        <Text color="gray.500" fontWeight="normal" fontSize="md">
                          Adeeb services and analytics
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
                          AI Suggestions
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
                    <Tag size="sm">PREMIUM</Tag>
                    <Text color={textColor} fontSize="5xl" fontWeight="bold">
                      {activeButton.monthly ? "$49" : "$499"}
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
                          color="#1e88ff"
                        />
                        <Text color="gray.500" fontWeight="normal" fontSize="md">
                          4 Team Members
                        </Text>
                      </Flex>
                      <Flex align="center">
                        <Icon
                          w="20px"
                          h="20px"
                          as={FaCheckCircle}
                          mr="8px"
                          color="#1e88ff"
                        />
                        <Text color="gray.500" fontWeight="normal" fontSize="md">
                          Adeeb services and analytics
                        </Text>
                      </Flex>
                      <Flex align="center">
                        <Icon
                          w="20px"
                          h="20px"
                          as={FaCheckCircle}
                          mr="8px"
                          color="#1e88ff"
                        />
                        <Text color="gray.500" fontWeight="normal" fontSize="md">
                          AI Suggestions
                        </Text>
                      </Flex>
                    </Stack>
                    <Button
                      variant="no-hover"
                      fontSize="xs"
                      bg="#1e88ff"
                      color="#fff"
                    >
                      TRY PREMIUM
                    </Button>
                  </Flex>
                </CardBody>
              </Card>
            </Stack>
          </Flex>
        </Box>

        {/* FAQ Section */}
        <Box id="faq" py="80px" px="4">
          <Flex direction="column" align="center" justify="center" mb="40px">
            <Text
              color={textColor}
              fontWeight="bold"
              fontSize={{ sm: "3xl", md: "4xl" }}
              mb="12px"
            >
              Frequently Asked Questions
            </Text>
            <Text
              color="gray.400"
              fontSize="md"
              fontWeight="normal"
              maxW={{ sm: "300px", lg: "500px" }}
              textAlign="center"
            >
              If you can't find your question answered here, you can email us at{" "}
              support@adeeb.com
            </Text>
          </Flex>
          <Accordion
            allowToggle
            w={{ sm: "300px", md: "650px", xl: "930px" }}
            mb="16px"
            mx="auto"
          >
            <AccordionItem border="none">
              <AccordionButton
                _focus={{ boxShadow: "none" }}
                _hover={{ bg: "none" }}
                p="40px 0px 20px 0px"
                borderBottom="1px solid lightgray"
              >
                <Box flex="1" textAlign="left">
                  <Text
                    color="gray.500"
                    fontWeight="bold"
                    fontSize={{ sm: "xl", lg: "2xl" }}
                  >
                    How do I order?
                  </Text>
                </Box>
                <AccordionIcon color="gray.500" />
              </AccordionButton>
              <AccordionPanel p="18px 0px 40px 0px">
                <Text
                  color="gray.400"
                  fontWeight="normal"
                  fontSize="sm"
                  textAlign="left"
                >
                  We're not always in the position that we want to be at. We're
                  constantly growing. We're constantly making mistakes. We're
                  constantly trying to express ourselves and actualize our dreams.
                  If you have the opportunity to play this game of life you need
                  to appreciate every moment.
                </Text>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem border="none">
              <AccordionButton
                _focus={{ boxShadow: "none" }}
                _hover={{ bg: "none" }}
                p="40px 0px 20px 0px"
                borderBottom="1px solid lightgray"
              >
                <Box flex="1" textAlign="left">
                  <Text
                    color="gray.500"
                    fontWeight="bold"
                    fontSize={{ sm: "xl", lg: "2xl" }}
                  >
                    How can I make the payment?
                  </Text>
                </Box>
                <AccordionIcon color="gray.500" />
              </AccordionButton>
              <AccordionPanel p="18px 0px 40px 0px">
                <Text
                  color="gray.400"
                  fontWeight="normal"
                  fontSize="sm"
                  textAlign="left"
                >
                  It really matters and then like it really doesn't matter. What
                  matters is the people who are sparked by it. And the people who
                  are like offended by it, it doesn't matter. Because it's about
                  motivating the doers.
                </Text>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem border="none">
              <AccordionButton
                _focus={{ boxShadow: "none" }}
                _hover={{ bg: "none" }}
                p="40px 0px 20px 0px"
                borderBottom="1px solid lightgray"
              >
                <Box flex="1" textAlign="left">
                  <Text
                    color="gray.500"
                    fontWeight="bold"
                    fontSize={{ sm: "xl", lg: "2xl" }}
                  >
                    How much time does it take to receive the order?
                  </Text>
                </Box>
                <AccordionIcon color="gray.500" />
              </AccordionButton>
              <AccordionPanel p="18px 0px 40px 0px">
                <Text
                  color="gray.400"
                  fontWeight="normal"
                  fontSize="sm"
                  textAlign="left"
                >
                  The time is now for it to be okay to be great. People in this
                  world shun people for being great. For being a bright color. For
                  standing out. But the time is now to be okay to be the greatest you.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Flex>
    </Flex>
  );
}

export default LandingPage; 