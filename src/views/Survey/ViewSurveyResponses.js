import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormLabel,
  HStack,
  IconButton,
  Radio,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";
import { LiaStarSolid } from "react-icons/lia";
import { useParams } from "react-router-dom";

const ViewSurveyResponses = () => {
  const { id } = useParams();
  const [surveyData, setSurveyData] = useState(null);

  useEffect(() => {
    const surveyData = localStorage.getItem(id);
    if (surveyData) {
        const data = JSON.parse(surveyData);
        const surveyResponses = localStorage.getItem('res'+id); 
        if(surveyResponses){
            const responses = JSON.parse(surveyResponses);
            responses.forEach(row => {
                const questions = row.response.questions;
                questions.forEach(question => {
                    if(question.questionType=='text'){
                        data.questions.forEach(surQuestion => {
                            if(surQuestion.questionType=='text' && surQuestion.id==question.id){
                                if(surQuestion.answers)
                                    surQuestion.answers.push(question.answer);//if not exist then create answers array
                                else
                                    surQuestion.answers=[question.answer];//if not exist then create answers array
                            }
                        });
                    }
                    if(question.questionType=='paragraph'){
                        data.questions.forEach(surQuestion => {
                            if(surQuestion.questionType=='paragraph' && surQuestion.id==question.id){
                                if(surQuestion.answers)
                                    surQuestion.answers.push(question.answer);//if not exist then create answers array
                                else
                                    surQuestion.answers=[question.answer];//if not exist then create answers array
                            }
                        });
                    }
                    if(question.questionType=='multiple_choice'){
                        data.questions.forEach(surQuestion => {
                            if(surQuestion.questionType=='multiple_choice' && surQuestion.id==question.id){
                                surQuestion.options.forEach(option => {
                                    if(question.selectedOptions?.includes(option.optionText)){
                                        if(option.counts){
                                            option.counts++;
                                        }else{
                                            option.counts=1;
                                        }
                                    }
                                });
                            }
                        });
                    }
                    if(question.questionType=='single_choice'){
                        data.questions.forEach(surQuestion => {
                            if(surQuestion.questionType=='single_choice' && surQuestion.id==question.id){
                                surQuestion.options.forEach(option => {
                                    if(question.selectedOptions?.includes(option.optionText)){
                                        if(option.counts){
                                            option.counts++;
                                        }else{
                                            option.counts=1;
                                        }
                                    }
                                });
                            }
                        });
                    }
                    if(question.questionType=='stars'){
                        data.questions.forEach(surQuestion => {
                            if(surQuestion.questionType=='stars' && surQuestion.id==question.id){
                                if(surQuestion.stars_count){
                                    if(surQuestion.stars_count[question.answer]){
                                        surQuestion.stars_count[question.answer]++;
                                    } else {
                                        surQuestion.stars_count[question.answer] = 1;
                                    }
                                } else {
                                    surQuestion.stars_count = { [question.answer]: 1 };
                                }
                            }
                        });
                    }
                });

            });
        }
        setSurveyData(data);
    }
  }, [id]);

  if (!surveyData) return <p>Loading...</p>;

return (
    <VStack alignItems="center" w="100%" spacing={0} mt="100px">
        <Box w="900px" h="10px" bg="green.600" borderTopRadius="md" />
        <Box w="900px" bg="white" boxShadow="md" px="24px" py="20px" rounded="md" mt={-1}>
            <FormLabel fontSize="2xl">{surveyData.title}</FormLabel>
            <FormLabel fontSize="sm" mt={2}>{surveyData.description}</FormLabel>
        </Box>

        <Box w="900px" mt="50px">
            {surveyData.questions?.map((question, index) => (
                <Box key={index} p="25px" borderWidth="1px" borderRadius="md" boxShadow="md" mb={2}>
                    <FormLabel>{index + 1}. {question.questionText}</FormLabel>

                    {question.questionType === "text" && (
                        question?.answers?.map((answer, idx) => (
                            <FormLabel key={idx}>{answer}</FormLabel>
                        ))
                    )}
                    {question.questionType === "paragraph" && (
                        question?.answers?.map((answer, idx) => (
                            <FormLabel key={idx}>{answer}</FormLabel>
                        ))
                    )}

                    {question.questionType === "stars" && (
                        <>
                            {Array.from({ length: 5 }, (_, i) => i + 1).reverse().map((starCount) => (
                                <HStack key={starCount} mt={3}>
                                    <FormLabel>({question?.stars_count?.[starCount] || 0})</FormLabel>
                                    {Array.from({ length: starCount }).map((_, star) => (
                                        <IconButton
                                            key={star}
                                            icon={<LiaStarSolid />}
                                            color={starCount >= star + 1 ? "yellow.400" : "gray.300"}
                                        />
                                    ))}
                                </HStack>
                            ))}
                        </>
                    )}

                    {["multiple_choice", "single_choice"].includes(question.questionType) && (
                        <RadioGroup value={question.selectedOption}>
                            {question.options?.map((option, idx) => (
                                <HStack key={idx} mb={2}>
                                    {question.questionType === "single_choice" && <Radio />}
                                    {question.questionType === "multiple_choice" && <Checkbox />}
                                    <FormLabel>{option.optionText} ({option.counts || 0})</FormLabel>
                                </HStack>
                            ))}
                        </RadioGroup>
                    )}
                </Box>
            ))}
        </Box>
    </VStack>
);
};

export default ViewSurveyResponses;
