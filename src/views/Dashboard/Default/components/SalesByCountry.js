import { Table, Tbody, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import SalesRow from "components/Tables/SalesRow";
import React from "react";

const SalesByCountry = ({ title, labels, salesData}) => {

    // Chakra Color Mode
    const textColor = useColorModeValue("gray.700", "white");
    
  return (
    <Card px="0px">
      <CardHeader px="22px" mb="32px">
        <Text color={textColor} fontSize="lg" fontWeight="bold">
          {title}
        </Text>
      </CardHeader>
      <CardBody overflowX={{ sm: "scroll", md: "hidden" }}>
        <Table variant="simple">
          <Thead>
            <Tr>
              {
                  labels.map(label => {
                      return (
                        <Th color="gray.400" fontSize="xs" key={label}>
                        {label}
                      </Th>
                      )
                  })
              }
            </Tr>
          </Thead>
          <Tbody>
              {
                  salesData.map(sale => {
                      return (
                          <SalesRow 
                            {...sale}
                          />
                      )
                  })
              }
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default SalesByCountry;
