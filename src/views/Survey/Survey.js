import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Input, Button, Flex, VStack, FormControl, FormLabel, Textarea, HStack, Icon, RadioGroup, Radio, Stack, useToast } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const Survey = () => {
  const { userId } = useParams();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState({});
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [textAnswers, setTextAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [surveyId, setSurveyId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(`http://localhost:5347/api/surveys/${userId}`);
        setSurvey(response.data);
        setSurveyId(response.data.surveyId);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load survey data. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [userId, toast]);

  const handleRating = (questionId, rating) => {
    setRatings({ ...ratings, [questionId]: rating });
  };

  const handleMcqChange = (questionId, value) => {
    setMcqAnswers({ ...mcqAnswers, [questionId]: value });
  };

  const handleTextChange = (questionId, value) => {
    setTextAnswers({ ...textAnswers, [questionId]: value });
  };

  const validateAnswers = () => {
    const errors = [];
    
    survey.questions.forEach(question => {
      switch (question.questionType) {
        case "RatingQuestion":
          if (!ratings[question.id]) {
            errors.push(`Please provide a rating for: ${question.text}`);
          }
          break;
        case "MultipleChoiceQuestion":
          if (!mcqAnswers[question.id]) {
            errors.push(`Please select an option for: ${question.text}`);
          }
          break;
        case "TextQuestion":
          if (!textAnswers[question.id]?.trim()) {
            errors.push(`Please provide an answer for: ${question.text}`);
          }
          break;
      }
    });

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate all answers
    const validationErrors = validateAnswers();
    if (validationErrors.length > 0) {
      toast({
        title: "Validation Error",
        description: validationErrors[0], // Show first error
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!surveyId) {
      toast({
        title: "Error",
        description: "Survey ID is missing. Please refresh the page and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      setSubmitting(true);
      
      // Prepare the answers based on question types
      const answers = survey.questions.map(question => {
        switch (question.questionType) {
          case "RatingQuestion":
            return {
              questionId: question.id,
              answer: ratings[question.id].toString() // Convert rating to string
            };
          case "MultipleChoiceQuestion":
            return {
              questionId: question.id,
              answer: mcqAnswers[question.id]
            };
          case "TextQuestion":
            return {
              questionId: question.id,
              answer: textAnswers[question.id]
            };
          default:
            return null;
        }
      }).filter(answer => answer !== null);

      // Submit the survey with the surveyId
      await axios.post(`http://localhost:5347/api/surveys/${userId}`, {
        QuestionsAnswers: answers,
        SurveyId: surveyId
      });
      
      toast({
        title: "Success",
        description: "Survey submitted successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Clear form data after successful submission
      setRatings({});
      setMcqAnswers({});
      setTextAnswers({});
      
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit survey. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text>Loading survey...</Text>
      </Flex>
    );
  }

  if (!survey) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text>No survey found</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" p={4}>
      <Text fontSize="3xl" fontWeight="bold" mb={2}>
        Welcome, {survey.employeeName}! 👋
      </Text>
      <Text fontSize="2xl" mb={6}>{survey.title}</Text>
      <Text mb={6}>{survey.description}</Text>
      {survey.expiryDate && (
        <Text mb={6} color="gray.600">
          Expires on: {new Date(survey.expiryDate).toLocaleDateString()}
        </Text>
      )}
      <Box width="100%" maxWidth="600px" p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {survey.questions.map((question) => (
              <FormControl key={question.id} id={`question-${question.id}`} isRequired>
                <FormLabel>{question.text}</FormLabel>
                {question.questionType === "TextQuestion" && (
                  <Textarea 
                    placeholder="Your answer" 
                    onChange={(e) => handleTextChange(question.id, e.target.value)}
                    value={textAnswers[question.id] || ""}
                  />
                )}
                {question.questionType === "RatingQuestion" && (
                  <HStack spacing={1}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        as={FaStar}
                        color={ratings[question.id] >= star ? "teal.500" : "gray.300"}
                        cursor="pointer"
                        onClick={() => handleRating(question.id, star)}
                      />
                    ))}
                  </HStack>
                )}
                {question.questionType === "MultipleChoiceQuestion" && (
                  <RadioGroup 
                    onChange={(value) => handleMcqChange(question.id, value)} 
                    value={mcqAnswers[question.id]}
                  >
                    <Stack>
                      {question.options?.map((option, optionIndex) => (
                        <Radio key={optionIndex} value={option}>
                          {option}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                )}
              </FormControl>
            ))}
            <Button 
              type="submit" 
              colorScheme="teal" 
              width="full"
              isLoading={submitting}
              loadingText="Submitting..."
            >
              Submit Survey
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Survey;