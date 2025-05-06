
import {
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import TablesReportsRow from "components/Tables/TablesReportsRow";
import React from "react";

const ReportsTable = ({ data }) => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card overflowX={{ sm: "scroll", lg: "hidden" }}>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" ps="0px" color="gray.400">
              <Th ps="0px" color="gray.400">
                Name
              </Th>
              <Th color="gray.400">Function</Th>
              <Th color="gray.400">Review</Th>
              <Th color="gray.400">Email</Th>
              <Th color="gray.400">Employed</Th>
              <Th color="gray.400">Id</Th>
            </Tr>
          </Thead>
          <Tbody pb="0px">
            {data.map((row, index, arr) => {
              return (
                <TablesReportsRow
                  name={row.name}
                  image={row.image}
                  email={row.email}
                  domain={row.domain}
                  review={row.review}
                  employed={row.employed}
                  id={row.id}
                  isLast={index === arr.length - 1 ? true : false}
                  key={index}
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ReportsTable;
