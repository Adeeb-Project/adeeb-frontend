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
  const [responses, setResponses] = useState({});
  const [editingTexts, setEditingTexts] = useState({});
  const [editingOptions, setEditingOptions] = useState({});
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [newQuestionType, setNewQuestionType] = useState("mcq");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionOptions, setNewQuestionOptions] = useState(["Option 1", "Option 2"]);

  useEffect(() => {
    setUser({
      id: userId,
      name: "Abdulaziz",
      position: "Software Engineer",
      company: "Tech Corp",
      duration: "2 years",
    });

    if (isEditMode) {
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

  const startEditingQuestion = (index) => {
    setEditingTexts((prev) => ({ ...prev, [index]: questions[index].question }));
    if (questions[index].type === "mcq") {
      setEditingOptions((prev) => ({ ...prev, [index]: questions[index].options || [] }));
    }
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, isEditing: true } : q))
    );
  };

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

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newQuestions = Array.from(questions);
    const [removed] = newQuestions.splice(result.source.index, 1);
    newQuestions.splice(result.destination.index, 0, removed);
    setQuestions(newQuestions);
  };

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
    setNewQuestionType("mcq");
    setNewQuestionText("");
    setNewQuestionOptions(["Option 1", "Option 2"]);
    setAddingQuestion(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedQuestions = questions.map((q, index) => {
      let questionType = "TextQuestion";
      if (q.type === "mcq") questionType = "MultipleChoiceQuestion";
      else if (q.type === "rating") questionType = "RatingQuestion";
      return {
        id: index,
        text: q.question,
        questionType,
      };
    });

    const surveyData = {
      surveyId: editingSurveyId ? Number(editingSurveyId) : 0,
      title: "Exit Survey",
      description: "Survey to collect feedback from employees.",
      expiryDate: "2025-03-17T23:00:52.086Z",
      questions: formattedQuestions,
    };

    try {
      const response = await fetch("https://server.adeebcompany.com/api/survey/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      });

      if (response.ok) {
        alert("Survey submitted successfully!");
        history.push("/mysurveys");
      } else {
        const errorMessage = await response.text();
        alert(`Failed to submit survey: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("An error occurred while submitting the survey.");
    }
  };

  const renderAddQuestionForm = () => (
    <Box p={4} borderWidth={1} borderRadius="md" mb={4}>
      <Text fontSize="lg" mb={2}>Add New Question</Text>
      <FormControl mb={2}>
        <FormLabel>Question Type</FormLabel>
        <Select value={newQuestionType} onChange={(e) => {
          const value = e.target.value;
          setNewQuestionType(value);
          if (value === "mcq") {
            setNewQuestionOptions(["Option 1", "Option 2"]);
          }
        }}>
          <option value="mcq">MCQ</option>
          <option value="text">Written</option>
          <option value="rating">Rating</option>
          <option value="textarea">Paragraph</option>
        </Select>
      </FormControl>
      <FormControl mb={2}>
        <FormLabel>Question Text</FormLabel>
        <Input value={newQuestionText} onChange={(e) => setNewQuestionText(e.target.value)} />
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
            <Button size="sm" onClick={() => setNewQuestionOptions([...newQuestionOptions, "New Option"])}>
              Add Option
            </Button>
          </VStack>
        </Box>
      )}
      <HStack spacing={4}>
        <Button onClick={handleAddQuestion} colorScheme="teal">Save Question</Button>
        <Button onClick={() => setAddingQuestion(false)} colorScheme="red">Cancel</Button>
      </HStack>
    </Box>
  );

  if (!user) return <Text>Loading...</Text>;

  return (
    <Flex direction="column" align="center" p={4}>
      <Text fontSize="2xl" mb={6}>
        {isEditMode ? "Edit Exit Survey" : `Exit Survey for ${user.name}`}
      </Text>
      <Box width="100%" maxWidth="800px" p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <VStack spacing={4} align="start" mb={6}>
          <Text><strong>Position:</strong> {user.position}</Text>
          <Text><strong>Company:</strong> {user.company}</Text>
          <Text><strong>Duration:</strong> {user.duration}</Text>
        </VStack>

        {addingQuestion ? renderAddQuestionForm() : (
          <Button onClick={() => setAddingQuestion(true)} colorScheme="blue" mb={4}>
            Add New Question
          </Button>
        )}

        <form onSubmit={handleSubmit}>
          {/* Drag-and-drop and rendering logic here... */}
          {/* You already have the rest complete above – omitted here for brevity */}
        </form>
      </Box>
    </Flex>
  );
};

export default Survey;
