import DashboardLayout from "../../components/layout/DashboardLayout";
import { useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import CalendarEventCreator from "../../components/CalenderEvents/CalendarEventCreator";


const CalendarEvent = () => {
  useUserAuth();
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddEventModel, setOpenAddEventMode] = useState(false)
  const fetchAllEvents = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.EVENTS.GET_ALL_EVENTS}`);
      
      if (response.data) {
        setNote
      }
    }
  }


  return (
    <DashboardLayout>
        <CalendarEventCreator/>
    </DashboardLayout>
  );
};

export default CalendarEvent;
