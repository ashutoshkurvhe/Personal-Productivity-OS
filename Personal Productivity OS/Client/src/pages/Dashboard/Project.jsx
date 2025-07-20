import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { GoPlus } from "react-icons/go";

const Project = () => {
  useUserAuth();
  return (
    <DashboardLayout>
        <CustomButton
          styles="add-btn"
          icon={<GoPlus className="text-2xl" />}
          name="Add Project"
        />
    </DashboardLayout>
  );
};

export default Project;
