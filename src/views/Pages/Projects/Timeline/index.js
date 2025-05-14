
import { Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import DarkTimeline from "./components/DarkTimeline";
import LightTimeline from "./components/LightTimeline";

function Timeline() {
  return (
    <Stack
      direction={{ sm: "column", lg: "row" }}
      spacing="24px"
      pt={{ sm: "125px", lg: "75px" }}
    >
      <LightTimeline />
      <DarkTimeline />
    </Stack>
  );
}

export default Timeline;
