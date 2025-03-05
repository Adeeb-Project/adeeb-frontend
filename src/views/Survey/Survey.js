import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  Input,
  Button,
  Flex,
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  HStack,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { FaStar, FaEdit, FaGripVertical, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Survey = () => {
  const { userId } = useParams();
  const searchParams = new URLSearchParams(window.location.search);
  const isEditMode = searchParams.get("edit") === "true";

  // Initial questions based on an exit interview template
  const initialQuestions = [
    {
      type: "text",
      question:
        "Please describe the primary reason(s) you are leaving your current position?",
      isEditing: false,
    },
    {
      type: "yesno",
      question:
        "Did dissatisfaction with the following factor influence your decision to leave: Type of work?",
      isEditing: false,
    },
    {
      type: "yesno",
      question:
        "Did dissatisfaction with the following factor influence your decision to leave: Working conditions?",
      isEditing: false,
    },
    {
      type: "rating",
      question:
        "Rate the following aspect of the job: Type of work performed",
      isEditing: false,
    },
    {
      type: "rating",
      question:
        "Rate the following aspect of the organization: Recruitment process",
      isEditing: false,
    },
    {
      type: "textarea",
      question: "What do you think can be improved about the job?",
      isEditing: false,
    },
  ];

  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState(initialQuestions);
  const [responses, setResponses] = useState({}); // Keyed by question index
  // Store temporary editing text for each question
  const [editingTexts, setEditingTexts] = useState({});

  useEffect(() => {
    // Simulate fetching user data
    setUser({
      id: userId,
      name: "Abdulaziz",
      position: "Software Engineer",
      company: "Tech Corp",
      duration: "2 years",
    });

    if (isEditMode) {
      // Simulate pre-filling responses for edit mode
      const existingResponses = {
        0: "I left for better opportunities.",
        1: true, // Yes for Type of work
        2: false, // No for Working conditions
        3: 4, // Rating
        4: 3, // Rating
        5: "More flexible hours would help.",
      };
      setResponses(existingResponses);
    }
  }, [userId, isEditMode]);

  const handleInputChange = (index, value) => {
    setResponses((prev) => ({ ...prev, [index]: value }));
  };

  const handleYesNo = (index, answer) => {
    setResponses((prev) => ({ ...prev, [index]: answer }));
  };

  const handleRating = (index, ratingValue) => {
    setResponses((prev) => ({ ...prev, [index]: ratingValue }));
  };

  // Start editing: set the temporary text and mark as editing
  const startEditingQuestion = (index) => {
    setEditingTexts((prev) => ({ ...prev, [index]: questions[index].question }));
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === index ? { ...q, isEditing: true } : q
      )
    );
  };

  // Save the edited text and exit editing mode
  const saveEditingQuestion = (index) => {
    const newText = editingTexts[index];
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === index ? { ...q, question: newText, isEditing: false } : q
      )
    );
    setEditingTexts((prev) => {
      const newEditing = { ...prev };
      delete newEditing[index];
      return newEditing;
    });
  };

  // Cancel editing without saving changes
  const cancelEditingQuestion = (index) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === index ? { ...q, isEditing: false } : q
      )
    );
    setEditingTexts((prev) => {
      const newEditing = { ...prev };
      delete newEditing[index];
      return newEditing;
    });
  };

  // Delete a question and reindex responses
  const deleteQuestion = (index) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions.splice(index, 1);
      return newQuestions;
    });
    setResponses((prev) => {
      const newResponses = {};
      Object.keys(prev).forEach((key) => {
        const keyNum = Number(key);
        if (keyNum < index) {
          newResponses[keyNum] = prev[key];
        } else if (keyNum > index) {
          newResponses[keyNum - 1] = prev[key];
        }
      });
      return newResponses;
    });
    // Also remove temporary editing text if exists
    setEditingTexts((prev) => {
      const newEditing = { ...prev };
      delete newEditing[index];
      return newEditing;
    });
  };

  // Handler for drag end from react-beautiful-dnd
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newQuestions = Array.from(questions);
    const [removed] = newQuestions.splice(result.source.index, 1);
    newQuestions.splice(result.destination.index, 0, removed);
    setQuestions(newQuestions);
  };

  // Add a new question to the survey
  const addNewQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { type: "text", question: "New question", isEditing: false },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Prepare submission data (replace with your API call)
    const submissionData = {
      user,
      questions,
      responses,
      isEditMode,
    };
    console.log("Survey submitted:", submissionData);
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex direction="column" align="center" p={4}>
      <Text fontSize="2xl" mb={6}>
        {isEditMode ? "Edit Exit Survey" : `Exit Survey for ${user.name}`}
      </Text>
      <Box
        width="100%"
        maxWidth="800px"
        p={6}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
      >
        <VStack spacing={4} align="start" mb={6}>
          <Text>
            <strong>Position:</strong> {user.position}
          </Text>
          <Text>
            <strong>Company:</strong> {user.company}
          </Text>
          <Text>
            <strong>Duration:</strong> {user.duration}
          </Text>
        </VStack>
        <form onSubmit={handleSubmit}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <VStack
                  spacing={6}
                  align="stretch"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {questions.map((q, index) => (
                    <Draggable
                      key={index}
                      draggableId={`question-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <FormControl
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          id={`question-${index}`}
                          isRequired
                          p={4}
                          borderWidth={1}
                          borderRadius="md"
                        >
                          <HStack justifyContent="space-between" align="center" mb={2}>
                            <HStack {...provided.dragHandleProps} cursor="grab">
                              <Icon as={FaGripVertical} mr={2} />
                              {q.isEditing ? (
                                <Textarea
                                  value={editingTexts[index] || ""}
                                  onChange={(e) =>
                                    setEditingTexts((prev) => ({
                                      ...prev,
                                      [index]: e.target.value,
                                    }))
                                  }
                                  size="sm"
                                  resize="vertical"
                                  minH="60px"
                                  width="400px"
                                />
                              ) : (
                                <Text fontWeight="bold">{q.question}</Text>
                              )}
                            </HStack>
                            {q.isEditing ? (
                              <HStack spacing={2}>
                                <IconButton
                                  icon={<FaCheck />}
                                  size="sm"
                                  onClick={() => saveEditingQuestion(index)}
                                  aria-label="Save Question"
                                />
                                <IconButton
                                  icon={<FaTimes />}
                                  size="sm"
                                  onClick={() => cancelEditingQuestion(index)}
                                  aria-label="Cancel Editing"
                                />
                              </HStack>
                            ) : (
                              <HStack spacing={2}>
                                <IconButton
                                  icon={<FaEdit />}
                                  size="sm"
                                  onClick={() => startEditingQuestion(index)}
                                  aria-label="Edit Question"
                                />
                                <IconButton
                                  icon={<FaTrash />}
                                  size="sm"
                                  onClick={() => deleteQuestion(index)}
                                  aria-label="Delete Question"
                                />
                              </HStack>
                            )}
                          </HStack>
                          {/* Render answer input based on question type */}
                          {q.type === "text" && (
                            <Input
                              placeholder="Your answer"
                              value={responses[index] || ""}
                              onChange={(e) =>
                                handleInputChange(index, e.target.value)
                              }
                            />
                          )}
                          {q.type === "textarea" && (
                            <Textarea
                              placeholder="Your answer"
                              value={responses[index] || ""}
                              onChange={(e) =>
                                handleInputChange(index, e.target.value)
                              }
                            />
                          )}
                          {q.type === "yesno" && (
                            <HStack spacing={4}>
                              <Button
                                colorScheme={
                                  responses[index] === true ? "teal" : "gray"
                                }
                                onClick={() => handleYesNo(index, true)}
                              >
                                Yes
                              </Button>
                              <Button
                                colorScheme={
                                  responses[index] === false ? "teal" : "gray"
                                }
                                onClick={() => handleYesNo(index, false)}
                              >
                                No
                              </Button>
                            </HStack>
                          )}
                          {q.type === "rating" && (
                            <HStack spacing={1}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Icon
                                  key={star}
                                  as={FaStar}
                                  color={
                                    responses[index] >= star
                                      ? "teal.500"
                                      : "gray.300"
                                  }
                                  cursor="pointer"
                                  onClick={() => handleRating(index, star)}
                                />
                              ))}
                            </HStack>
                          )}
                        </FormControl>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </VStack>
              )}
            </Droppable>
          </DragDropContext>
          <Button onClick={addNewQuestion} colorScheme="blue" alignSelf="flex-start" mt={4}>
            Add New Question
          </Button>
          <Button type="submit" colorScheme="teal" width="full" mt={4}>
            {isEditMode ? "Update Survey" : "Submit Survey"}
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Survey;
