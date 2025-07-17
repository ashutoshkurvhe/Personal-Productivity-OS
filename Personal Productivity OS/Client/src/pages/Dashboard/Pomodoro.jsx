import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
const Pomodoro = () => {
  useUserAuth();
  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <h1 className="text-2xl font-medium mt-4">Pomodoro</h1>
      </div>
    </DashboardLayout>
  );
};

export default Pomodoro;
