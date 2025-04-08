// src/pages/EmployeeOTPAuth.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { 
  Box,
  Text,
  Input,
  Button,
  Flex
} from "@chakra-ui/react";

const EmployeeOTPAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const history = useHistory();

  const handleSendOTP = () => {
    // Here, call your API to generate and send an OTP to the provided phone number.
    // For now, we simulate this process.
    console.log(`Sending OTP to ${phoneNumber}`);
    setIsOTPSent(true);
  };

  const handleVerifyOTP = () => {
    // Verify the OTP.
    // For demonstration, we assume any entered OTP is correct.
    console.log(`Verifying OTP ${otp} for phone number ${phoneNumber}`);
    // On successful verification, redirect to the survey page.
    history.push(`/survey?phoneNumber=${phoneNumber}`);
  };

  return (
    <Flex direction="column" align="center" justify="center" p={6} minH="100vh">
      <Box
        width="100%"
        maxWidth="400px"
        p={6}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Text fontSize="2xl" mb={4} textAlign="center">
          Employee OTP Verification
        </Text>
        {!isOTPSent ? (
          <>
            <Text mb={2}>Enter your phone number to receive an OTP.</Text>
            <Input
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              mb={4}
            />
            <Button onClick={handleSendOTP} colorScheme="blue" width="full">
              Send OTP
            </Button>
          </>
        ) : (
          <>
            <Text mb={2}>Enter the OTP sent to your phone.</Text>
            <Input
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              mb={4}
            />
            <Button onClick={handleVerifyOTP} colorScheme="blue" width="full">
              Verify OTP
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default EmployeeOTPAuth;
