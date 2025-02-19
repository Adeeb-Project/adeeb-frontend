
import { Flex, Link, Text } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px="30px"
      pb="20px"
    >
      <Text
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        &copy; {1900 + new Date().getYear()},{" "}
        <Text as="span">
          {document.documentElement.dir === "rtl"
            ? " مصنوع بواسطة"
            : "Made by "}
        </Text>
        <Link
          color="teal.400"
          target="_blank"
        >
          {document.documentElement.dir === "rtl"
            ? " .أديب"
            : "Adeeb."}
        </Link>
      </Text>
    </Flex>
  );
}