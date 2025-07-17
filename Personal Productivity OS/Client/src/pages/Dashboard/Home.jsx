import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { FaRegNoteSticky } from "react-icons/fa6";
import Card from "../../components/Cards/Card";

const Home = () => {
  useUserAuth();
  return (
    <DashboardLayout>
      <div className="flex flex-col px-4 py-6">
        <h1 className="text-2xl font-medium mt-2">Dashboard</h1>
        <p className="text-md text-gray-600">
          Your personal productivity space.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <Card label="Notes" icon={<FaRegNoteSticky />} value="25" />
        <Card label="Notes" icon={<FaRegNoteSticky />} value="25" />
        <Card label="Notes" icon={<FaRegNoteSticky />} value="25" />
      </div>
    </DashboardLayout>
  );
}

export default Home
