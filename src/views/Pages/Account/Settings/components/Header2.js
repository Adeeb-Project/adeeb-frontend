/*!

=========================================================
* Purity UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Button,
  Avatar,
  Flex,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import avatar4 from "assets/svg/person-circle-auth.svg";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import { HSeparator } from "components/Separator/Separator";
import React, { useState } from "react";
import { Element } from "react-scroll";

const Header1 = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const [toggle, setToggle] = useState(false);
  return (
    <Card
      w={{ sm: "100%", lg: "100%" }}
      alignSelf={{ lg: "flex-end" }}
      justifySelf={{ lg: "flex-end" }}
    >
      
      <Element id="profile" name="profile">
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
                  Saud Alhawas
                </Text>
                <Text color="gray.400" fontWeight="normal" fontSize="sm">
                  saud@adeeb.com
                </Text>
              </Flex>
            </Flex>
            <Flex
              align="center"
              alignSelf={{ sm: "flex-start", lg: null }}
              mt={{ sm: "16px", lg: null }}
              ms={{ sm: "6px", lg: null }}
            >
              <Button variant="transparent-with-icon" color="teal.300">
                                <Flex align="center" color="teal.300" w="100%" fontSize="sm"><Button
                                      variant="outline"
                                      colorScheme="red"
                                      w="150px"
                                      h="35px"
                                      fontSize="xs"
                                      >
                                      REMOVE Account
                                  </Button>
                                </Flex>
                              </Button>
            </Flex>
          </Flex>
        </CardBody>
      </Element>
    </Card>
    
  );
};

export default Header1;
