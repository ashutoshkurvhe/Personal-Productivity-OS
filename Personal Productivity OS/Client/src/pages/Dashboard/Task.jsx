import DashboardLayout from "../../components/layout/DashboardLayout";
import RoutesHeader from "../../components/common/RoutesHeader";
import RoutesName from "../../components/common/RoutesName";
import CustomeButton from "../../components/common/CustomButton";
import { GoPlus } from "react-icons/go";
import { useUserAuth } from "../../hooks/useUserAuth";
import ContentLayout from "../../components/layout/ContentLayout";
import KanbanBoard from "../../components/Tasks/KanbanBoard";

const Task = () => {
  useUserAuth();
  return (
    <DashboardLayout>
      <RoutesHeader>
        <RoutesName name="Tasks" />
        <CustomeButton styles="add-btn" icon={<GoPlus className="text-xl"/>} name="Add Task" />
      </RoutesHeader>
      <ContentLayout>
        {/* Task content will go here */}   
        <KanbanBoard />
      </ContentLayout>
    </DashboardLayout>
  );
};

export default Task;
