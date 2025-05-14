import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useState } from "react";

const Socials = () => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card>
      <CardHeader mb="32px">
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          Socials
        </Text>
      </CardHeader>
      <CardBody>
        <Stack direction="column" spacing="20px" w="100%">
          <FormControl>
            <FormLabel fontSize="xs" fontWeight="bold" mb="10px">
              Shopify Handle
            </FormLabel>
            <Input placeholder="@Purity" fontSize="xs" />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="xs" fontWeight="bold" mb="10px">
              Facebook Account
            </FormLabel>
            <Input placeholder="https://" fontSize="xs" />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="xs" fontWeight="bold" mb="10px">
              Instagram Account
            </FormLabel>
            <Input placeholder="https://" fontSize="xs" />
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Socials;
