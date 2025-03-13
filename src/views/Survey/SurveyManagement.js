import React, {useMemo, useState} from "react";
import {Box, Button, IconButton, Table, Tbody, Td, Th, Thead, Tr,} from "@chakra-ui/react";
import {DeleteIcon, EditIcon, ViewIcon} from "@chakra-ui/icons";
import {useFilters, useSortBy, useTable} from "react-table";
import {Link, useHistory} from "react-router-dom";

const SurveyManagement = () => {
    const history = useHistory();

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

    const [surveys, setSurveys] = useState([]);

    const handleDelete = (sid) => {
        setSurveys((prevSurveys) => {
            const updatedSurveys = prevSurveys.filter((survey) => survey.id !== sid);
            localStorage.setItem('surveys', JSON.stringify(updatedSurveys)); // Save updated list
            return updatedSurveys;
        });
    
        localStorage.removeItem(`${sid}`);
    };
    

    const columns = useMemo(() => [{
        Header: "Survey Name", accessor: "name",
    }, {
        Header: "Created Date", accessor: "created",
    }, {
        Header: "Actions", accessor: "actions", disableSortBy: true, Cell: ({row}) => (<>
            <IconButton
                icon={<ViewIcon/>}
                size="sm"
                mr="2"
                onClick={() => handleViewSurvey(row.original.id)} 
            />
            <IconButton
                icon={<EditIcon/>}
                size="sm"
                mr="2"
                onClick={() => handleEditSurvey(row.original.id)} /* why id is object of history etc? */
            />
            <IconButton
                icon={<DeleteIcon/>}
                size="sm"
                colorScheme="red"
                onClick={() => handleDelete(row.original.id)}
            />
        </>),
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
