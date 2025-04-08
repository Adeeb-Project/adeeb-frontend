// src/pages/Payment/index.js (or pages/payment.js for Next.js)
import { Box, Flex, Grid, Icon } from "@chakra-ui/react";
import React from "react";
import { FaPaypal, FaWallet } from "react-icons/fa";
import { RiMastercardFill } from "react-icons/ri";

// Custom Components (adjust paths as needed)
import CreditCard from "../Billing/components/CreditCard.js";
import PaymentStatistics from "../Billing/components/PaymentStatistics.js";
import PaymentMethod from "../Billing/components/PaymentMethod.js";
import Invoices from "../Billing/components/Invoices.js";
import Transactions from "../Billing/components/Transactions.js";


// Data Variables
import { invoicesData, newestTransactions, olderTransactions } from "variables/general";

// Background asset (ensure this asset exists in your project)
import BackgroundCard1 from "assets/img/BackgroundCard1.png";

function Payment() {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      {/* Top section: Payment card summary, statistics and payment method */}
      <Grid templateColumns={{ sm: "1fr", lg: "2fr 1.2fr" }} templateRows="1fr">
        <Box>
          <Grid
            templateColumns={{
              sm: "1fr",
              md: "1fr 1fr",
              xl: "1fr 1fr 1fr 1fr",
            }}
            templateRows={{ sm: "auto auto auto", md: "1fr auto", xl: "1fr" }}
            gap="26px"
          >
            <CreditCard
              backgroundImage={BackgroundCard1}
              title={"Payment Card"}
              number={"7812 2139 0823 XXXX"}
              validity={{
                name: "VALID THRU",
                data: "05/24",
              }}
              cvv={{
                name: "CVV",
                code: "09x",
              }}
              icon={
                <Icon
                  as={RiMastercardFill}
                  w="48px"
                  h="auto"
                  color="gray.400"
                />
              }
            />
            <PaymentStatistics
              icon={
                <Icon h={"24px"} w={"24px"} color="white" as={FaWallet} />
              }
              title={"Salary"}
              description={"Monthly Salary"}
              amount={2000}
            />
            <PaymentStatistics
              icon={
                <Icon h={"24px"} w={"24px"} color="white" as={FaPaypal} />
              }
              title={"Paypal"}
              description={"Freelance Payment"}
              amount={4550}
            />
          </Grid>
          <PaymentMethod
            title={"Payment Method"}
            mastercard={{
              icon: <RiMastercardFill />,
              number: "7812 2139 0823 XXXX",
            }}
            visa={{
              icon: <FaPaypal />,
              number: "7812 2139 0823 XXXX",
            }}
          />
        </Box>
        <Invoices title={"Invoices"} data={invoicesData} />
      </Grid>

      {/* Bottom section: Transactions */}
      <Grid templateColumns={{ sm: "1fr", lg: "1.6fr" }} mt="24px">
        <Transactions
          title={"Your Transactions"}
          date={"23 - 30 March"}
          newestTransactions={newestTransactions}
          olderTransactions={olderTransactions}
        />
      </Grid>
    </Flex>
  );
}

export default Payment;
