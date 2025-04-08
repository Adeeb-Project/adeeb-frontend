import React, { useEffect, useState } from "react";

import { useParams, useHistory } from "react-router-dom";
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
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/react";
import {
  FaStar,
  FaEdit,
  FaGripVertical,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Survey = () => {
  const { userId } = useParams();
  const history = useHistory();
  const searchParams = new URLSearchParams(window.location.search);
  const isEditMode = searchParams.get("edit") === "true";
  const editingSurveyId = searchParams.get("surveyId");

  // Original 12 professional exit survey questions
  const initialQuestions = [
    {
      type: "mcq",
      question: "What is the primary reason for your departure?",
      options: [
        "Better opportunity",
        "Work-life balance",
        "Career advancement",
        "Compensation",
        "Other",
      ],
      isEditing: false,
    },
    {
      type: "mcq",
      question: "How would you rate your overall experience working at the company?",
      options: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
      isEditing: false,
    },
    {
      type: "mcq",
      question: "Did you feel that your contributions were recognized by management?",
      options: ["Yes", "No", "Sometimes", "Not Sure"],
      isEditing: false,
    },
    {
      type: "mcq",
      question: "How satisfied were you with the opportunities for professional growth?",
      options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
      isEditing: false,
    },
    {
      type: "text",
      question: "What was the most positive aspect of your job?",
      isEditing: false,
    },
    {
      type: "text",
      question: "What was the most challenging aspect of your job?",
      isEditing: false,
    },
    {
      type: "mcq",
      question: "How likely are you to recommend our company as a place to work?",
      options: ["Definitely", "Probably", "Not Sure", "Probably Not", "Definitely Not"],
      isEditing: false,
    },
    {
      type: "mcq",
      question: "Did you feel that the workload was manageable?",
      options: ["Yes", "No", "Sometimes"],
      isEditing: false,
    },
    {
      type: "mcq",
      question: "How effective was the communication within the organization?",
      options: ["Very Effective", "Effective", "Neutral", "Ineffective", "Very Ineffective"],
      isEditing: false,
    },
    {
      type: "mcq",
      question: "Were you provided with adequate tools and resources to perform your job?",
      options: ["Yes", "No", "Partially"],
      isEditing: false,
    },
    {
      type: "mcq",
      question: "Would you consider returning to the company in the future?",
      options: ["Yes", "No", "Maybe"],
      isEditing: false,
    },
    {
      type: "textarea",
      question: "Please share any additional comments or suggestions for improvement.",
      isEditing: false,
    },
  ];

  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState(initialQuestions);
  const [responses, setResponses] = useState({}); // Keyed by question index

  // States for editing question text and (if MCQ) options
  const [editingTexts, setEditingTexts] = useState({});
  const [editingOptions, setEditingOptions] = useState({});

  // States for adding a new question
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [newQuestionType, setNewQuestionType] = useState("mcq");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionOptions, setNewQuestionOptions] = useState(["Option 1", "Option 2"]);

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
        0: "Compensation",
        1: "Good",
        2: "Yes",
        3: "Satisfied",
        4: "I enjoyed the collaborative environment.",
        5: "Communication issues sometimes arose.",
        6: "Probably",
        7: "Yes",
        8: "Effective",
        9: "Yes",
        10: "Maybe",
        11: "More transparent communication would help.",
      };
      setResponses(existingResponses);
    }
  }, [userId, isEditMode]);

  const handleInputChange = (index, value) => {
    setResponses((prev) => ({ ...prev, [index]: value }));
  };

  const handleRating = (index, ratingValue) => {
    setResponses((prev) => ({ ...prev, [index]: ratingValue }));
  };

  // Start editing a question; if it's MCQ, load its options for editing
  const startEditingQuestion = (index) => {
    setEditingTexts((prev) => ({ ...prev, [index]: questions[index].question }));
    if (questions[index].type === "mcq") {
      setEditingOptions((prev) => ({ ...prev, [index]: questions[index].options || [] }));
    }
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, isEditing: true } : q))
    );
  };

  // Save edited question text and options (if MCQ)
  const saveEditingQuestion = (index) => {
    const newText = editingTexts[index];
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i === index) {
          if (q.type === "mcq") {
            return { ...q, question: newText, options: editingOptions[index] || [], isEditing: false };
          } else {
            return { ...q, question: newText, isEditing: false };
          }
        }
        return q;
      })
    );
    setEditingTexts((prev) => {
      const newEditing = { ...prev };
      delete newEditing[index];
      return newEditing;
    });
    setEditingOptions((prev) => {
      const newEditing = { ...prev };
      delete newEditing[index];
      return newEditing;
    });
  };

  // Cancel editing a question
  const cancelEditingQuestion = (index) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, isEditing: false } : q))
    );
    setEditingTexts((prev) => {
      const newEditing = { ...prev };
      delete newEditing[index];
      return newEditing;
    });
    setEditingOptions((prev) => {
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
    setEditingTexts((prev) => {
      const newEditing = { ...prev };
      delete newEditing[index];
      return newEditing;
    });
    setEditingOptions((prev) => {
      const newEditing = { ...prev };
      delete newEditing[index];
      return newEditing;
    });
  };

  // Drag and drop handler for reordering questions
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newQuestions = Array.from(questions);
    const [removed] = newQuestions.splice(result.source.index, 1);
    newQuestions.splice(result.destination.index, 0, removed);
    setQuestions(newQuestions);
  };


  // Handler for saving a new question from the add form
  const handleAddQuestion = () => {
    let newQuestion = {
      type: newQuestionType,
      question: newQuestionText,
      isEditing: false,
    };
    if (newQuestionType === "mcq") {
      newQuestion.options = newQuestionOptions;
    }
    setQuestions((prev) => [...prev, newQuestion]);
    // Reset new question form states
    setNewQuestionType("mcq");
    setNewQuestionText("");
    setNewQuestionOptions(["Option 1", "Option 2"]);
    setAddingQuestion(false);
  };

  // Render the form to add a new question
  const renderAddQuestionForm = () => (
    <Box p={4} borderWidth={1} borderRadius="md" mb={4}>
      <Text fontSize="lg" mb={2}>
        Add New Question
      </Text>
      <FormControl mb={2}>
        <FormLabel>Question Type</FormLabel>
        <Select
          value={newQuestionType}
          onChange={(e) => {
            const value = e.target.value;
            setNewQuestionType(value);
            if (value === "mcq") {
              setNewQuestionOptions(["Option 1", "Option 2"]);
            }
          }}
        >
          <option value="mcq">MCQ</option>
          <option value="text">Written</option>
          <option value="rating">Rating</option>
          <option value="textarea">Paragraph</option>
        </Select>
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Question Text</FormLabel>
        <Input
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
          placeholder="Enter your question here"
        />
      </FormControl>
      {newQuestionType === "mcq" && (
        <Box mb={2}>
          <Text mb={1}>MCQ Options:</Text>
          <VStack spacing={2} align="start">
            {newQuestionOptions.map((option, idx) => (
              <HStack key={idx}>
                <Input
                  value={option}
                  onChange={(e) => {
                    const optionsCopy = [...newQuestionOptions];
                    optionsCopy[idx] = e.target.value;
                    setNewQuestionOptions(optionsCopy);
                  }}
                  placeholder={`Option ${idx + 1}`}
                />
                <IconButton
                  icon={<FaTrash />}
                  size="sm"
                  onClick={() => {
                    const optionsCopy = [...newQuestionOptions];
                    optionsCopy.splice(idx, 1);
                    setNewQuestionOptions(optionsCopy);
                  }}
                  aria-label="Remove option"
                />
              </HStack>
            ))}
            <Button
              size="sm"
              onClick={() =>
                setNewQuestionOptions([...newQuestionOptions, "New Option"])
              }
            >
              Add Option
            </Button>
          </VStack>
        </Box>
      )}
      <HStack spacing={4}>
        <Button onClick={handleAddQuestion} colorScheme="teal">
          Save Question
        </Button>
        <Button
          onClick={() => {
            setAddingQuestion(false);
            setNewQuestionText("");
          }}
          colorScheme="red"
        >
          Cancel
        </Button>
      </HStack>
    </Box>
  );

  // When the survey is submitted, save it and navigate to MySurveys
  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a survey object – you might add more metadata as needed.
    const surveyData = {
      id: editingSurveyId || Date.now(), // use current timestamp as id if new
      title: "Exit Survey", // Customize title as needed
      date: new Date().toISOString().split("T")[0],
      status: "Completed",
      questions,
      responses,
      user,
    };

    // Retrieve existing surveys from localStorage (if any)
    const storedSurveys = localStorage.getItem("surveys");
    const surveys = storedSurveys ? JSON.parse(storedSurveys) : [];

    // If editing, replace the survey; else, add new survey.
    let updatedSurveys;
    if (editingSurveyId) {
      updatedSurveys = surveys.map((s) =>
        s.id.toString() === editingSurveyId ? surveyData : s
      );
    } else {
      updatedSurveys = [...surveys, surveyData];
    }

    localStorage.setItem("surveys", JSON.stringify(updatedSurveys));

    // Redirect to MySurveys page using useHistory from react-router-dom v5
    history.push("/mysurveys");

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

        {/* Add New Question Form */}
        {addingQuestion ? (
          renderAddQuestionForm()
        ) : (
          <Button onClick={() => setAddingQuestion(true)} colorScheme="blue" mb={4}>
            Add New Question
          </Button>
        )}

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
                          <HStack
                            justifyContent="space-between"
                            align="center"
                            mb={2}
                          >
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
                              onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                          )}
                          {q.type === "textarea" && (
                            <Textarea
                              placeholder="Your answer"
                              value={responses[index] || ""}
                              onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                          )}
                          {q.type === "mcq" && (
                            <>
                              {q.isEditing ? (
                                <VStack align="start" spacing={2} mb={2}>
                                  {editingOptions[index]?.map((option, idx) => (
                                    <HStack key={idx}>
                                      <Input
                                        value={option}
                                        onChange={(e) => {
                                          const opts = editingOptions[index].slice();
                                          opts[idx] = e.target.value;
                                          setEditingOptions((prev) => ({ ...prev, [index]: opts }));
                                        }}
                                      />
                                      <IconButton
                                        icon={<FaTrash />}
                                        size="sm"
                                        onClick={() => {
                                          const opts = editingOptions[index].slice();
                                          opts.splice(idx, 1);
                                          setEditingOptions((prev) => ({ ...prev, [index]: opts }));
                                        }}
                                        aria-label="Remove option"
                                      />
                                    </HStack>
                                  ))}
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      const opts = editingOptions[index] ? editingOptions[index].slice() : [];
                                      opts.push("New Option");
                                      setEditingOptions((prev) => ({ ...prev, [index]: opts }));
                                    }}
                                  >
                                    Add Option
                                  </Button>
                                </VStack>
                              ) : (
                                <RadioGroup
                                  value={responses[index] || ""}
                                  onChange={(value) => handleInputChange(index, value)}
                                >
                                  <HStack spacing={4}>
                                    {q.options.map((option, idx) => (
                                      <Radio key={idx} value={option}>
                                        {option}
                                      </Radio>
                                    ))}
                                  </HStack>
                                </RadioGroup>
                              )}
                            </>
                          )}
                          {q.type === "rating" && (
                            <HStack spacing={1}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Icon
                                  key={star}
                                  as={FaStar}
                                  color={responses[index] >= star ? "teal.500" : "gray.300"}
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
          <Button type="submit" colorScheme="teal" width="full" mt={4}>
            {isEditMode ? "Update Survey" : "Submit Survey"}
          </Button>

        </form>
      </Box>
    </Flex>
  );
};

export default Survey;