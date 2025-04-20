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
  InputGroup,
  InputRightElement,
  IconButton,
  SimpleGrid
} from "@chakra-ui/react";
// Assets
import cover from "assets/img/basic-auth.png";
import React, { useState, useRef } from "react";
import { ViewIcon, ViewOffIcon, } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { FiUpload, FiX, FiArrowLeft } from "react-icons/fi";

function SignUp() {
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRepeatPassword] = useState("");
  const [bundle, setBundle] = useState("");
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [employeeCountError, setEmployeeCountError] = useState("");
  const [bundleError, setBundleError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const fileInputRef = useRef(null); 
  const [previewImage, setPreviewImage] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [fileName, setFileName] = useState("");

  const history = useHistory();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Store the file name
      setCompanyLogo(file);    // Save the file

      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove the selected file
  const handleRemoveImage = () => {
    setCompanyLogo(null);
    setPreviewImage("");
    setFileName("");

    // Reset file input value to allow re-selection of the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
    if (password !== rPassword) {
      setPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setPasswordError("");
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
      formData.append('Name', companyName);
      formData.append('NameOfUser', name);
      formData.append('Email', email);
      formData.append('Password', password);
      formData.append('TotalNumberOfEmployees', employeeCount);
      formData.append('Bundle', bundle);
      formData.append('CompannyLogo', companyLogo);
      

      const response = await fetch("https://server.adeebcompany.com/api/companies/register", {
        method: "POST",
        body: formData,
     
      });
      const result = await response.json();
      console.log("Backend message:", result.message);

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

      if (result.token) {
        localStorage.setItem("authToken", `Bearer ${result.token}`);
      }  
        
      console.log("Registration successful:", result);
      // Redirect to sign in page after successful registration
      history.push('/sign-in');
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Flex position="relative" mb="70px">
      <IconButton
        icon={<FiArrowLeft />}
        aria-label="Go back to landing page"
        variant="ghost"
        fontSize="2xl"
        position="absolute"
        top="20px"
        left="20px"
        onClick={() => history.push("/land-page")} 
        zIndex="1000"
      />

      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1600px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        
        <Flex
          alignItems="center"
          justifyContent="center"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "60%", lg: "55%" }}
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
            {/* Two-Column Grid Layout for Inputs */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              {/* Company Name */}
              <Box>
                <FormLabel fontSize="sm" fontWeight="bold">Company Name</FormLabel>
                <Input
                  borderRadius="15px"
                  fontSize="sm"
                  type="text"
                  placeholder="Your company name"
                  size="lg"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </Box>

              {/* User Name */}
              <Box>
                <FormLabel fontSize="sm" fontWeight="bold">User Name</FormLabel>
                <Input
                  borderRadius="15px"
                  fontSize="sm"
                  type="text"
                  placeholder="Your user name"
                  size="lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>

              {/* Email */}
              <Box>
                <FormLabel fontSize="sm" fontWeight="bold">Email</FormLabel>
                <Input
                  borderRadius="15px"
                  fontSize="sm"
                  type="email"
                  placeholder="Write Your Email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

              {/* Number of Employees */}
              <Box>
                <FormLabel fontSize="sm" fontWeight="bold">Number of Employees</FormLabel>
                <Input
                  borderRadius="15px"
                  fontSize="sm"
                  type="number"
                  placeholder="Number of employees"
                  size="lg"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(e.target.value)}
                />
              </Box>

              {/* Password */}
              <Box>
                <FormLabel fontSize="sm" fontWeight="bold">Password</FormLabel>
                <InputGroup>
                  <Input
                    borderRadius="15px"
                    fontSize="sm"
                    type={showPassword ? "text" : "password"}
                    placeholder="Write Password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    />
                  </InputRightElement>
                </InputGroup>
              </Box>

              {/* Repeat Password */}
              <Box>
                <FormLabel fontSize="sm" fontWeight="bold">Repeat Password</FormLabel>
                <InputGroup>
                  <Input
                    borderRadius="15px"
                    fontSize="sm"
                    type={showRepeatPassword ? "text" : "password"}
                    placeholder="Repeat Your Password"
                    size="lg"
                    value={rPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                      icon={showRepeatPassword ? <ViewIcon /> : <ViewOffIcon />}
                    />
                  </InputRightElement>
                </InputGroup>
              </Box>

              {/* Bundle Selection */}
              <Box>
                <FormLabel fontSize="sm" fontWeight="bold">Bundle</FormLabel>
                <Select
                  borderRadius="15px"
                  fontSize="sm"
                  placeholder="Choose bundle"
                  size="lg"
                  value={bundle}
                  onChange={(e) => setBundle(e.target.value)}
                >
                  <option value="Premium">Premium</option>
                  <option value="Basic">Basic</option>
                </Select>
              </Box>
            <Box>
              <FormLabel fontSize="sm" fontWeight="bold">Company Logo</FormLabel>
              <Input
                type="file"
                accept="image/*"
                display="none"
                ref={fileInputRef}
                onChange={handleImageChange}
              />

              {/* Input Group with Image Preview and Remove Button */}
              <Flex
                border="1px solid #E2E8F0"
                borderRadius="15px"
                alignItems="center"
                overflow="hidden"
                width="100%"
              >
                {/* Left Box - Image Preview */}
                {previewImage && (
                  <Box
                    width="48px" // Adjust the preview box width
                    height="48px" // Keep it square
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="gray.100"
                    borderRight="1px solid #E2E8F0"
                    p={1}
                  >
                    <Image 
                      src={previewImage} 
                      alt="Company Logo Preview" 
                      width="100%"
                      height="100%"
                      objectFit="cover" // Ensures proper aspect ratio
                      borderRadius="8px"
                    />
                  </Box>
                )}

                {/* Text Input for File Name */}
                <Input
                  flex="1"
                  border="none"
                  fontSize="sm"
                  type="text"
                  placeholder="Upload company logo"
                  size="lg"
                  readOnly
                  value={fileName}
                  onClick={() => fileInputRef.current.click()} // Open file picker
                  pl={previewImage ? "10px" : "16px"} // Adjust padding if image is present
                />

                {/* Right Box - Remove Button or Upload Button */}
                <Box pr={2}>
                  {fileName ? (
                    <IconButton
                      size="md"
                      colorScheme="red"
                      icon={<FiX />}
                      borderRadius="full"
                      onClick={handleRemoveImage} // Remove file when clicked
                    />
                  ) : (
                    <IconButton
                      variant="ghost"
                      icon={<FiUpload />}
                      onClick={() => fileInputRef.current.click()}
                    />
                  )}
                </Box>
              </Flex>
            </Box>
            
            </SimpleGrid>

            {/* Register Button */}
            <Button
              fontSize="sm"
              type="submit"
              bg="teal.300"
              w="100%"
              h="45"
              mt="20px"
              color="white"
              isLoading={isLoading}
              _hover={{ bg: "teal.200" }}
              _active={{ bg: "teal.400" }}
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
                  onClick={() => history.push('/authentication/sign-in/cover')}
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