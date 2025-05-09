import {
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
import React, { useState } from "react";
import { Element } from "react-scroll";

const Header = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  const [toggle, setToggle] = useState(false);
  return (
    <Card
      w={{ sm: "100%", lg: "70%" }}
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
      </Element>
    </Card>
  );
};

export default Header;
