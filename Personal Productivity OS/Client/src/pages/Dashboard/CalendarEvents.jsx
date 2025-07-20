import DashboardLayout from "../../components/layout/DashboardLayout";
import { GoPlus } from "react-icons/go";
import { useUserAuth } from "../../hooks/useUserAuth";
import CalendarEventCreator from "../../components/CalenderEvents/CalendarEventCreator"

const CalendarEvent = () => {
  useUserAuth();
  return (
    <DashboardLayout>
    
        <CustomButton
          styles="add-btn"
          icon={<GoPlus className="text-xl" />}
          name="Create Event"
        />
        <CalendarEventCreator/>
    </DashboardLayout>
  );
};

export default CalendarEvent;
