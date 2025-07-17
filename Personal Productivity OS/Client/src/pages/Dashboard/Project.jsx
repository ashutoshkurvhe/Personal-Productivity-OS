import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { GoPlus } from "react-icons/go";
import RoutesHeader from "../../components/common/RoutesHeader";
import RoutesName from "../../components/common/RoutesName";
import CustomButton from "../../components/common/CustomButton";

const Project = () => {
  useUserAuth();
  return (
    <DashboardLayout>
      <RoutesHeader>
        <RoutesName name="Projects" />
        <CustomButton
          styles="add-btn"
          icon={<GoPlus className="text-2xl" />}
          name="Add Project"
        />
      </RoutesHeader>
    </DashboardLayout>
  );
};

export default Project;
