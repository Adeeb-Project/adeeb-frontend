// src/views/Pages/Account/Payment/Payment.js
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
// Import icons if needed (example uses these two)
import { RiMastercardFill } from "react-icons/ri";
import { FaVisa } from "react-icons/fa";
// Import your background asset (ensure the path is valid)
import BackgroundCard1 from "assets/img/BackgroundCard1.png";

// -------------------------------------------------------------------------
// CreditCardPreview Component
// -------------------------------------------------------------------------
// A fancy credit card component that displays current card details.
// It shows a background image, card number, expiry, and CVV.
// As the parent state (formData) changes, the preview updates live.
const CreditCardPreview = ({ cardData }) => {
  const cardBg = BackgroundCard1;
  return (
    <Box
      backgroundImage={cardBg}
      backgroundSize="cover"
      backgroundPosition="center"
      borderRadius="lg"
      boxShadow="lg"
      p="20px"
      color="white"
      mb="6"
      minH="220px"
      position="relative"
    >
      {/* You can add an icon here if desired */}
      <Text fontSize="lg" fontWeight="bold">
        {cardData.cardNumber ? cardData.cardNumber : "XXXX XXXX XXXX XXXX"}
      </Text>
      <Flex mt="4" justify="space-between">
        <Text>{cardData.expiry ? cardData.expiry : "MM/YY"}</Text>
        <Text>{cardData.cvv ? `CVV: ${cardData.cvv}` : "CVV: XXX"}</Text>
      </Flex>
    </Box>
  );
};

// -------------------------------------------------------------------------
// Main Payment Component
// -------------------------------------------------------------------------
function Payment() {
  const toast = useToast();
  const formBg = useColorModeValue("white", "gray.700");

  // State for the live preview inputs
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // State to store saved credit cards (simulate persistence)
  const [creditCards, setCreditCards] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState("");

  // Handle form input changes and update live preview
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new credit card based on the form (with basic validation)
  const addCreditCard = (e) => {
    e.preventDefault();
    if (!formData.cardNumber || !formData.expiry || !formData.cvv) {
      toast({
        title: "Incomplete Fields",
        description: "Please fill all the credit card details.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setCreditCards((prevCards) => [...prevCards, { ...formData }]);
    // Clear the form after saving the card
    setFormData({ cardNumber: "", expiry: "", cvv: "" });
    toast({
      title: "Card Added",
      description: "Your credit card has been added.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Update the selected card from the drop‑down.
  const handleCardSelect = (e) => {
    setSelectedCardIndex(e.target.value);
  };

  // Process payment using the selected card.
  const processPayment = () => {
    if (selectedCardIndex === "" || !creditCards[selectedCardIndex]) {
      toast({
        title: "No Card Selected",
        description: "Please select a credit card before proceeding with payment.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // Here you would call your payment processing API.
    toast({
      title: "Payment Processed",
      description: "Your payment has been successfully processed.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="lg" mx="auto" mt="8" p="6">
      <Text fontSize="2xl" mb="4" textAlign="center" fontWeight="bold">
        Payment
      </Text>

      {/* Live Credit Card Preview */}
      <CreditCardPreview cardData={formData} />

      {/* Form to Add New Credit Card */}
      <Box bg={formBg} p="6" borderRadius="lg" boxShadow="md" mb="6">
        <form onSubmit={addCreditCard}>
          <FormControl id="cardNumber" mb="3" isRequired>
            <FormLabel>Card Number</FormLabel>
            <Input
              type="text"
              placeholder="Enter card number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="expiry" mb="3" isRequired>
            <FormLabel>Expiry Date</FormLabel>
            <Input
              type="text"
              placeholder="MM/YY"
              name="expiry"
              value={formData.expiry}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="cvv" mb="3" isRequired>
            <FormLabel>CVV</FormLabel>
            <Input
              type="password"
              placeholder="Enter CVV"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" mb="6" width="full">
            Add Credit Card
          </Button>
        </form>
      </Box>

      {/* Saved Cards Drop-down */}
      {creditCards.length > 0 && (
        <Box mb="6">
          <FormControl id="selectCard" mb="3">
            <FormLabel>Select Saved Card</FormLabel>
            <Select
              placeholder="Select card"
              onChange={handleCardSelect}
              value={selectedCardIndex}
            >
              {creditCards.map((card, index) => (
                <option key={index} value={index}>
                  Card ending with {card.cardNumber.slice(-4)}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Payment Action */}
      <Button colorScheme="green" width="full" onClick={processPayment}>
        Pay Now
      </Button>
    </Box>
  );
}

export default Payment;
