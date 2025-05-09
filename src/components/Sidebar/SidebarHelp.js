import React from 'react';
import { QuestionIcon } from "@chakra-ui/icons";
import { Button, Flex, Link, Text } from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";

const SidebarHelp = ({ sidebarWidth }) => {
  return (
    <Flex
        borderRadius="15px"
        flexDirection="column"
        backgroundColor="#1e88ff" // Fixed invalid backgroundColor
        justifyContent="flex-start"
        alignItems="start"
        boxSize="border-box"
        p={sidebarWidth === 275 || !sidebarWidth ? "16px" : "12px"}
        h={sidebarWidth === 275 || !sidebarWidth ? "150px" : "auto"}
        w={sidebarWidth === 275 || !sidebarWidth ? "100%" : "77%"}
      >
        <IconBox width="35px" h="35px" bg="white" mb="auto">
          <QuestionIcon color="teal.300" h="18px" w="18px" />
        </IconBox>
        <Text
          fontSize="16px"
          color="white"
          fontWeight="bold"
          display={sidebarWidth === 275 || !sidebarWidth ? "block" : "none"}
        >
          Need help?
        </Text>
        <Text
          fontSize="xs"
          color="white"
          mb="10px"
          display={sidebarWidth === 275 || !sidebarWidth ? "block" : "none"}
        >
          
        </Text>
        <Link
          w="100%"
          href="https://media.makeameme.org/created/or-learn-it.jpg"
        >
          <Button
            fontSize="14px"
            fontWeight="bold"
            w="100%"
            bg="white"
            _hover="none"
            _active={{
              bg: "white",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            color="black"
            display={sidebarWidth === 275 || !sidebarWidth ? "block" : "none"}
          >
            Help Center
          </Button>
        </Link>
      </Flex>
  )
}

export default SidebarHelp;