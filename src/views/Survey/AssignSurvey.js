// src/views/Survey/AssignSurvey.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Select,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Tag,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';

const statusConfig = {
  SurveyNotAssigned: { color: 'red.500',    bg: 'red.100',    text: 'Not Assigned' },
  SurveySent:        { color: 'yellow.500', bg: 'yellow.100', text: 'Pending'     },
  SurveyCompleted:   { color: 'green.500',  bg: 'green.100',  text: 'Completed'   }
};

const AssignSurvey = () => {
  const toast = useToast();
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState('');
  const [employees, setEmployees] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [allSelected, setAllSelected] = useState(false);

  const token = localStorage.getItem('authToken');
  const authHeaders = { headers: { Authorization: `${token}` } };

  useEffect(() => {
    axios.get('http://localhost:5347/api/surveys', authHeaders)
      .then(res => setSurveys(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5347/api/employees', authHeaders)
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);

  const toggleSelectAll = () => {
    if (!allSelected) {
      const ids = new Set(
        employees
          .filter(emp => emp.surveyStatus !== 'SurveyCompleted')
          .map(emp => emp.id)
      );
      setSelectedIds(ids);
      setAllSelected(true);
    } else {
      setSelectedIds(new Set());
      setAllSelected(false);
    }
  };

  const toggleSelect = (id, status) => {
    if (status === 'SurveyCompleted') return;
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
    setAllSelected(
      newSet.size > 0 &&
      newSet.size === employees.filter(emp => emp.surveyStatus !== 'SurveyCompleted').length
    );
  };

  const handleAssign = () => {
    axios.post(
      'http://localhost:5347/api/surveys/assign',
      { surveyId: selectedSurvey, employeeId: Array.from(selectedIds) },
      authHeaders
    )
    .then(() => {
      toast({ title: 'Survey assigned', status: 'success' });
    })
    .catch(err => {
      toast({
        title: 'Assignment failed',
        description: err.response?.data?.message || err.message,
        status: 'error'
      });
    });
  };

  return (
    <Box pt={32} px={4}>
      <Flex mb={2} align="center">
        <Select
          placeholder="Select Survey"
          w="auto"
          value={selectedSurvey}
          onChange={e => setSelectedSurvey(e.target.value)}
        >
          {surveys.map(s => (
            <option key={s.surveyId} value={s.surveyId}>{s.title}</option>
          ))}
        </Select>
        <Checkbox ml={2} isChecked={allSelected} onChange={toggleSelectAll}>
          Select All
        </Checkbox>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>ID</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Select</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map(emp => {
            const cfg = statusConfig[emp.surveyStatus] || {};
            return (
              <Tr key={emp.id}>
                <Td>{emp.fullName}</Td>
                <Td>{emp.id}</Td>
                <Td>{emp.email}</Td>
                <Td>
                  <Tag color={cfg.color} bg={cfg.bg}>
                    {cfg.text}
                  </Tag>
                </Td>
                <Td>
                  <Checkbox
                    isChecked={selectedIds.has(emp.id)}
                    isDisabled={emp.surveyStatus === 'SurveyCompleted'}
                    onChange={() => toggleSelect(emp.id, emp.surveyStatus)}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Flex justify="flex-end" mt={2}>
        <Button size="sm"
          colorScheme="blue"
          onClick={handleAssign}
          isDisabled={!selectedSurvey || selectedIds.size === 0}
        >
          Assign Survey
        </Button>
      </Flex>
    </Box>
  );
};

export default AssignSurvey;
