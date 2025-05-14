// src/views/Survey/EditSurvey.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Stack,
  IconButton,
  useToast
} from '@chakra-ui/react';
import { FaTrash, FaPlus, FaMagic } from 'react-icons/fa';
import axios from 'axios';

const EditSurvey = () => {
  const { surveyId } = useParams();
  const history = useHistory();
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [employeeName, setEmployeeName] = useState('Adeeb');
  const [description, setDescription] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefining, setIsRefining] = useState({});

  const token = localStorage.getItem('authToken');
  const authHeaders = { headers: { Authorization: `${token}` } };

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5347/api/surveys/single/${surveyId}`,
          authHeaders
        );
        setTitle(data.title || '');
        setEmployeeName(data.employeeName || 'Adeeb');
        setDescription(data.description || '');
        setExpiryDate(
          data.expiryDate ? data.expiryDate.split('T')[0] : ''
        );
        setQuestions(
          (data.questions || []).map(q => ({
            ...q,
            options:
              q.questionType === 'MultipleChoiceQuestion'
                ? q.options || ['']
                : undefined
          }))
        );
      } catch (error) {
        toast({
          title: 'Failed to load survey',
          description: error.response?.data?.message || error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchSurvey();
  }, [surveyId, toast]);

  const handleQuestionChange = (idx, text) => {
    setQuestions(qs => {
      const copy = [...qs];
      copy[idx] = { ...copy[idx], text };
      return copy;
    });
  };

  const handleTypeChange = (idx, questionType) => {
    setQuestions(qs => {
      const copy = [...qs];
      copy[idx] = {
        ...copy[idx],
        questionType,
        options:
          questionType === 'MultipleChoiceQuestion'
            ? copy[idx].options || ['']
            : undefined
      };
      return copy;
    });
  };

  const handleAddQuestion = () =>
    setQuestions(qs => [...qs, { text: '', questionType: 'TextQuestion' }]);

  const handleRemoveQuestion = idx =>
    setQuestions(qs => qs.filter((_, i) => i !== idx));

  const handleAddOption = qIdx => {
    setQuestions(qs => {
      const copy = [...qs];
      const opts = [...(copy[qIdx].options || [])];
      opts.push('');
      copy[qIdx].options = opts;
      return copy;
    });
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    setQuestions(qs => {
      const copy = [...qs];
      const opts = [...(copy[qIdx].options || [])];
      opts[optIdx] = value;
      copy[qIdx].options = opts;
      return copy;
    });
  };

  const handleRemoveOption = (qIdx, optIdx) => {
    setQuestions(qs => {
      const copy = [...qs];
      const opts = [...(copy[qIdx].options || [])];
      opts.splice(optIdx, 1);
      copy[qIdx].options = opts;
      return copy;
    });
  };

  const handleRefineQuestion = async idx => {
    const text = questions[idx].text;
    if (!text) return;
    setIsRefining(prev => ({ ...prev, [idx]: true }));
    try {
      const { data } = await axios.post(
        'http://localhost:5347/api/chatgpt/RefineSurveyQuestion',
        { question: text },
        authHeaders
      );
      const enhanced = data.enhancedQuestion || data;
      setQuestions(qs => {
        const copy = [...qs];
        copy[idx] = { ...copy[idx], text: enhanced };
        return copy;
      });
      toast({ title: 'Question refined', status: 'success', duration: 3000 });
    } catch (error) {
      toast({
        title: 'Refine failed',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsRefining(prev => ({ ...prev, [idx]: false }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.put(
        'http://localhost:5347/api/surveys/edit',
        { surveyId, title, description, expiryDate, employeeName, questions },
        authHeaders
      );
      toast({ title: 'Survey updated', status: 'success', duration: 3000 });
      history.push('/admin/surveys');
    } catch (error) {
      toast({
        title: 'Update failed',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Text>Loading survey…</Text>;

  return (
    <Box pt={16} maxW="lg" mx="auto">
      <Heading as="h2" size="lg" mb={6}>Edit Survey</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Survey Title</FormLabel>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter survey title"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter survey description"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Expiry Date</FormLabel>
          <Input
            type="date"
            value={expiryDate}
            onChange={e => setExpiryDate(e.target.value)}
          />
        </FormControl>
        <Heading as="h3" size="md" mb={4}>Questions</Heading>
        <Stack spacing={6}>
          {questions.map((q, idx) => (
            <Box key={idx} border="1px" borderColor="gray.200" p={4} borderRadius="md">
              <FormControl mb={3} isRequired>
                <FormLabel>Question {idx + 1} Text</FormLabel>
                <Box display="flex" alignItems="center">
                  <Input
                    flex={1}
                    value={q.text}
                    onChange={e => handleQuestionChange(idx, e.target.value)}
                    placeholder="Question text"
                  />
                  <IconButton
                    ml={2}
                    aria-label="Refine question"
                    icon={<FaMagic />}
                    size="sm"
                    isLoading={isRefining[idx]}
                    onClick={() => handleRefineQuestion(idx)}
                  />
                </Box>
              </FormControl>
              <FormControl mb={3} isRequired>
                <FormLabel>Type</FormLabel>
                <Select
                  value={q.questionType}
                  onChange={e => handleTypeChange(idx, e.target.value)}
                >
                  <option value="TextQuestion">Text</option>
                  <option value="MultipleChoiceQuestion">MCQ</option>
                  <option value="RatingQuestion">Rating</option>
                </Select>
              </FormControl>
              {q.questionType === 'MultipleChoiceQuestion' && (
                <FormControl mb={3}>
                  <FormLabel>Options</FormLabel>
                  <Stack spacing={2}>
                    {q.options.map((opt, optIdx) => (
                      <Box key={optIdx} display="flex" alignItems="center">
                        <Input
                          value={opt}
                          onChange={e => handleOptionChange(idx, optIdx, e.target.value)}
                          placeholder={`Option ${optIdx + 1}`}
                        />
                        <IconButton
                          aria-label="Remove option"
                          icon={<FaTrash />}
                          size="sm"
                          ml={2}
                          onClick={() => handleRemoveOption(idx, optIdx)}
                        />
                      </Box>
                    ))}
                    <Button leftIcon={<FaPlus />} variant="outline" size="sm" onClick={() => handleAddOption(idx)}>
                      Add Option
                    </Button>
                  </Stack>
                </FormControl>
              )}
              <IconButton aria-label="Remove question" icon={<FaTrash />} size="sm" colorScheme="red" onClick={() => handleRemoveQuestion(idx)} mt={2} />
            </Box>
          ))}
          <Button leftIcon={<FaPlus />} variant="solid" onClick={handleAddQuestion}>
            Add Question
          </Button>
        </Stack>
        <Button type="submit" colorScheme="teal" mt={6} isLoading={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default EditSurvey;