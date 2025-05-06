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

import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

function EventCalendar(props) {
  const { calendarData, initialDate } = props;

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      headerToolbar={false}
      initialView="dayGridMonth"
      contentHeight="600"
      events={calendarData}
      initialDate={initialDate}
      editable={true}
      minHeight="400px"
      height="100%"
      slotWidth={10}
      customIcons={false}
    />
  );
}

export default EventCalendar;
