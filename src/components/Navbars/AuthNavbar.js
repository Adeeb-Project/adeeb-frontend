// src/components/CustomNavbar.jsx
import React from "react";
import { Flex, HStack, Link, Text, useColorModeValue } from "@chakra-ui/react";

const AuthNavbar = () => {
  // Define Chakra UI color mode values
  const mainText = useColorModeValue("gray.700", "gray.200");
  const navbarBg = useColorModeValue(
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const navbarBorder = useColorModeValue(
    "1.5px solid #FFFFFF",
    "1.5px solid rgba(255, 255, 255, 0.31)"
  );
  const navbarShadow = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );
  const navbarFilter = useColorModeValue(
    "none",
    "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );
  const navbarBackdrop = "blur(21px)";

  // This helper will scroll to the given element ID without re-routing.
  const handleScroll = (id) => (event) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Flex
      position="fixed"
      top="16px"
      left="50%"
      transform="translate(-50%, 0)"
      background={navbarBg}
      border={navbarBorder}
      boxShadow={navbarShadow}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderRadius="15px"
      px="16px"
      py="22px"
      mx="auto"
      width="1044px"
      maxW="90%"
      alignItems="center"
      zIndex="1000"
    >
      <Flex w="100%" justifyContent="space-between" alignItems="center">
        {/* Brand Text */}
        <Text fontWeight="bold" fontSize="lg" color={mainText}>
          Adeeb
        </Text>

        {/* Navigation Links – these call handleScroll instead of using href */}
        <HStack spacing="12px">
          <Link
            onClick={handleScroll("home")}
            fontSize="sm"
            color={mainText}
            cursor="pointer"
          >
            Home
          </Link>
          <Link
            onClick={handleScroll("pricing")}
            fontSize="sm"
            color={mainText}
            cursor="pointer"
          >
            Pricing
          </Link>
          <Link
            onClick={handleScroll("faq")}
            fontSize="sm"
            color={mainText}
            cursor="pointer"
          >
            FAQ
          </Link>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default AuthNavbar;
