// src/views/Survey/SurveySummary.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Select,
  Button,
  Spinner,
  useToast,
  Stack,
  VStack,
  Divider
} from '@chakra-ui/react';
import axios from 'axios';

const SurveySummary = () => {
  const toast = useToast();
  const [surveys, setSurveys] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [analysis, setAnalysis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  // ← new

  const token = localStorage.getItem('authToken');
  const headers = { headers: { Authorization: `${token}` } };

  useEffect(() => {
    axios.get('http://localhost:5347/api/surveys', headers)
      .then(res => setSurveys(res.data))
      .catch(err => toast({
        title: 'Failed to load surveys',
        status: 'error',
        description: err.message
      }));
  }, [toast]);

  const handleGenerate = async () => {
    const survey = surveys.find(s => String(s.surveyId) === selectedId);
    if (!survey) return;
    setSelectedTitle(survey.title);
    setShowSummary(true);
    setIsLoading(true);  // ← start spinner
    try {
      const res = await axios.get(
        `http://localhost:5347/api/chatgpt/SurveyResponsesAnalysis?surveyId=${selectedId}`,
        headers
      );
      setAnalysis(res.data.questions || []);
    } catch (err) {
      toast({
        title: 'Failed to load analysis',
        status: 'error',
        description: err.response?.data?.message || err.message
      });
      setAnalysis([]);
    } finally {
      setIsLoading(false);  // ← stop spinner
    }
  };

  const today = new Date().toLocaleDateString();

  return (
    <Box pt={24} px={6}>
      <Stack direction="row" spacing={4} align="flex-end" mb={6}>
        <Select
          placeholder="Select Survey"
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          w="auto"
        >
          {surveys.map(s => (
            <option key={s.surveyId} value={s.surveyId}>
              {s.title}
            </option>
          ))}
        </Select>
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={handleGenerate}
          isDisabled={!selectedId}
          isLoading={isLoading}      // ← spinner on button
          size="sm"
        >
          Generate
        </Button>
      </Stack>

      {showSummary && (
        <Box
          border="1px"
          borderColor="gray.200"
          p={6}
          maxW="8.5in"
          mx="auto"
          mb={4}
        >
          <Heading as="h2" size="lg" textAlign="center" mb={2}>
            Summary report for: {selectedTitle}
          </Heading>
          <Text textAlign="center" mb={4}>
            Date: {today}
          </Text>

          {isLoading ? (
            <Box textAlign="center" py={10}>
              <Spinner size="xl" />
            </Box>
          ) : (
            <>
              <Text fontSize="md" mb={4}>
                Here are some analysis for your employees answers:
              </Text>

              <VStack align="stretch" spacing={4}>
                {analysis.map(item => (
                  <Box key={item.questionId}>
                    <Heading as="h4" size="sm" mb={1}>
                      Q{item.questionId}: {item.questionText}
                    </Heading>
                    <Text pl={4}>{item.analysis}</Text>
                    <Divider mt={2} />
                  </Box>
                ))}
              </VStack>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SurveySummary;