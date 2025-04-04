// CompanyReports.jsx

import {
  Table,
  useColorModeValue,
  Button,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useState } from "react";
import { Element } from "react-scroll";

// Import the customized Company Report component
import CompanyReportDocument from "./CompanyReportDocument";

const CompanyReports = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");

  const handleNext = () => {
    console.log("Selected Category:", selectedCategory);
    console.log("Selected Period:", selectedPeriod);
  };

  return (
    <Card overflowX={{ sm: "scroll", lg: "hidden" }}>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Element id="info" name="info">
            <CardHeader mb="40px">
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                Company Reports
              </Text>
            </CardHeader>
            <CardBody>
              <Stack direction="column" spacing="20px" w="100%">
                <Stack
                  direction={{ sm: "column", lg: "row" }}
                  spacing={{ sm: "24px", lg: "30px" }}
                >
                  <FormControl flex="1">
                    <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                      Report For?
                    </FormLabel>
                    <Select
                      borderRadius="15px"
                      placeholder="Choose a Category"
                      color="gray.400"
                      fontSize="xs"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="Company">Company</option>
                      <option value="Departments">Departments</option>
                      <option value="Gender">Gender</option>
                    </Select>
                  </FormControl>

                  <FormControl flex="1">
                    <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                      Which Period?
                    </FormLabel>
                    <Select
                      borderRadius="15px"
                      placeholder="Choose a Period"
                      color="gray.400"
                      fontSize="xs"
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                      <option value="Last quarter">Last quarter</option>
                      <option value="Last 2 quarters">Last 2 quarters</option>
                      <option value="Last year">Last year</option>
                      <option value="All time">All time</option>
                    </Select>
                  </FormControl>

                  <Button
                    variant="no-hover"
                    bg={bgButton}
                    w="150px"
                    h="35px"
                    alignSelf="flex-end"
                    onClick={handleNext}
                  >
                    <Text fontSize="xs" color="#fff" fontWeight="bold">
                      NEXT
                    </Text>
                  </Button>
                </Stack>
              </Stack>
            </CardBody>

            {/* Use the CompanyReportDocument component */}
            <CompanyReportDocument
              reportCategory={selectedCategory}
              reportPeriod={selectedPeriod}
            />
          </Element>
        </Table>
      </CardBody>
    </Card>
  );
};

export default CompanyReports;