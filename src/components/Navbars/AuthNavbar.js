
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Link,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import bgCard from "assets/img/background-card-reports.png";
import IconBox from "components/Icons/IconBox";
import { RocketIcon } from "components/Icons/Icons";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { GoChevronDown } from "react-icons/go";
import { NavLink } from "react-router-dom";
import routes from "routes.js";

export default function AuthNavbar(props) {
  const [open, setOpen] = React.useState(false);
  const {
    isOpen: isOpenPages,
    onOpen: onOpenPages,
    onClose: onClosePages,
  } = useDisclosure();

  const {
    isOpen: isOpenAuth,
    onOpen: onOpenAuth,
    onClose: onCloseAuth,
  } = useDisclosure();

  const {
    isOpen: isOpenApplication,
    onOpen: onOpenApplication,
    onClose: onCloseApplication,
  } = useDisclosure();

  const {
    isOpen: isOpenEcommerce,
    onOpen: onOpenEcommerce,
    onClose: onCloseEcommerce,
  } = useDisclosure();
  const textColor = useColorModeValue("gray.700", "#fff");
  const { logo, logoText, secondary, ...rest } = props;

  let authObject = {};
  routes.forEach((route) => {
    if (route.items) {
      authObject = route.items.find((link) => link.name === "Authentication");
    }
  });

  let applicationsObject = {};
  routes.forEach((route) => {
    if (route.items) {
      applicationsObject = route.items.find(
        (link) => link.name === "Applications"
      );
    }
  });

  let ecommerceObject = {};
  routes.forEach((route) => {
    if (route.items) {
      ecommerceObject = route.items.find((link) => link.name === "Ecommerce");
    }
  });

  let extraArr = [];
  routes.forEach((route) => {
    route.items.forEach((item) => {
      if (item.items && item.name === "Pages") {
        extraArr = item.items.filter((link) => !link.collapse);
      }
    });
  });

  // verifies if routeName is the one active (in browser input)

  // Chakra color mode
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarBg = useColorModeValue(
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  let navbarBorder = useColorModeValue(
    "1.5px solid #FFFFFF",
    "1.5px solid rgba(255, 255, 255, 0.31)"
  );
  let navbarShadow = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );
  let navbarFilter = useColorModeValue(
    "none",
    "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );
  let navbarBackdrop = "blur(21px)";
  let bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  let navbarPosition = "fixed";
  let colorButton = "white";
  if (props.secondary === true) {
    navbarBg = "none";
    navbarBorder = "none";
    navbarShadow = "initial";
    navbarFilter = "initial";
    navbarBackdrop = "none";
    bgButton = "black";
    colorButton = "gray.700";
    mainText = "#fff";
    navbarPosition = "absolute";
  }

  const createPagesLinks = (routes) => {
    return routes.map((link) => {
      if (
        link.name === "Applications" ||
        link.name === "Ecommerce" ||
        link.name === "Authentication" ||
        link.name === "RTL" ||
        link.name === "Widgets" ||
        link.name === "Charts" ||
        link.name === "Alerts"
      ) {
        return;
      }
      if (link.name === "Pricing Page") {
        return (
          <Stack direction="column">
            <Stack
              direction="row"
              spacing="6px"
              align="center"
              mb="6px"
              cursor="default"
            >
              <IconBox bg="teal.300" color="white" h="30px" w="30px">
                <RocketIcon color="inherit" />
              </IconBox>
              <Text fontWeight="bold" fontSize="sm" color={textColor}>
                Extra
              </Text>
            </Stack>
            {createExtraLinks(extraArr)}
          </Stack>
        );
      }
      if (link.authIcon) {
        return (
          <Stack direction="column">
            <Stack
              direction="row"
              spacing="6px"
              align="center"
              mb="6px"
              cursor="default"
            >
              <IconBox bg="teal.300" color="white" h="30px" w="30px">
                {link.authIcon}
              </IconBox>
              <Text fontWeight="bold" fontSize="sm" color={textColor}>
                {link.name}
              </Text>
            </Stack>
            {createPagesLinks(link.items)}
          </Stack>
        );
      } else {
        if (link.component) {
          return (
            <NavLink to={link.layout + link.path}>
              <MenuItem
                ps="36px"
                py="0px"
                _hover={{ boxShadow: "none", bg: "none" }}
                borderRadius="12px"
              >
                <Text color="gray.400" fontSize="sm" fontWeight="normal">
                  {link.name}
                </Text>
              </MenuItem>
            </NavLink>
          );
        } else {
          return <>{createPagesLinks(link.items)}</>;
        }
      }
    });
  };

  const createExtraLinks = (routes) => {
    return routes.map((link) => {
      return (
        <NavLink to={link.layout + link.path}>
          <MenuItem
            ps="36px"
            py="0px"
            _hover={{ boxShadow: "none", bg: "none" }}
            borderRadius="12px"
          >
            <Text color="gray.400" fontSize="sm" fontWeight="normal">
              {link.name}
            </Text>
          </MenuItem>
        </NavLink>
      );
    });
  };

  const createAuthLinks = (routes) => {
    return routes.map((link) => {
      if (link.authIcon) {
        return (
          <Stack direction="column">
            <Stack
              direction="row"
              spacing="6px"
              align="center"
              mb="6px"
              cursor="default"
            >
              <IconBox bg="teal.300" color="white" h="30px" w="30px">
                {link.authIcon}
              </IconBox>
              <Text fontWeight="bold" fontSize="sm" color={textColor}>
                {link.name}
              </Text>
            </Stack>
            {createAuthLinks(link.items)}
          </Stack>
        );
      } else {
        return (
          <NavLink to={link.layout + link.path}>
            <MenuItem
              ps="36px"
              py="0px"
              _hover={{ boxShadow: "none", bg: "none" }}
              borderRadius="12px"
            >
              <Text color="gray.400" fontSize="sm" fontWeight="normal">
                {link.name}
              </Text>
            </MenuItem>
          </NavLink>
        );
      }
    });
  };

  const createApplicationLinks = (routes) => {
    return routes.map((link) => {
      return (
        <NavLink to={link.layout + link.path}>
          <Stack direction="row" spacing="12px" align="center" cursor="pointer">
            <IconBox bg="teal.300" color="white" h="30px" w="30px">
              {link.authIcon}
            </IconBox>
            <Text fontWeight="bold" fontSize="sm" color={textColor}>
              {link.name}
            </Text>
          </Stack>
        </NavLink>
      );
    });
  };

  const createEcommerceLinks = (routes) => {
    return routes.map((link) => {
      if (link.authIcon) {
        return (
          <Stack direction="column">
            <Stack
              direction="row"
              spacing="6px"
              align="center"
              mb="6px"
              cursor="default"
            >
              <IconBox bg="teal.300" color="white" h="30px" w="30px">
                {link.authIcon}
              </IconBox>
              <Text fontWeight="bold" fontSize="sm" color={textColor}>
                {link.name}
              </Text>
            </Stack>
            {createPagesLinks(link.items)}
          </Stack>
        );
      } else {
        if (link.component) {
          return (
            <NavLink to={link.layout + link.path}>
              <MenuItem
                ps="36px"
                py="0px"
                _hover={{ boxShadow: "none", bg: "none" }}
                borderRadius="12px"
              >
                <Text color="gray.400" fontSize="sm" fontWeight="normal">
                  {link.name}
                </Text>
              </MenuItem>
            </NavLink>
          );
        } else {
          return <>{createPagesLinks(link.items)}</>;
        }
      }
    });
  };

  // Add a return statement to fix the error
  return (
    <Box
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor="transparent"
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      backgroundImage="none"
      borderBottom="1px solid"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="space-between"
      width="100%"
      px={{ sm: "2px", md: "16px", xl: "30px" }}
      py="12px"
      mx="auto"
      {...rest}
    >
      <Flex w="100%" px={{ xs: 4, md: 8 }} justifyContent="space-between">
        <HStack spacing={{ sm: "10", md: "26" }}>
          <Box
            display={{ base: "none", xl: "block" }}
            position="absolute"
            left="50%"
            transform="translate(-50%, 0%)"
          >
            <HStack spacing="1" minW="420px" justifyContent="center">
              <NavLink to="/">
                <Button
                  variant="no-effects"
                  py="12px"
                  px="24px"
                  _hover={{ bg: "none" }}
                  _active={{ bg: "none" }}
                  _focus={{ boxShadow: "none" }}
                  color={mainText}
                  fontWeight="bold"
                  fontSize="sm"
                >
                  {logoText}
                </Button>
              </NavLink>
            </HStack>
          </Box>
        </HStack>
        <HStack spacing={{ sm: "0", md: "22px" }}>
          <Button
            variant="no-effects"
            py="12px"
            px="24px"
            _hover={{ bg: "none" }}
            _active={{ bg: "none" }}
            _focus={{ boxShadow: "none" }}
            color={mainText}
            fontWeight="bold"
            fontSize="sm"
            onClick={() => window.location.href = "#/"}
          >
            Back to Home
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string,
};
