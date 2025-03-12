// Chakra imports
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
  // Custom components
  import Card from "components/Card/Card";
  import CardBody from "components/Card/CardBody";
  import CardHeader from "components/Card/CardHeader";
  import React from "react";
  import { Element } from "react-scroll";
  
  
  const CompanyReports = () => {
    
    const textColor = useColorModeValue("gray.700", "white");
  
    const bgButton = useColorModeValue(
          "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
          "gray.800"
        );
  
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
                                placeholder="Choose a Catagory"
                                color="gray.400"
                                fontSize="xs"
                              >
                                <option value="option1">Company</option>
                                <option value="option2">Departments</option>
                                <option value="option3">Gender</option>
  
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
                              >
                                <option value="option1">Last quarter</option>
                                <option value="option2">Last 2 quarters</option>
                                <option value="option3">Last year</option>
                                <option value="option4">All time</option>
  
                              </Select>
                            </FormControl>
                            <Button
                                        variant="no-hover"
                                        bg={bgButton}
                                        w="150px"
                                        h="35px"
                                        alignSelf="flex-end"
                                      >
                                        <Text fontSize="xs" color="#fff" fontWeight="bold">
                                          NEXT
                                        </Text>
                                      </Button>  
                          </Stack>
                        </Stack>
                    </CardBody>
                  </Element>
          </Table>
        </CardBody>
      </Card>
    );
  };
  
  export default CompanyReports;
  