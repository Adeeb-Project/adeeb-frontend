
// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import SearchTable1 from "components/Tables/SearchTable1";
import React from "react";
import { columnsData1 } from "variables/columnsData";
import MOCK_DATA from "variables/MOCK_DATA.json";

function DataTables() {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column" pt={{ sm: "125px", lg: "75px" }}>
      
      <Card px="0px">
        <CardHeader px="22px" mb="24px">
          <Flex direction="column">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="6px">
              Employees Data Tabel
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="normal">
            This is (Company Name) registered employees.
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>

           {/* 
            tableData1 in this path "variables/MOCK_DATA.json" contain 
            the data which we should modify to display it in Data Table page.
            
            columnsData1 in this path "variables/columnsData" contain
            the data table header which we should modify to display the needed header
            */}
            
          <SearchTable1 tableData={MOCK_DATA} columnsData={columnsData1} />
        </CardBody>
      </Card>
    </Flex>
  );
}

export default DataTables;
