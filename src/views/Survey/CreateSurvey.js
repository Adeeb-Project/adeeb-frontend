// src/views/Survey/CreateSurvey.js
import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const CreateSurvey = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const history = useHistory();

  // Default employee name
  const employeeName = "Adeeb";

  // Retrieve auth token and set up headers
  const token = localStorage.getItem('authToken');
  const authHeaders = { headers: { Authorization: `${token}` } };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        'http://localhost:5347/api/surveys/new',
        { title, description, expiryDate, employeeName },
        authHeaders
      );
      toast({
        title: 'Survey created.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      history.push(`/surveys/${data.surveyId}/edit`);
    } catch (error) {
      toast({
        title: 'Creation failed.',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box p={6} maxW="md" mx="auto">
      <Heading as="h2" size="lg" mb={6}>
        Create New Survey
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="survey-title" isRequired mb={4}>
          <FormLabel>Survey Title</FormLabel>
          <Input
            placeholder="Enter survey title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>

        <FormControl id="survey-description" mb={4}>
          <FormLabel>Survey Description</FormLabel>
          <Input
            placeholder="Enter survey description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <FormControl id="survey-expiry" mb={4}>
          <FormLabel>Expiry Date</FormLabel>
          <Input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          isLoading={isSubmitting}
          width="full"
        >
          Create Survey
        </Button>
      </form>
    </Box>
  );
};

export default CreateSurvey;
