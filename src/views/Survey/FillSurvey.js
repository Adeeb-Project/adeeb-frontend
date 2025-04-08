import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    HStack,
    IconButton,
    Input,
    Radio,
    RadioGroup,
    Select,
    Switch,
    Text,
    VStack
} from '@chakra-ui/react';
import {Controller, useFieldArray, useForm, useWatch} from 'react-hook-form';
import {LiaStarSolid} from "react-icons/lia";
import {useHistory, useParams} from "react-router-dom";


const FillSurvey = () => {
    const history = useHistory();
    const {id} = useParams();
    const {
        control,
        getValues,
        handleSubmit,
        watch,
        setValue
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            questions: [{id: 1, questionText: '', questionType: 'text', options: [], answer: ''},],
        },
    });

    const [required, setRequired] = React.useState(false);

    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control, name: 'questions',
    });

    React.useEffect(() => {
        // alert(id);
        const savedData = localStorage.getItem(id);
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            Object.keys(parsedData).forEach((key) => {
                setValue(key, parsedData[key]); // Set each form field separately
            });
        } else {
            if (id == "employee_exit") {
                var json = `{
                    "title": "Exit Interview Survey",
                    "description": "Please share your feedback about your experience working at this company.",
                    "questions": [
                    {
                        "id": 1,
                        "questionText": "On a scale of 1 to 5, how would you rate your overall experience working at this company?",
                        "questionType": "stars",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 2,
                        "questionText": "What did you enjoy the most about working here?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 3,
                        "questionText": "What aspects of your job did you find the most challenging?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 4,
                        "questionText": "What would have made your experience at this company better?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 5,
                        "questionText": "If you could change one thing about your job, what would it be?",
                        "questionType": "text",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 6,
                        "questionText": "What are the main reasons for your decision to leave?",
                        "questionType": "multiple_choice",
                        "options": [
                        { "optionText": "Career growth opportunities" },
                        { "optionText": "Work-life balance" },
                        { "optionText": "Compensation and benefits" },
                        { "optionText": "Company culture" },
                        { "optionText": "Other" }
                        ],
                        "answer": "",
                        "selectedOption": ""
                    },
                    {
                        "id": 7,
                        "questionText": "Did any specific event or issue contribute significantly to your decision to leave?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 8,
                        "questionText": "Did you consider staying before making your decision to leave? If so, what factors influenced your final decision?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 9,
                        "questionText": "Was there anything that could have been done to keep you at the company?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 10,
                        "questionText": "How does your new opportunity compare to your role here? (e.g., compensation, career growth, work-life balance)",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 11,
                        "questionText": "How would you describe the overall work culture in the company?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 12,
                        "questionText": "Did you feel included and valued as an employee? Why or why not?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 13,
                        "questionText": "How effective was teamwork and collaboration in your department?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 14,
                        "questionText": "Were there any concerns about company policies or workplace culture that impacted your decision to leave?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 15,
                        "questionText": "Did you feel comfortable expressing concerns or ideas to management?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 16,
                        "questionText": "How would you rate the effectiveness of leadership and management within the company?",
                        "questionType": "stars",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 17,
                        "questionText": "Did you receive sufficient support and guidance from your manager(s)?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 18,
                        "questionText": "Were you provided with clear goals and expectations?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 19,
                        "questionText": "Did leadership communicate company updates and decisions transparently?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 20,
                        "questionText": "Was there a fair and consistent approach to employee feedback and evaluations?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 21,
                        "questionText": "Were there adequate career growth opportunities within the company?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 22,
                        "questionText": "Did you have access to the necessary training and development to succeed in your role?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 23,
                        "questionText": "Were performance evaluations and promotions handled fairly?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 24,
                        "questionText": "Did you feel that your skills and contributions were recognized and appreciated?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 25,
                        "questionText": "How can the company improve opportunities for employee growth and development?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 26,
                        "questionText": "How would you rate your work-life balance while working here?",
                        "questionType": "stars",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 27,
                        "questionText": "Did you experience excessive work-related stress? If so, what were the causes?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 28,
                        "questionText": "Were job expectations reasonable and clearly communicated?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 29,
                        "questionText": "Did you feel that your compensation and benefits were competitive with industry standards?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 30,
                        "questionText": "Did you receive the necessary tools and resources to perform your job effectively?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 31,
                        "questionText": "What advice would you give to improve the employee experience at this company?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 32,
                        "questionText": "Would you recommend this company as a good place to work? Why or why not?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 33,
                        "questionText": "Would you consider rejoining the company in the future if changes were made?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    },
                    {
                        "id": 34,
                        "questionText": "Is there anything else you would like to share about your experience before leaving?",
                        "questionType": "paragraph",
                        "options": [],
                        "answer": ""
                    }
                    ]
                }`;
                const parsedData = JSON.parse(json);
                Object.keys(parsedData).forEach((key) => {
                    setValue(key, parsedData[key]); // Set each form field separately
                });
            }
        }
    }, [setValue, id]);

    const onSubmit = (data) => {

        const survResponses = localStorage.getItem('res'+id);
        if (survResponses) {
            var parsed_survResponses = JSON.parse(survResponses);
        } else {
            var parsed_survResponses = [];
        }

        let new_survey = {
            id: Math.random().toString(16),
            name: data.title,
            created: new Date().toLocaleDateString(),
            response:data
        };
        parsed_survResponses.push(new_survey);
    

        localStorage.setItem('res'+id, JSON.stringify(parsed_survResponses));

        history.push(`/survey-success`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack alignItems={'center'} w="100%" spacing={0} mt="20px">

                {/* Top Green Bar */}
                <Box w={'900px'} h="10px" bg="green.600" borderTopRadius="md"/>

                {/* Form Container */}
                <Box
                    w={'900px'}
                    bg="white"
                    boxShadow="md"
                    px={'24px'}
                    py={'20px'}
                    rounded="md"
                    mt={-1}
                >
                    <FormControl>
                        <FormLabel
                            fontSize="2xl"
                            borderBottom="1px"
                            borderBottomColor="gray.300"
                            p={0}
                            mb={4}
                            color="black">
                            {watch('title') || "Survey title here"}
                        </FormLabel>
                    </FormControl>

                    <FormControl>
                        <FormLabel
                            mt={2}
                            p={0}
                            border={'none'}
                            borderBottom={'1px'}
                            fontSize={'sm'}
                            borderRadius={'none'}
                            borderBottomColor={'gray.300'}
                        >
                            {watch('description') || "Survey title here"}
                        </FormLabel>
                    </FormControl>
                </Box>

                <Box w={'900px'} h={'240px'} mt={'200px'} flex="1">
                    {fields.map((question, index) => {
                        const questionType = watch(`questions.${index}.questionType`);

                        return (
                            <Box
                                key={question.id}
                                h={'auto'}
                                my={2}
                                p={'25px'}
                                borderWidth="1px"
                                borderRadius="md"
                                boxShadow="md"
                            >

                                <HStack justifyContent="space-between">
                                    <FormControl>
                                        <FormLabel
                                            color="#9ba0a6"
                                            width={'99%'}
                                            height={'56px'}
                                            outline={'none'}
                                            border={'none'}
                                            p={'16px'}
                                            backgroundColor={'gray.100'}
                                            borderBottom={'1px'}
                                            borderRadius={'none'}
                                            borderBottomColor={'gray.500'}
                                            textColor={'gray.500'}
                                        >
                                            {watch(`questions.${index}.questionText`)}
                                        </FormLabel>
                                    </FormControl>

                                </HStack>

                                {questionType === 'text' && (
                                    <Controller
                                        name={`questions.${index}.answer`}
                                        control={control}
                                        render={({field}) => (<Input
                                                {...field}
                                                placeholder="Short answer text"
                                                _placeholder={{color: "gray.500"}}
                                                mt={'20px'}
                                                outline={'none'}
                                                border={'none'}
                                                p={'16px'}
                                                borderBottom={'1px'}
                                                borderRadius={'none'}
                                                borderBottomColor={'gray.300'}
                                                _focus={{
                                                    outline: 'none', borderBottomColor: 'gray.500',
                                                }}
                                            />
                                        )}/>
                                )
                                }

                                {questionType === 'paragraph' && (
                                    <Controller
                                        name={`questions.${index}.answer`}
                                        control={control}
                                        render={({field}) => (<Input
                                            {...field}
                                            placeholder="Long answer text"
                                            _placeholder={{color: "gray.500"}}
                                            mt={'20px'}
                                            outline={'none'}
                                            border={'none'}
                                            p={'16px'}
                                            borderBottom={'1px'}
                                            borderRadius={'none'}
                                            borderBottomColor={'gray.300'}
                                            _focus={{
                                                outline: 'none', borderBottomColor: 'gray.500',
                                            }}
                                        />)}
                                    />)}

                                {questionType === 'stars' && (
                                    <HStack mt={5}>
                                        {Array.from({length: watch(`stars.${index}.stars_count`) || 5}, (_, star) => (
                                            <IconButton
                                                key={star}
                                                icon={<LiaStarSolid/>}
                                                color={watch(`questions.${index}.answer`) >= star + 1 ? 'yellow.400' : 'gray.300'}
                                                onClick={() => setValue(`questions.${index}.answer`, star + 1)}
                                            />))}
                                    </HStack>
                                )}

                                {['multiple_choice', 'single_choice'].includes(questionType) && (
                                    <Box mt={3}>
                                        <RadioGroup
                                            onChange={(val) => setValue(`questions.${index}.selectedOption`, val)}
                                            value={watch(`questions.${index}.selectedOption`)}
                                        >
                                            {watch(`questions.${index}.options`)?.map((option, idx) => (
                                                <HStack key={idx} mb={2} mt="20px">
                                                    <Controller
                                                        name={`questions.${index}.options.${idx}.optionText`}
                                                        control={control}
                                                        render={({field}) => (
                                                            <>
                                                                {/* Prepend radio button for single_choice */}
                                                                {questionType === 'single_choice' && (
                                                                    <Radio

                                                                        value={field.value}
                                                                        onChange={(e) => {
                                                                            const selectedOptions = watch(`questions.${index}.selectedOptions`) || [];
                                                                            setValue(
                                                                                `questions.${index}.selectedOptions`,
                                                                                e.target.checked
                                                                                    ? [...selectedOptions, field.value]
                                                                                    : selectedOptions.filter(opt => opt !== field.value)
                                                                            );
                                                                        }}
                                                                    />
                                                                )}

                                                                {/* Prepend checkbox for multiple_choice */}
                                                                {questionType === 'multiple_choice' && (
                                                                    <Checkbox

                                                                        isChecked={watch(`questions.${index}.selectedOptions`)?.includes(field.value)}
                                                                        onChange={(e) => {
                                                                            const selectedOptions = watch(`questions.${index}.selectedOptions`) || [];
                                                                            setValue(
                                                                                `questions.${index}.selectedOptions`,
                                                                                e.target.checked
                                                                                    ? [...selectedOptions, field.value]
                                                                                    : selectedOptions.filter(opt => opt !== field.value)
                                                                            );
                                                                        }}
                                                                    />
                                                                )}

                                                                <HStack w="100%" justifyContent="space-between">
                                                                    {/* Input Field */}

                                                                    <Input
                                                                        {...field}
                                                                        readOnly={true}
                                                                        placeholder={`Option ${idx + 1}`}
                                                                        _placeholder={{color: "black"}}
                                                                        border="none"
                                                                        p={0}
                                                                        borderBottomWidth="1px"
                                                                        borderBottomColor="gray.300"
                                                                        _focus={{
                                                                            outline: 'none',
                                                                            borderBottomColor: 'blue.500',
                                                                        }}
                                                                        onChange={(e) => {
                                                                            field.onChange(e);
                                                                            if (questionType === 'multiple_choice') {
                                                                                setValue(`questions.${index}.selectedOption`, e.target.value);
                                                                            }
                                                                        }}
                                                                    />

                                                                </HStack>
                                                            </>
                                                        )}
                                                    />
                                                </HStack>
                                            ))}
                                        </RadioGroup>
                                    </Box>
                                )}


                            </Box>);
                    })}
                    <Button type="submit" mt={3} mb={5} colorScheme="green">
                        Submit
                    </Button>
                </Box>
            </VStack>
        </form>
    );

};

export default FillSurvey;
