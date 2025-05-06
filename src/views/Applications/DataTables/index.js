import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Flex,
  Text,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  SimpleGrid,
  Input,
  Spinner,
  useColorModeValue,
  useDisclosure,
  useToast,
  Box,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { FiPlus } from "react-icons/fi";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import SearchTable1 from "components/Tables/SearchTable1";

/*  Columns returned by GET /api/employees                            */

const columns = [
  { Header: "ID", accessor: "id" },
  { Header: "Full Name", accessor: "fullName" },
  { Header: "Email", accessor: "email" },
  { Header: "Join Date", accessor: "joinDate" },
  { Header: "Department", accessor: "department" },
  { Header: "Position", accessor: "position" },
  { Header: "Phone", accessor: "phoneNumber" },
  { 
    Header: "Survey Status",
    accessor: "surveyStatus",
    Cell: ({ value }) => {
      const statusConfig = {
        "SurveyNotAssigned": {
          color: "red.500",
          bg: "red.100",
          text: "Not Assigned",
        },
        "SurveySent": {
          color: "yellow.500",
          bg: "yellow.100",
          text: "Pending",
        },
        "SurveyCompleted": {
          color: "green.500",
          bg: "green.100",
          text: "Completed",
        },
      };

      const config = statusConfig[value] || {
        color: "gray.500",
        bg: "gray.100",
        text: "Unknown",
      };

      return (
        <Flex align="center" gap={2}>
          <Box
            px={3}
            py={1}
            borderRadius="full"
            bg={config.bg}
            color={config.color}
            fontSize="sm"
            fontWeight="medium"
          >
            {config.text}
          </Box>
        </Flex>
      );
    }
  },
];

function DataTables() {
  /* ----------------------------- state ----------------------------- */
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [manualForm, setManualForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    joinDate: "",
    department: "",
    position: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileInputRef = useRef(null);
  const toast = useToast();
  const textColor = useColorModeValue("gray.700", "white");

  /* -------------------------- helpers ------------------------------ */
  const token = localStorage.getItem("authToken");

  /* -------------------- GET  employees  --------------------------- */
  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5347/api/employees", {
        headers: { Authorization: `${token}` },
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

      const raw = await res.json();
     
      setTableData(raw);
    } catch (err) {
      toast({
        status: "error",
        title: "Failed to fetch employees",
        description: err.message,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  }, [token, toast]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  /* -------------------- CSV‑upload flow --------------------------- */
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      toast({ status: "warning", title: "Only CSV files are allowed", position: "top" });
      e.target.value = "";
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("http://localhost:5347/api/employees/upload", {
        method: "POST",
        headers: { Authorization: `${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

      toast({ status: "success", title: "File uploaded", position: "top" });
      setSelectedFile(null);
      await fetchEmployees(); // refresh
    } catch (err) {
      toast({ status: "error", title: "Upload failed", description: err.message, position: "top" });
    }
  };

  /* -------------------- manual‑add flow --------------------------- */
  const handleManualChange = (e) =>
    setManualForm({ ...manualForm, [e.target.name]: e.target.value });

  const handleManualSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const formData = { ...manualForm };

      const res = await fetch("http://localhost:5347/api/employees", {
        method: "POST",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Accept both 201 and 204 as success
      if (res.status !== 201 && res.status !== 204) {
        const errorData = await res.text();
        throw new Error(`${res.status} ${res.statusText} - ${errorData}`);
      }

      toast({ status: "success", title: "Employee added", position: "top" });
      await fetchEmployees(); // Refresh the table
      onClose(); // Close the modal
      setManualForm({ // Reset the form
        fullName: "",
        email: "",
        phoneNumber: "",
        joinDate: "",
        department: "",
        position: "",
      });
    } catch (err) {
      toast({ status: "error", title: "Create failed", description: err.message, position: "top" });
    }
  };

  /* ----------------------------- UI ------------------------------ */
  return (
    <Flex direction="column" pt={{ sm: "125px", lg: "75px" }}>
      {/* Action bar */}
      <Flex justify="flex-end" align="center" mb={4} gap={4} wrap="wrap">
        {selectedFile && (
          <Flex
            align="center"
            gap={2}
            bg={useColorModeValue("white", "gray.700")}
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            borderRadius="md"
            px={3}
            py={2}
            boxShadow={useColorModeValue("sm", "sm-dark")}
            maxW={{ base: "100%", md: "60%" }}
          >
            <Text fontSize="sm" isTruncated>
              {selectedFile.name}
            </Text>
            <Button size="sm" colorScheme="teal" onClick={handleUpload}>
              Upload
            </Button>
            <IconButton
              aria-label="Cancel selection"
              icon={<CloseIcon w={2} h={2} />}
              size="sm"
              variant="ghost"
              onClick={() => setSelectedFile(null)}
            />
          </Flex>
        )}

        <Menu>
          <MenuButton as={Button} leftIcon={<Icon as={FiPlus} />} colorScheme="teal">
            Add
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => fileInputRef.current.click()}>Add File (.csv)</MenuItem>
            <MenuItem onClick={onOpen}>Add Manually</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Hidden file chooser (CSV only) */}
      <input type="file" accept=".csv" hidden ref={fileInputRef} onChange={handleFileSelect} />

      {/* Employees table card */}
      <Card px="0">
        <CardHeader px="22px" mb="24px">
          <Flex direction="column">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="6px">
              Employees
            </Text>
            <Text color="gray.400" fontSize="sm">
              Company employees list
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          {loading ? (
            <Flex align="center" pl="22px" gap={2} minH="100px">
              <Text>Loading employee data…</Text>
              <Spinner size="sm" />
            </Flex>
          ) : tableData.length ? (
            <SearchTable1 columnsData={columns} tableData={tableData} />
          ) : (
            <Flex align="center" pl="22px" minH="100px">
              <Text>No employees found.</Text>
            </Flex>
          )}
        </CardBody>
      </Card>

      {/* Manual‑entry modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        scrollBehavior="inside"
        isCentered
        motionPreset="scale"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Employee</ModalHeader>
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {[
                { name: "fullName", label: "Full Name" },
                { name: "email", label: "Email", type: "email" },
                { name: "phoneNumber", label: "Phone" },
                { name: "joinDate", label: "Join Date", type: "date" },
                { name: "department", label: "Department" },
                { name: "position", label: "Position" },
              ].map((f) => (
                <FormControl key={f.name}>
                  <FormLabel>{f.label}</FormLabel>
                  <Input
                    name={f.name}
                    type={f.type || "text"}
                    value={manualForm[f.name]}
                    onChange={handleManualChange}
                  />
                </FormControl>
              ))}
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleManualSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default DataTables;