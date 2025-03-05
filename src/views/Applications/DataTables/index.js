import { useState } from "react";
import { Box, Button, Input, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Papa from "papaparse";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import SearchTable1 from "components/Tables/SearchTable1";
import { columnsData1 } from "variables/columnsData";
import MOCK_DATA from "variables/MOCK_DATA.json";

function DataTables() {
  const textColor = useColorModeValue("gray.700", "white");
  const [tableData, setTableData] = useState(MOCK_DATA);

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        if (result.errors.length > 0) {
          console.error("CSV Parsing Errors:", result.errors);
          return;
        }
  
        const formattedData = result.data.map((row, index) => ({
          id: row.id || index + 1,  // Ensure unique ID
          first_name: row.first_name || "N/A",
          last_name: row.last_name || "N/A",
          email: row.email || "N/A",
          gender: row.gender || "N/A",
          phone: row.phone || "N/A",
          age: row.age ? parseInt(row.age, 10) : "N/A",
          position: row.position || "N/A",
          date_left: row.date_left || "N/A",
          years_stayed: row["years stayed"] ? parseInt(row["years stayed"], 10) : 0,
        }));
  
        console.log("Parsed Data:", formattedData); // Debugging log
        setTableData(formattedData);  // Update state with new data
      },
      error: (error) => {
        console.error("File Parsing Error:", error.message);
      },
    });
  };
  

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
          {/* CSV Upload Input */}
          <Flex align="center" justify="space-between" mb={4} px="202px">
            <Text fontSize="md" fontWeight="medium" color={textColor}>
              Upload CSV to Update Data
            </Text>
            <Button mx="10px" as="label" colorScheme="blue" cursor="pointer">
              Select File
              <Input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                hidden
              />
            </Button>
          </Flex>
        </CardHeader>

        <CardBody>


          {/* Data Table */}
          <SearchTable1 key={tableData.length} tableData={tableData} columnsData={columnsData1} />

        </CardBody>
      </Card>
    </Flex>
  );
}
export default DataTables;
