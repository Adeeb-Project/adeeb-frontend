import React, {useEffect} from 'react';
import {
    Box,
    Button,
    Flex,
    FormLabel,
    HStack,
    IconButton,
    Input,
    Select,
    Switch,
    Text,
    Textarea,
    VStack
} from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {LiaStarSolid} from "react-icons/lia";
import {RiDeleteBin6Line} from "react-icons/ri";
import {MdContentCopy} from "react-icons/md";


const AddSurvey = () => {
    const {control, handleSubmit, watch, setValue} = useForm({
        defaultValues: {
            title: '', description: '', questions: [{
                id: 1, questionText: '', questionType: 'text', // Default to Short Answer
                options: [], answer: '',
            },],
        },
    });

    const [required, setRequired] = React.useState(false);

    const handleCopy = () => {
        console.log('hi')
    }

    const {fields, append, remove} = useFieldArray({
        control, name: 'questions',
    });

    const addQuestion = (type = 'text') => {
        const newId = fields.length + 1;
        append({
            id: newId, questionText: '', questionType: type, options: [], answer: '',
        });
    };

    const deleteQuestion = (index) => {
        remove(index);
        console.log(required)

    };

    const addOption = (questionIndex) => {
        const options = watch(`questions.${questionIndex}.options`) || [];
        setValue(`questions.${questionIndex}.options`, [...options, {optionText: ''}]);
    };

    useEffect(() => {
        console.log(required)
    }, [required]);

    const onSubmit = (data) => {
        console.log('Form Data:', data);
    };

    return (<form onSubmit={handleSubmit(onSubmit)}>
        <VStack w="100%" spacing={0} mt="100px">
            {/* Top Green Bar */}
            <Box w="100%" h="10px" maxW={'900px'} bg="green.600" borderTopRadius="md"/>

            {/* Form Container */}
            <Box
                w="100%"
                maxW="900px"
                bg="white"
                boxShadow="md"
                p={8}
                rounded="md"
                mt={-1}
            >
                <Controller
                    name="title"
                    control={control}
                    render={({field}) => (<Input
                        {...field}
                        placeholder='Untitled form'
                        fontSize="3xl"
                        fontWeight="bold"
                        border="none"
                        border-radius={'none'}
                        _focus={{outline: "none", borderBottom: "2px solid purple"}}
                    />)}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => (<Textarea
                        {...field}
                        mt={2}
                        color="gray.500"
                        placeholder="Form description"
                        border="none"
                        border-radius={'none'}
                        _focus={{outline: "none", borderBottom: "2px solid purple"}}
                    />)}
                />
            </Box>
        </VStack>
        <Flex p={5} mt="30px" alignItems="start">
            <Box flex="1" mr={5}>
                {fields.map((question, index) => {
                    const questionType = watch(`questions.${index}.questionType`);

                    return (<Box
                        key={question.id}
                        p="20px"
                        mb={5}
                        borderWidth="1px"
                        borderRadius="md"
                        boxShadow="md"
                    >
                        <Text mt={3} pl="16px">
                            Question
                        </Text>

                        <HStack justifyContent="space-between" mt="30px">
                            <Controller
                                name={`questions.${index}.questionText`}
                                control={control}
                                render={({field}) => (<Input
                                    {...field}
                                    placeholder="Enter your question"
                                    border="none"
                                    borderBottomWidth="1px"
                                    borderBottomColor="gray.300"
                                    _focus={{
                                        outline: 'none', borderBottomColor: 'blue.500',
                                    }}
                                />)}
                            />

                            <Controller
                                name={`questions.${index}.questionType`}
                                control={control}
                                render={({field}) => (<Select
                                    {...field}
                                    w="30%"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        const selectedValue = e.target.value;
                                        setValue(`questions.${index}.questionType`, selectedValue);
                                        setValue(`questions.${index}.answer`, '');
                                        setValue(`questions.${index}.options`, []);
                                    }}
                                >
                                    <option value="text">Short Answer</option>
                                    <option value="paragraph">Paragraph</option>
                                    <option value="multiple_choice">Multiple Choice</option>
                                    <option value="checkboxes">Checkboxes</option>
                                    <option value="stars">Stars</option>
                                </Select>)}
                            />
                        </HStack>

                        {questionType === 'text' && (<Controller
                            name={`questions.${index}.answer`}
                            control={control}
                            render={({field}) => (<Input
                                {...field}
                                placeholder="Short Answer"
                                border="none"
                                mt={'30px'}
                                borderBottomWidth="1px"
                                borderBottomColor="gray.300"
                                _focus={{
                                    outline: 'none', borderBottomColor: 'blue.500',
                                }}
                            />)}
                        />)}

                        {questionType === 'paragraph' && (<Controller
                            name={`questions.${index}.answer`}
                            control={control}
                            render={({field}) => (<Textarea
                                {...field}
                                placeholder="Paragraph"
                                mt={'30px'}
                                border="none"
                                borderBottomWidth="1px"
                                borderBottomColor="gray.300"
                                _focus={{
                                    outline: 'none', borderBottomColor: 'blue.500',
                                }}
                            />)}
                        />)}

                        {questionType === 'stars' && (<Box>
                            <Controller
                                name={`stars.${index}.stars_count`}
                                control={control}
                                render={({field}) => (<Select
                                    {...field}
                                    w="8%"
                                    pl={'16px'}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        const selectedValue = e.target.value;
                                        setValue(`stars.${index}.stars_count`, selectedValue);
                                        setValue(`questions.${index}.answer`, '');
                                        setValue(`star_value`, Array.from({length: selectedValue}, (_, i) => i + 1));
                                    }}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </Select>)}
                            />
                            {Array.from({length: watch(`stars.${index}.stars_count`) || 0}, (_, star) => (<IconButton
                                key={star}
                                icon={<LiaStarSolid/>}
                                color={watch(`questions.${index}.answer`) >= star + 1 ? 'yellow.400' : 'gray.300'}
                                onClick={() => setValue(`questions.${index}.answer`, star + 1)}
                            />))}
                        </Box>)}

                        {['multiple_choice', 'checkboxes'].includes(questionType) && (<Box mt={3}>
                            {watch(`questions.${index}.options`)?.map((option, idx) => (
                                <HStack key={idx} mb={2} mt="20px">
                                    <Controller
                                        name={`questions.${index}.options.${idx}.optionText`}
                                        control={control}
                                        render={({field}) => (<Input
                                            {...field}
                                            placeholder={`Option ${idx + 1}`}
                                            border="none"
                                            borderBottomWidth="1px"
                                            borderBottomColor="gray.300"
                                            _focus={{
                                                outline: 'none', borderBottomColor: 'blue.500',
                                            }}
                                        />)}
                                    />
                                </HStack>))}
                            <Button size="sm" onClick={() => addOption(index)} mt="20px">
                                Add Option
                            </Button>
                        </Box>)}

                        <Box w="100%" h="3px" mt={'40px'} bg="gray.300"/>

                        <HStack justifyContent={'flex-end'} mt={'20px'}>

                            <Box>
                                <IconButton
                                    icon={<MdContentCopy/>}
                                    size="lg"
                                    aria-label={`Copy question ${index + 1}`}
                                    onClick={() => handleCopy()}
                                    variant="ghost"
                                    mr={0}
                                />

                                <IconButton
                                    icon={<RiDeleteBin6Line/>}
                                    size="lg"
                                    onClick={() => deleteQuestion(index)}
                                    aria-label={`Delete question ${index + 1}`}
                                    variant="ghost"
                                    mr={0}

                                />
                            </Box>

                            <Box w="2px" h="20px" mt={'3px'} bg="gray.300"/>

                            <HStack>
                                <FormLabel ml={'7px'} mb="0" fontWeight={'light'} fontSize={'xs'}>
                                    Required
                                </FormLabel>
                                <Switch colorScheme="blue" size="md" onChange={
                                    (e) => {
                                        const isChecked = event.target.checked;
                                        setRequired(isChecked);
                                    }
                                }/>
                            </HStack>

                        </HStack>

                    </Box>);
                })}

                <Button
                    leftIcon={<AddIcon/>}
                    className="fixed bottom-10 right-10 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700"
                    onClick={() => addQuestion()}>
                    Add Question
                </Button>
                <Button type="submit" mt={3} ml={3} colorScheme="green">
                    Submit
                </Button>
            </Box>
        </Flex>
    </form>);
};

export default AddSurvey;
