// ReasonsReportDocument.jsx
import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

const ReasonsReportDocument = ({ reportCategory, reportPeriod }) => {
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
        Reasons Report
      </Text>
      <Text fontSize="md" mb={2}>
        Catagory: {reportCategory}
      </Text>
      <Text fontSize="md" mb={6}>
        Period: {reportPeriod}
      </Text>
      <Text mb={2}>
        This report details the reasons behind key performance metrics with in-depth qualitative analysis.
      </Text>
      {/* Reasins charts and insights goes here */}
    </Box>
  );
};

export default ReasonsReportDocument;