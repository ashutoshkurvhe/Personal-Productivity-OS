import DashboardLayout from "../../components/layout/DashboardLayout";
import { GoPlus } from "react-icons/go";
import { useUserAuth } from "../../hooks/useUserAuth";
import RoutesHeader from "../../components/common/RoutesHeader";
import RoutesName from "../../components/common/RoutesName";
import CustomButton from "../../components/common/CustomButton";
import CalendarEventCreator from "../../components/CalenderEvents/CalendarEventCreator"
import ContentLaout from "../../components/layout/ContentLayout";

const CalendarEvent = () => {
  useUserAuth();
  return (
    <DashboardLayout>
      <RoutesHeader>
        <RoutesName name="Calendar Events" />
        <CustomButton
          styles="add-btn"
          icon={<GoPlus className="text-xl" />}
          name="Create Event"
        />
      </RoutesHeader>
      <ContentLaout>
        <CalendarEventCreator/>
      </ContentLaout>
    </DashboardLayout>
  );
};

export default CalendarEvent;
