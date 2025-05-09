import React, {use, useMemo, useState} from "react";
import {Badge, Box, Button, IconButton, 
    Table, Tbody, Td, Th, Thead, Tr, useToast,    
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure} from "@chakra-ui/react";
import {BellIcon, DeleteIcon, EditIcon, LinkIcon, ViewIcon} from "@chakra-ui/icons";
import {useFilters, useSortBy, useTable} from "react-table";
import {Link, useHistory} from "react-router-dom";
import ShareSurveyModal from "../../components/ShareSurveyModal";

const SurveyManagement = () => {
    const history = useHistory();
    const toast = useToast();
    const [isOpen,setIsOpen] = useState(false);
    const [surveyLink, setSurveyLink] = useState("");
    const { isOpen: isAlertOpen, onOpen, onClose } = useDisclosure();
    const [selectedSurveyId, setSelectedSurveyId] = useState(null);
    const cancelRef = React.useRef();

    
    React.useEffect(() => {
        const surveys_data = JSON.parse(localStorage.getItem('surveys')) || [];
        if (surveys_data.length==0 || !surveys_data.some(survey => survey.id === "employee_exit")) {
            surveys_data.push({id: "employee_exit", name: "Employee Exit Feedback Survey", created: "2021-08-01"});
        }
        if (surveys_data.length > 0) {
            setSurveys(surveys_data);
            localStorage.setItem('surveys', JSON.stringify(surveys_data));
        }
    }, []);

    const handleViewSurvey = (sid) => {
        history.push(`/admin/survey/ViewSurvey/${sid}`);
    };

    const handleEditSurvey = (sid) => {
        history.push(`/admin/survey/addSurvey/${sid}`);
    }
    const handleShareSurvey = (sid) => {
        setSurveyLink(`${window.location.origin}/#/fill-survey/${sid}`);
        setIsOpen(true);
      };
    const handleShowResponses =(sid) => {
        history.push(`/admin/survey/view-responses/${sid}`);
    };
    const [surveys, setSurveys] = useState([]);
    const getResponsesCount=(surveyId)=>{
        const res_data = JSON.parse(localStorage.getItem('res'+surveyId)) || [];
        return res_data.length;
    };
    const handleDelete = () => {
        if (selectedSurveyId) {
            setSurveys(prevSurveys => {
                const updatedSurveys = prevSurveys.filter(survey => survey.id !== selectedSurveyId);
                localStorage.setItem("surveys", JSON.stringify(updatedSurveys));
                return updatedSurveys;
            });
            localStorage.removeItem(selectedSurveyId);
            localStorage.removeItem('res'+selectedSurveyId);
            toast({
                title: "Survey Deleted",
                description: "The survey has been deleted successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
        onClose();
    };
    
    

    const columns = useMemo(() => [{
        Header: "Survey Name", accessor: "name",
    }, {
        Header: "Created Date", accessor: "created",
    }, {
        Header: "Actions", accessor: "actions", disableSortBy: true, Cell: ({row}) => {
            const surveyID = row.original.id;
            const responseCount = getResponsesCount(surveyID);
        return <>
            <IconButton
                icon={<LinkIcon />}
                size="sm"
                mr="2"
                onClick={() => handleShareSurvey(surveyID)}
            />
            <IconButton
                icon={<ViewIcon/>}
                size="sm"
                mr="2"
                onClick={() => handleViewSurvey(surveyID)} 
            />
            <IconButton
                icon={<EditIcon/>}
                size="sm"
                mr="2"
                onClick={() => handleEditSurvey(surveyID)}
            />


            {/* Counter Badge for Responses */}
            <Box position="relative" display="inline-block">
                <IconButton
                    icon={<BellIcon />}
                    size="sm"
                    mr="2"
                    onClick={() => {
                        if(responseCount > 0 ){
                            handleShowResponses(surveyID)
                        }else{
                            toast({
                                title: "No Responses Yet",
                                description: "You'll be able to see responses here once they are submitted.",
                                status: "info",
                                duration: 5000,
                                isClosable: true,
                                position: "top",
                            });
                        }
                    }
                }
                />
                {responseCount > 0 && (
                    <Badge
                        position="absolute"
                        top="-5px"
                        right="-5px"
                        colorScheme="red"
                        borderRadius="full"
                        px="2"
                        fontSize="0.7em"
                    >
                        {responseCount}
                    </Badge>
                )}
            </Box>

            <IconButton
                icon={<DeleteIcon />}
                size="sm"
                mr="2"
                colorScheme="red"
                onClick={() => {
                    setSelectedSurveyId(surveyID);
                    onOpen(); // Open confirmation dialog
                }}
            />
        </>},
    },], []);

    const data = useMemo(() => surveys || [], [surveys]); // Ensures it's always an array

    const {
        getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
    } = useTable({columns, data}, useFilters, useSortBy);

    return (<Box mt="100px" p={5} boxShadow="lg" borderRadius="lg">
        <Link to="/admin/survey/addSurvey/new">
            <Button colorScheme="blue" mx={4}>
                Add Survey
            </Button>
        </Link>
        <ShareSurveyModal isOpen={isOpen} onClose={() => setIsOpen(false)} link={surveyLink} />
        <AlertDialog
            isOpen={isAlertOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Survey
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure you want to delete this survey? <br/>
                        This action cannot be undone.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={handleDelete} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>

        <Table {...getTableProps()} variant="simple">
            <Thead>
                {headerGroups.map((headerGroup, idx) => (<Tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                    {headerGroup.headers.map((column, colIdx) => (
                        <Th {...column.getHeaderProps(column.getSortByToggleProps())} key={colIdx}>
                            {column.render("Header")}
                        </Th>))}
                </Tr>))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {rows.map((row, idx) => {
                    prepareRow(row);
                    return (<Tr {...row.getRowProps()} key={idx}>
                        {row.cells.map((cell, cellIdx) => (<Td {...cell.getCellProps()} key={cellIdx}>
                            {cell.render("Cell")}
                        </Td>))}
                    </Tr>);
                })}
            </Tbody>
        </Table>
    </Box>);
};

export default SurveyManagement;
