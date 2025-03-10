// src/pages/Pricing.jsx
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
  Image,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Import asset files (ensure these files exist in your project)
import basic from "assets/img/basic-auth.png";
import deloitteLogo from "assets/svg/deloitte-logo.svg";
import georgiaLogo from "assets/svg/georgia-logo.svg";
import googleLogo from "assets/svg/google-logo.svg";
import microsoftLogo from "assets/svg/microsoft-logo.svg";
import msnLogo from "assets/svg/msn-logo.svg";
import zohoLogo from "assets/svg/zoho-logo.svg";

// Import Card components (see files below)
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";

function Pricing() {
  const [activeButton, setActiveButton] = useState({
    monthly: true,
    yearly: false,
  });

  const textColor = useColorModeValue("gray.700", "white");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const bgActiveButton = useColorModeValue("#fff", "gray.700");
  const bgButtonGroup = useColorModeValue("gray.50", "gray.600");
  const bgTimesIcon = useColorModeValue("gray.700", "gray.500");

  return (
    <Flex direction="column" overflow="hidden" pt="120px">
      {/* ---------------------- Home Section ---------------------- */}
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

      {/* ---------------------- Pricing Section ---------------------- */}
      <Box id="pricing" position="relative" py="80px" px="4">
        {/* Background image (optional overlay) */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          zIndex="-1"
          bgImage={basic}
          bgSize="cover"
          bgRepeat="no-repeat"
          opacity="0.3"
        />
        <Flex
          direction="column"
          textAlign="center"
          justifyContent="center"
          align="center"
        >
          <Text fontSize="3xl" color="white" fontWeight="bold">
            See our pricing
          </Text>
          <Text
            fontSize="md"
            color="white"
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
                        color="teal.300"
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
                        color="teal.300"
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
                        color="teal.300"
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
                        color="teal.300"
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
                        color="teal.300"
                      />
                      <Text color="gray.500" fontWeight="normal" fontSize="md">
                        AI Suggestions
                      </Text>
                    </Flex>
                  </Stack>
                  <Button
                    variant="no-hover"
                    fontSize="xs"
                    bg="teal.300"
                    color="#fff"
                  >
                    TRY PREMIUM
                  </Button>
                </Flex>
              </CardBody>
            </Card>
          </Stack>
          <Flex direction="column" mb="110px" justify="center" align="center">
          </Flex>
        </Flex>
      </Box>

      {/* ---------------------- FAQ Section ---------------------- */}
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
                We’re not always in the position that we want to be at. We’re
                constantly growing. We’re constantly making mistakes. We’re
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
                It really matters and then like it really doesn’t matter. What
                matters is the people who are sparked by it. And the people who
                are like offended by it, it doesn’t matter. Because it's about
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
                  Can I resell the products?
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
                I always felt like I could do anything. That’s the main thing
                people are controlled by! If you're taught you can’t do anything,
                you won’t do anything.
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
                  Where do I find the shipping details?
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
                There’s nothing I really wanted to do in life that I wasn’t able
                to get good at. I’m not really specifically talented at anything
                except for the ability to learn. That’s what I do.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Flex>
  );
}

export default Pricing;
