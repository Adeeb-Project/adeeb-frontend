import React from 'react';
import {
    Box, Button, Checkbox, FormLabel, HStack, IconButton, Input, Radio, RadioGroup, Select, Switch, VStack
} from '@chakra-ui/react';
import {AddIcon} from '@chakra-ui/icons';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {LiaStarSolid} from "react-icons/lia";
import {RiDeleteBin6Line} from "react-icons/ri";
import {MdContentCopy} from "react-icons/md";
import { ImCross } from "react-icons/im";




const AddSurvey = () => {
    const {control,
        getValues,
        handleSubmit,
        watch,
        setValue} = useForm({
        defaultValues: {
            title: '', description: '', questions: [{id: 1, questionText: '', questionType: 'text', options: [], answer: ''},],
        },
    });

    const [required, setRequired] = React.useState(false);

    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control, name: 'questions',});

    const handleCopy = (index) => {
        const field = watch(`questions`)[index];
        if (field) {
            const newId = fields.length + 1;
            append({
                id: newId,
                questionText: field.questionText,
                questionType: field.questionType,
                options: field.options,
                answer: field.answer,
            });
        }
    };

    const deleteOption = (questionIndex, optionIndex) => {
        const options = watch(`questions.${questionIndex}.options`) || [];

        if (options.length > 1) {  // Prevent deleting if only one option remains
            const updatedOptions = options.filter((_, i) => i !== optionIndex);
            setValue(`questions.${questionIndex}.options`, updatedOptions);
        }
    };

    const addQuestion = (type = 'text') => {
        const newId = fields.length + 1;
        append({
            id: newId, questionText: '', questionType: type, options: [], answer: '',
        });
    };
    

    const deleteQuestion = (index) => {
        remove(index);

    };


    const onSubmit = (data) => {
        console.log('Form Data:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <VStack alignItems={'center'} w="100%" spacing={0} mt="100px">


            {/* Top Green Bar */}
            <Box w={'770px'} h="10px" maxW={'900px'} bg="green.600" borderTopRadius="md"/>

            {/* Form Container */}
            <Box
                w={'770px'}
                maxW="900px"
                bg="white"
                boxShadow="md"
                px={'24px'}
                py={'20px'}
                rounded="md"
                mt={-1}
            >
                <Controller
                    name="title"
                    control={control}
                    render={({field}) => (
                        <Input
                        {...field}
                        placeholder='Untitled form'
                        _placeholder={{ color: "black" }}
                        outline={'none'}
                        border={'none'}
                        borderBottom={'1px'}
                        borderRadius={'none'}
                        borderBottomColor={'gray.300'}
                        p={0}
                        fontSize="2xl"
                        _focus={{
                            outline: 'none', borderBottomColor: 'black',
                        }}
                    />)}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({field}) => (
                        <Input
                        {...field}
                        mt={2}
                        p={0}
                        color="black"
                        placeholder="Form description"
                        _placeholder={{
                            color:'gray.500'
                        }}
                        outline={'none'}
                        border={'none'}
                        borderBottom={'1px'}
                        fontSize={'sm'}
                        borderRadius={'none'}
                        borderBottomColor={'gray.300'}
                        _focus={{
                            outline: 'none', borderBottomColor: 'black',
                        }}
                    />)}
                />
            </Box>

            <Box w={'770px'} h={'240px'} mt={'200px'} flex="1" >
                {fields.map((question, index) => {
                    const questionType = watch(`questions.${index}.questionType`);

                    return (
                        <Box
                        key={question.id}
                        h={'auto'}
                        mt={8}
                        mb={5}
                        p={'25px'}
                        borderWidth="1px"
                        borderRadius="md"
                        boxShadow="md"
                    >

                        <HStack justifyContent="space-between">
                            <Controller
                                name={`questions.${index}.questionText`}
                                control={control}
                                render={({field}) => (
                                    <Input
                                    {...field}
                                    placeholder="Question"
                                    _placeholder={{ color: "#9ba0a6" }}
                                    width={'60%'}
                                    height={'56px'}
                                    outline={'none'}
                                    border={'none'}
                                    p={'16px'}
                                    backgroundColor={'gray.100'}
                                    borderBottom={'1px'}
                                    borderRadius={'none'}
                                    borderBottomColor={'gray.500'}
                                    _focus={{
                                        borderRadius:'none', outline: 'none', borderBottomColor: 'gray.700',
                                    }}
                                />
                                )}
                            />

                            <Controller
                                name={`questions.${index}.questionType`}
                                control={control}
                                render={({field}) => (
                                    <Select
                                    {...field}
                                    w="30%"
                                    height={'48px'}
                                    position={'relative'}
                                    top={'-4px'}
                                    verticalAlign={'top'}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        const selectedValue = e.target.value;
                                        setValue(`questions.${index}.questionType`, selectedValue);
                                        setValue(`questions.${index}.answer`, '');
                                        setValue(`questions.${index}.options`, []);
                                    }}
                                >
                                    <option value="text"> Short Answer</option>
                                    <option value="paragraph">Paragraph</option>
                                    <option value="multiple_choice">Multiple Choice</option>
                                    <option value="checkboxes">Checkboxes</option>
                                    <option value="stars">Ratings</option>
                                </Select>)}
                            />
                        </HStack>

                        {questionType === 'text' && (<Controller
                            name={`questions.${index}.answer`}
                            control={control}
                            render={({field}) => (<Input
                                {...field}
                                placeholder="Short answer text"
                                _placeholder={{ color: "gray.500" }}
                                mt={'20px'}
                                outline={'none'}
                                border={'none'}
                                p={0}
                                borderBottom={'1px'}
                                borderRadius={'none'}
                                borderBottomColor={'gray.300'}
                                _focus={{
                                    outline: 'none', borderBottomColor: 'gray.500',
                                }}
                            />)}
                        />)}

                        {questionType === 'paragraph' && (
                            <Controller
                            name={`questions.${index}.answer`}
                            control={control}
                            render={({field}) => (<Input
                                {...field}
                                placeholder="Long answer text"
                                _placeholder={{ color: "gray.500" }}
                                mt={'20px'}
                                outline={'none'}
                                border={'none'}
                                p={0}
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
                            <Controller
                                name={`stars.${index}.stars_count`}
                                control={control}
                                defaultValue={'5'}
                                render={({field}) => (
                                    <Select
                                    {...field}
                                    w="10%"
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
                            {Array.from({length: watch(`stars.${index}.stars_count`) || 5}, (_, star) => (
                                <IconButton
                                key={star}
                                icon={<LiaStarSolid/>}
                                color={watch(`questions.${index}.answer`) >= star + 1 ? 'yellow.400' : 'gray.300'}
                                onClick={() => setValue(`questions.${index}.answer`, star + 1)}
                            />))}
                            </HStack>
                        )}

                            {['multiple_choice', 'checkboxes'].includes(questionType) && (
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
                                                    render={({ field }) => (
                                                        <>
                                                            {/* Prepend radio button for multiple-choice */}
                                                            {questionType === 'multiple_choice' && (
                                                                <Radio
                                                                    disabled
                                                                    value={field.value}
                                                                    onChange={() => setValue(`questions.${index}.selectedOption`, field.value)}
                                                                />
                                                            )}

                                                            {/* Prepend checkbox for checkboxes */}
                                                            {questionType === 'checkboxes' && (
                                                                <Checkbox
                                                                    disabled
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
                                                                placeholder={`Option ${idx + 1}`}
                                                                _placeholder={{ color: "black" }}
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

                                                                <ImCross
                                                                    fontSize={'10px'}
                                                                    cursor="pointer"
                                                                    onClick={() => {
                                                                        deleteOption(index, idx)
                                                                    }}
                                                                    aria-label={`Delete Option ${idx + 1}`}
                                                                />



                                                            </HStack>
                                                        </>
                                                    )}
                                                />
                                            </HStack>
                                        ))}
                                    </RadioGroup>

                                    {/* Add Option Button */}
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            const options = watch(`questions.${index}.options`) || [];
                                            setValue(`questions.${index}.options`, [...options, { optionText: '' }]);
                                        }}
                                        mt="20px"
                                    >
                                        Add Option
                                    </Button>
                                </Box>
                            )}

                        <Box w="100%" h="1px" mt={'40px'} bg="gray.300"/>

                        <HStack justifyContent={'flex-end'} mt={'20px'}>

                            <Box>
                                <IconButton
                                    icon={<MdContentCopy/>}
                                    fontSize={'20px'}
                                    aria-label={`Copy question ${index + 1}`}
                                    onClick={() => handleCopy(index)}
                                    variant="ghost"
                                    mr={0}
                                />

                                <IconButton
                                    icon={<RiDeleteBin6Line/>}
                                    fontSize={'20px'}
                                    onClick={() => deleteQuestion(index)}
                                    aria-label={`Delete question ${index - 1}`}
                                    variant="ghost"
                                    mr={0}
                                    ml={'10px'}

                                />
                            </Box>

                            <Box w="1px" h="40px" mt={'3px'} bg="gray.300"/>

                            <HStack>
                                <FormLabel ml={'7px'} mb="0" fontWeight={'light'} fontSize={'sm'}>
                                    Required
                                </FormLabel>
                                <Switch colorScheme="blue" size="md" onChange={(e) => {
                                    const isChecked = event.target.checked;
                                    setRequired(isChecked);
                                }}/>
                            </HStack>

                        </HStack>

                    </Box>);
                })}

                <Button
                    leftIcon={<AddIcon/>}
                    mt={'12px'}
                    className="fixed bottom-10 right-10 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700"
                    onClick={() => addQuestion()}>
                    Add Question
                </Button
                >
                <Button type="submit" mt={3} ml={3} colorScheme="green">
                    Submit
                </Button>
            </Box>
            </VStack>
    </form>
    );

};

export default AddSurvey;
