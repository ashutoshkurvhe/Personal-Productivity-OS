import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import AddNotesForm from "../../components/Notes/AddNotesForm";
import {toast} from "react-toastify";
import Model from "../../components/common/Model"
import DeleteAlert from "../../components/common/DeleteAlert";
import NotesHeader from "../../components/Notes/NotesHeader";
import NotesList from "../../components/Notes/NotesList";


const Note = () => {
  useUserAuth();
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddNotesModel, setOpenAddNotesModel] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openEditNotesModel, setOpenEditNotesModel] = useState({
    show: false,
    data: null,
  });

  // Fetch all notes
  const fetchAllNotes = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.NOTES.GET_ALL_NOTES}`);

      if (response.data) {
        setNotesData(response.data);
      }
    } catch (error) {
      console.log("Somthing went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  //Handle Add Expense
  const handleAddNote = async (note) => {
    const { title, content, tags } = note;

    //Validation Checks
    if (!title.trim() || !content.trim()) {
      toast.error("All fields must be filled.");
      return;
    }

    if (!tags || tags.length === 0) {
      toast.error("At least one tag is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.NOTES.ADD_NOTE, {
        title,
        content,
        tags,
      });

      setOpenAddNotesModel(false);
      toast.success("Note added successfully.");
      fetchAllNotes();
    } catch (error) {
      console.error(
        "Error adding expense:", error.response?.data.message || error.message
      );
    }
  };


  //Delete Expense
  const handleDeleteNote = async (noteId) => {
    try {
      await axiosInstance.delete(API_PATHS.NOTES.DELETE_NOTE(noteId));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Note deleted successfully.");
      fetchAllNotes();
    } catch (error) {
      console.error(
        "Error deleting note:", error.response?.data.message || error.message
      );
    }
  }

  const handleUpdateNote = async (noteId, updatedNote) => { 
    try {
      await axiosInstance.put(API_PATHS.NOTES.UPDATE_NOTE(noteId), updatedNote);
      toast.success("Note updated successfully.");
      fetchAllNotes();
    }catch (error) {
      console.error(
        "Error updating note:", error.response?.data.message || error.message
      );
    }
  }

  const handleSummarizeNote = async (noteId) => { };

  return (
    <DashboardLayout>
      <div>
        <div>
          <NotesHeader onAddNote={() => setOpenAddNotesModel(true)} />
          
          <NotesList notes={notesData} onDelete={(id) => { setOpenDeleteAlert({ show: true, data: id }); }} onEdit={(id) => setOpenEditNotesModel({ show: true, data: id })} />
          
          <Model isOpen={ openAddNotesModel } onClose={() => setOpenAddNotesModel(false)} title="Add Note">
            <AddNotesForm onAddNote={handleAddNote} />
          </Model>

          <Model isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, data: null })} title="Delete Note">
            <DeleteAlert content="Are you sure you want to delete this note?" onDelete={() => handleDeleteNote(openDeleteAlert.data)} />
          </Model>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Note;
