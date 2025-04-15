import React, { useState, useEffect } from "react";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import SearchTable1 from "components/Tables/SearchTable1";
import { columnsData1 } from "variables/columnsData";

function DataTables() {
  const [tableData, setTableData] = useState([]); // State to hold fetched data
  const textColor = useColorModeValue("gray.700", "white");

  // Fetch the employee data from the backend when the component mounts.
  useEffect(() => {
    // Define an async function to fetch data
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch("https://server.adeebcompany.com/api/employees");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        // Optionally, you can set error state here for user feedback.
      }
    };

    fetchEmployeeData();
  }, []);

  return (
    <Flex direction="column" pt={{ sm: "125px", lg: "75px" }}>
      <Card px="0px">
        <CardHeader px="22px" mb="24px">
          <Flex direction="column">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="6px">
              Employees Data Table
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="normal">
              This is (Company Name) registered employees.
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          {tableData.length > 0 ? (
            <SearchTable1 tableData={tableData} columnsData={columnsData1} />
          ) : (
            <Text>  Loading employee data...</Text>
          )}
        </CardBody>
      </Card>
    </Flex>
  );
}

export default DataTables;