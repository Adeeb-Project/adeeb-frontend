// src/views/Survey/SurveysList.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Button,
  Flex,
  Text,
  useToast
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useHistory, NavLink } from 'react-router-dom';
import axios from 'axios';

const SurveysList = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const history = useHistory();
  const token = localStorage.getItem("authToken");
  const authHeaders = { headers: { Authorization: `${token}` } };

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const { data } = await axios.get('http://localhost:5347/api/surveys', authHeaders);
        
        setSurveys(data);
      } catch (err) {
        toast({
          title: 'Error loading surveys',
          description: err.response?.data?.message || err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSurveys();
  }, [toast]);

  const handleDelete = async (surveyId) => {
    try {
      await axios.delete(`http://localhost:5347/api/surveys/${surveyId}`);
      setSurveys(prev => prev.filter(sv => sv.surveyId !== surveyId));
      toast({ title: 'Survey deleted', status: 'success', duration: 3000 });
    } catch (err) {
      toast({
        title: 'Delete failed',
        description: err.response?.data?.message || err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) return <Text>Loading surveys…</Text>;

  return (
    <Box  p={16}>
      
              <NavLink to="/admin/surveys/create">
              <Text fontSize="2xl" fontWeight="bold">Your Surveys</Text>
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={() => history.push('')}>
          Create New Surveycre
        </Button>
              </NavLink>

      {surveys.length === 0 ? (
        <Text>No surveys found.</Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Expiry Date</Th>
              <Th textAlign="right">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {surveys.map(sv => (
              <Tr key={sv.surveyId}>
                <Td>{sv.title}</Td>
                <Td>{sv.expiryDate ? new Date(sv.expiryDate).toLocaleDateString() : ''}</Td>
                <Td textAlign="right">
                <NavLink to={'/admin/surveys/'+sv.surveyId+'/edit'}>
                  <IconButton
                    aria-label="Edit questions"
                    icon={<FaEdit />}
                    size="sm"
                    mr={2}
                    onClick={() => history.push(`/surveys/${sv.surveyId}/edit`)}
                  />
                                </NavLink>

                  <IconButton
                    aria-label="Delete survey"
                    icon={<FaTrash />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(sv.surveyId)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default SurveysList;
