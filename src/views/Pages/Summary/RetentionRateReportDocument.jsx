// RetentionRateReportDocument.jsx
import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

const RetentionRateReportDocument = ({ reportCategory, reportPeriod }) => {
  const bg = useColorModeValue("white", "gray.700");

  return (
    <Box
      width="210mm"
      height="297mm"
      margin="20px auto"
      bg={bg}
      boxShadow="md"
      border="1px solid #ccc"
      padding="20px"
      overflow="auto"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Retention Rate Report
      </Text>
      <Text fontSize="md" mb={2}>
        Catagory: {reportCategory}
      </Text>
      <Text fontSize="md" mb={6}>
        Period: {reportPeriod}
      </Text>
      <Text mb={2}>
        This report includes insights on employee retention trends and analysis over the selected period.
      </Text>
      {/* Retension Rate charts and insights goes here */}
    </Box>
  );
};

export default RetentionRateReportDocument;