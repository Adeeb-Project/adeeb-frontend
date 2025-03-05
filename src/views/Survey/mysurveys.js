import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const MySurvey = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    // Simulate fetching surveys (replace with your API call)
    const dummySurveys = [
      { id: 1, title: "Exit Survey Q1", date: "2023-12-01", status: "Completed" },
      { id: 2, title: "Employee Engagement Survey", date: "2023-11-15", status: "Pending" },
      { id: 3, title: "Exit Survey Q2", date: "2024-01-10", status: "Draft" },
    ];
    setSurveys(dummySurveys);
  }, []);

  return (
    <Flex direction="column" p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="lg">My Surveys</Heading>
        <Button colorScheme="teal" as={Link} to="/survey">
          Create New Survey
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {surveys.map((survey) => (
              <Tr key={survey.id}>
                <Td>{survey.title}</Td>
                <Td>{survey.date}</Td>
                <Td>{survey.status}</Td>
                <Td>
                  <Button size="sm" colorScheme="blue" mr={2} as={Link} to={`/survey?surveyId=${survey.id}`}>
                    View/Edit
                  </Button>
                  <Button size="sm" colorScheme="red">
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default MySurvey;
