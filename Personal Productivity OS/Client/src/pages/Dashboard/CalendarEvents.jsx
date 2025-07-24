import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import AddEventForm from "../../components/CalenderEvents/AddEventForm";
import { toast } from "react-toastify";
import Model from "../../components/common/Model";
import EventList from "../../components/CalenderEvents/EventsList";
import { LuPlus } from "react-icons/lu";

const Events = () => {
  useUserAuth();

  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddEventsModel, setOpenAddEventsModel] = useState(false);

  const fetchAllEvents = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.EVENTS.GET_ALL_EVENTS);
      setEventData(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (eventImportData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        API_PATHS.EVENTS.CREATE_EVENT,
        eventImportData
      );
      toast.success(response.data.message || "Events imported successfully");
      setOpenAddEventsModel(false);
      fetchAllEvents(); // Refresh the events list
    } catch (error) {
      console.error("Error importing events:", error);
      toast.error(error.response?.data?.message || "Failed to import events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEvents();
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="">
        <div className="flex justify-between px-4 py-6">
          <h1 className="text-2xl font-medium text-gray-900">Events</h1>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => setOpenAddEventsModel(true)}
          >
            <LuPlus className="text-lg" />
            Import Events
          </button>
        </div>

        <div></div>

        {openAddEventsModel ? (
          <Model
            isOpen={openAddEventsModel}
            onClose={() => setOpenAddEventsModel(false)}
            title="Import Calendar Events"
          >
            <AddEventForm onAddEvent={handleAddEvent} loading={loading} />
          </Model>
        ) : loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : (
          <EventList events={eventData} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Events;
