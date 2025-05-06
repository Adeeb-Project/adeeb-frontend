/*!

=========================================================
* Purity UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.adeebcompany.com/product/purity-ui-dashboard-pro
* Copyright 2021 Creative Tim (https://www.adeebcompany.com/)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";
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
      <List display="flex">
          {/* Blog and License */}
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link
            color="gray.400"
            href="#blog"
            //href=""
          >
            {document.documentElement.dir === "rtl" ? "مدونة" : "Blog"}
          </Link>
        </ListItem>
        <ListItem>
          <Link
            color="gray.400"
            href="#license"
            //href=""
          >
            {document.documentElement.dir === "rtl" ? "رخصة" : "License"}
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
