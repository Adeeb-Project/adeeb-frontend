import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Input, Button, Flex, VStack, FormControl, FormLabel, Textarea, HStack, Icon } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const Survey = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    // Set fake user data
    setUser({
      id: userId,
      name: "Abdulaziz",
      position: "Software Engineer",
      company: "Tech Corp",
      duration: "2 years"
    });

    // Set fake questions
    setQuestions([
      { type: "text", question: "What was your primary reason for leaving the company?" },
      { type: "text", question: "How would you describe your overall experience working here?" },
      { type: "rating", question: "Were you satisfied with the support and resources provided to you?" },
      { type: "rating", question: "How would you rate the communication within the company?" },
      { type: "rating", question: "Did you feel valued and recognized for your contributions?" },
      { type: "text", question: "What could the company have done to retain you?" },
      { type: "text", question: "Would you recommend this company to others? Why or why not?" },
      { type: "textarea", question: "Any additional comments or suggestions?" }
    ]);
  }, [userId]);

  const handleRating = (index, rating) => {
    setRatings({ ...ratings, [index]: rating });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle survey submission
    console.log("Survey submitted", { user, ratings });
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex direction="column" align="center" p={4}>
      <Text fontSize="2xl" mb={6}>Exit Survey for {user.name}</Text>
      <Box width="100%" maxWidth="600px" p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <VStack spacing={4} align="start" mb={6}>
          <Text><strong>Position:</strong> {user.position}</Text>
          <Text><strong>Company:</strong> {user.company}</Text>
          <Text><strong>Duration:</strong> {user.duration}</Text>
        </VStack>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {questions.map((q, index) => (
              <FormControl key={index} id={`question-${index}`}>
                <FormLabel>{q.question}</FormLabel>
                {q.type === "text" && <Input placeholder="Your answer" />}
                {q.type === "textarea" && <Textarea placeholder="Your answer" />}
                {q.type === "rating" && (
                  <HStack spacing={1}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        as={FaStar}
                        color={ratings[index] >= star ? "teal.500" : "gray.300"}
                        cursor="pointer"
                        onClick={() => handleRating(index, star)}
                      />
                    ))}
                  </HStack>
                )}
              </FormControl>
            ))}
            <Button type="submit" colorScheme="teal" width="full">Submit</Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Survey;