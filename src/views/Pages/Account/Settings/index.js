/*!

=========================================================
* Purity UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.adeebcompany.com/product/purity-ui-dashboard-pro
* Copyright 2021 Creative Tim (https://www.adeebcompany.com/)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Flex, Stack } from "@chakra-ui/react";
import React from "react";
import Accounts from "./components/Accounts";
import BasicInfo from "./components/BasicInfo";
import Buttons from "./components/Buttons";
import ChangePassword from "./components/ChangePassword";
import Header from "./components/Header";
import Sessions from "./components/Sessions";
import Tabs from "./components/Tabs";
import TwoFactorAuth from "./components/TwoFactorAuth";
import DeleteAccount from "./components/DeleteAccount";
import Notifications from "./components/Notifications";

function Settings() {
  return (
    <Flex direction="column" pt={{ sm: "125px", lg: "75px" }}>
      {/*
      This component will show few tabs
      in the top of the screen
      ----->  <Tabs />  <-----
      */}
      <Buttons />
      <Stack
        direction="column"
        spacing="24px"
        mt="40px"
        align={{ lg: "flex-end" }}
        justify={{ lg: "flex-end" }}
        w="100%"
      >
        <Header />
        <BasicInfo />
        <ChangePassword />
        <TwoFactorAuth />
        {/*
        this will the component of linking an account 
        with other platforms account

        ---->  <Accounts />  <--------
         
         */}
        <Notifications />
        <Sessions />
        <DeleteAccount />
      </Stack>
    </Flex>
  );
}

export default Settings;
