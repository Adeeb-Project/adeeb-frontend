// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  Select,
  Image,
  Icon,
} from "@chakra-ui/react";
// Assets
import cover from "assets/img/cover-auth.png";
import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { FiUpload } from "react-icons/fi";

function SignUp() {
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const bgColor = useColorModeValue("white", "gray.700");

  const [name, setName] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bundle, setBundle] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [employeeCountError, setEmployeeCountError] = useState("");
  const [bundleError, setBundleError] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const history = useHistory();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyLogo(file);
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let isValid = true;
    
    // Validate company name
    if (name.trim().length < 1) {
      setNameError("Company name is required");
      isValid = false;
    } else {
      setNameError("");
    }
    
    // Validate employee count
    if (!employeeCount || parseInt(employeeCount) <= 30) {
      setEmployeeCountError("Number of employees must be greater than 30");
      isValid = false;
    } else {
      setEmployeeCountError("");
    }
    
    // Validate bundle selection
    if (!bundle) {
      setBundleError("Please select a bundle");
      isValid = false;
    } else {
      setBundleError("");
    }
    
    return isValid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      // Create a FormData object to handle file upload
      const formData = new FormData();
      formData.append('name', name);
      formData.append('totalNumberOfEmployees', employeeCount);
      formData.append('bundle', bundle);
      
      // Add the logo if it exists
      if (companyLogo) {
        formData.append('logoImage', companyLogo);
      }

      const response = await fetch("http://localhost:5246/api/comanies/register", {
        method: "POST",
        body: formData,
     
      });

      if (!response.ok) {
        switch (response.status) {
          case 409:
            throw new Error("Email already registered.");
          case 400:
            throw new Error("Please fill in all required fields.");
          default:
            throw new Error("Registration failed. Please try again later.");
        }
      }

      const result = await response.json();
      console.log("Registration successful:", result);
      // Redirect to sign in page after successful registration
      history.push('/auth/authentication/sign-in/cover');
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Flex position="relative" mb="70px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
            as="form"
            onSubmit={handleSignUp}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Welcome!
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Enter the following Information
            </Text>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Company Name
              </FormLabel>
              <Input
                borderRadius="15px"
                mb={nameError ? "8px" : "24px"}
                fontSize="sm"
                type="text"
                placeholder="Your company name"
                size="lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && (
                <Text color="red.500" mb="24px" fontSize="sm">
                  {nameError}
                </Text>
              )}
              
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Number of Employees
              </FormLabel>
              <Input
                borderRadius="15px"
                mb={employeeCountError ? "8px" : "24px"}
                fontSize="sm"
                type="number"
                placeholder="Number of employees"
                size="lg"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(e.target.value)}
              />
              {employeeCountError && (
                <Text color="red.500" mb="24px" fontSize="sm">
                  {employeeCountError}
                </Text>
              )}
              
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Bundle
              </FormLabel>
              <Select
                borderRadius="15px"
                mb={bundleError ? "8px" : "24px"}
                fontSize="sm"
                placeholder="Choose bundle"
                size="lg"
                value={bundle}
                onChange={(e) => setBundle(e.target.value)}
              >
                <option value="Premium">Premium</option>
                <option value="Basic">Basic</option>
              </Select>
              {bundleError && (
                <Text color="red.500" mb="24px" fontSize="sm">
                  {bundleError}
                </Text>
              )}
              
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Company Logo
              </FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                display="none"
                ref={fileInputRef}
              />
              <Flex
                onClick={() => fileInputRef.current.click()}
                borderRadius="15px"
                border="1px dashed"
                borderColor="gray.200"
                p="16px"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                mb="24px"
                cursor="pointer"
                bg={bgColor}
                _hover={{
                  borderColor: "teal.300",
                }}
              >
                {previewImage ? (
                  <Image 
                    src={previewImage} 
                    alt="Company Logo Preview" 
                    maxH="150px"
                    borderRadius="10px"
                    mb="8px"
                  />
                ) : (
                  <Icon as={FiUpload} w="40px" h="40px" mb="8px" color="gray.400" />
                )}
                <Text color={textColor} fontSize="sm" fontWeight="medium">
                  {previewImage ? "Change logo" : "Upload company logo"}
                </Text>
              </Flex>
              
              {error && (
                <Alert status="error" borderRadius="15px" mb="24px">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <Button
                fontSize="sm"
                type="submit"
                bg="teal.300"
                w="100%"
                h="45"
                mb="20px"
                color="white"
                mt="20px"
                isLoading={isLoading}
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
              >
                REGISTER
              </Button>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                Already have an account?
                <Link 
                  onClick={() => history.push('/auth/authentication/sign-in/cover')}
                  color={titleColor} 
                  ms="5px" 
                  fontWeight="bold"
                  cursor="pointer"
                >
                  Sign In
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={cover}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignUp;