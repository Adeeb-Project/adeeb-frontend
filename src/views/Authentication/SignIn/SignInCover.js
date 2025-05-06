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
  InputGroup,
  InputRightElement,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
// Assets
import cover from "assets/img/basic-auth.png";
import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function SignIn() {
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  // State variables for input values and UI feedback
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setIsLoading(true);

    try {
      // We can either send as JSON or as FormData.
      // Here we're sending a JSON payload:
      const response = await fetch("http://localhost:5347/api/Users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        switch (response.status) {
          case 404:
            throw new Error("User not found, please sign up.");
          case 401:
            throw new Error("Invalid email or password.");
          case 400:
            throw new Error("Please check your input and try again.");
          default:
            throw new Error("An error occurred. Please try again later.");
        }
      }

      const result = await response.json();

      // If a token is received, save it to localStorage
      if (result.token) {
        localStorage.setItem("authToken", `Bearer ${result.token}`);
      }

      console.log("Login successful:", result);
      // Handle successful login here and redirect to the dashboard
      history.push("/admin/dashboard/default");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex position="relative" mb="40px">
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
            as="form"
            onSubmit={handleLogin}
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Welcome Back
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Enter your email and password to sign in
            </Text>
            <FormControl>
              <SimpleGrid columns={{ base: 1 }} spacing={5}>
                {/* Email */}
                <Box>
                  <FormLabel fontSize="sm" fontWeight="bold">
                    Email
                  </FormLabel>
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

                {/* Password */}
                <Box>
                  <FormLabel fontSize="sm" fontWeight="bold">
                    Password
                  </FormLabel>
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

                {/* Remember Me and Error Alert */}
                <Box>
                  <FormControl display="flex" alignItems="center">
                    <Switch id="remember-login" colorScheme="teal" me="10px" />
                    <FormLabel
                      htmlFor="remember-login"
                      mb="0"
                      ms="1"
                      fontWeight="normal"
                    >
                      Remember me
                    </FormLabel>
                  </FormControl>
                  {error && (
                    <Alert status="error" borderRadius="15px" mb="5px" mt="15px">
                      <AlertIcon />
                      {error}
                    </Alert>
                  )}
                </Box>
              </SimpleGrid>

              <Button
                fontSize="sm"
                type="submit"
                bg="teal.300"
                w="100%"
                h="45px"
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
                SIGN IN
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
                Don't have an account?
                <Link
                  onClick={() => history.push("/authentication/sign-up/cover")}
                  color={titleColor}
                  ms="5px"
                  fontWeight="bold"
                  cursor="pointer"
                >
                  Sign Up
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

export default SignIn;