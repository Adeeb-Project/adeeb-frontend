import React, {useMemo, useState} from "react";
import {Box, Button, IconButton, Table, Tbody, Td, Th, Thead, Tr,} from "@chakra-ui/react";
import {DeleteIcon, EditIcon, ViewIcon} from "@chakra-ui/icons";
import {useFilters, useSortBy, useTable} from "react-table";
import {Link, useHistory} from "react-router-dom";

const SurveyManagement = () => {
    const history = useHistory();
    const [showAddSurvey, setShowAddSurvey] = useState(false);


    const handleViewSurvey = (id) => {
        history.push(`/survey/${id}`);
    };

    const handleEditSurvey = (id) => {
        // history.push(`/survey/${id}?edit=true`);
        alert('working on it');
    }

    const [surveys, setSurveys] = useState([{id: 1, name: "Employee Feedback", created: "2024-01-10"}, {
        id: 2, name: "Customer Satisfaction", created: "2024-02-05"
    }, {id: 3, name: "Market Research", created: "2024-02-15"},]);

    const handleDelete = (id) => {
        setSurveys((prev) => prev.filter((survey) => survey.id !== id));
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
                onClick={() => handleEditSurvey(row.original.id)}
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
        <Link to="/admin/survey/addSurvey">
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
