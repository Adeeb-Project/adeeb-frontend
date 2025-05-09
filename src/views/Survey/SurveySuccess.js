import { Box, Flex, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

function SurveySuccess() {
    const history = useHistory();

    return (
        <Flex
            direction="column"
            minH="100vh"
            align="center"
            justify="center"
            bg="gray.100"
            textAlign="center"
            px={6}
        >
            <Box
                bg="white"
                p={10}
                rounded="lg"
                shadow="xl"
                maxW="1200px"
                textAlign="center"
            >
                <Icon as={CheckCircleIcon} w={16} h={16} color="green.400" mb={4} />
                <Heading as="h2" size="xl" mb={2} color="blue.600">
                    🎉 Thank You for Your Response!
                </Heading>
                <Text fontSize="lg" color="gray.700" mb={6}>
                    Your submission was successful!
                    We truly appreciate your time and valuable feedback.
                    Your insights help us improve and create a better experience for everyone.
                </Text>
                <Text fontSize="md" color="gray.500" mb={6}>
                    If you have any further thoughts or suggestions, feel free to reach out.
                    Have a fantastic day! 😊
                </Text>

                {/* <Button colorScheme="blue" size="lg" onClick={() => history.push("/")}>
          Go to Homepage
        </Button> */}
            </Box>
        </Flex>
    );
}

export default SurveySuccess;
