import { useState, useEffect} from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import AddNotesForm from "../../components/Notes/AddNotesForm";
import {toast} from "react-toastify";
import Model from "../../components/common/Model";
import DeleteModel from "../../components/common/DeleteModel";
import DeleteAlert from "../../components/common/DeleteAlert";
import NotesList from "../../components/Notes/NotesList";
import { LuPlus } from "react-icons/lu";


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
    if (!note) {
      console.error("Note is undefined", note);
      return;
    }

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

  //Update Note
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

  //Summarize Note
  const handleSummarizeNote = async (noteId) => { };

  const handlePinNote = async (noteId) => {
    try {
      await axiosInstance.put(API_PATHS.NOTES.UPDATE_NOTE(noteId), { type: "pinned" });
      toast.success("Note pinned successfully.");
      fetchAllNotes();
    } catch (error) {
      console.error(
        "Error pinning note:", error.response?.data.message || error.message
      );
    }
  }

  const handleUnpinNote = async (noteId) => {
    try {
      await axiosInstance.put(API_PATHS.NOTES.UPDATE_NOTE(noteId), { type: "normal" });
      toast.success("Note unpinned successfully.");
      fetchAllNotes();
    }
    catch (error) {
      console.error(
        "Error unpinning note:", error.response?.data.message || error.message
      );
    }
  }

  const handleArchiveNote = async (noteId) => {
    try {
      await axiosInstance.put(API_PATHS.NOTES.UPDATE_NOTE(noteId), { type: "archived" });
      toast.success("Note archived successfully.");
      fetchAllNotes();
    }

    catch (error) {
      console.error(  
        "Error archiving note:", error.response?.data.message || error.message
      );
    }
  }

  const handleUnarchiveNote = async (noteId) => {
    try {
      await axiosInstance.put(API_PATHS.NOTES.UPDATE_NOTE(noteId), { type: "normal" });
      toast.success("Note unarchived successfully.");
      fetchAllNotes();
    } catch (error) {
      console.error(
        "Error unarchiving note:", error.response?.data.message || error.message
      );
    }
  }

  const handleFavoriteNote = async (noteId) => {

    try {
      await axiosInstance.put(API_PATHS.NOTES.UPDATE_NOTE(noteId), { type: "favorite" });
      toast.success("Note favorited successfully.");
      fetchAllNotes();
    }
    catch (error) {
      console.error(
        "Error favoriting note:", error.response?.data.message || error.message
      );
    }
  }

  const handleUnfavoriteNote = async (noteId) => {
    try {
      await axiosInstance.put(API_PATHS.NOTES.UPDATE_NOTE(noteId), { type: "normal" });
      toast.success("Note unfavorited successfully.");
      fetchAllNotes();
    } catch (error) {
      console.error(
        "Error unfavoriting note:", error.response?.data.message || error.message
      );
    }
  }

  useEffect(() => {
    fetchAllNotes();
    return () => { };
  }, []);

  return (
    <DashboardLayout>
      <div className="">
        <div className="flex justify-between px-2 py-6">
          <h1 className="text-2xl font-medium">Notes</h1>
          <button
            className="add-btn"
            onClick={() => setOpenAddNotesModel(true)}
          >
            <LuPlus className="text-lg" /> Add Note
          </button>
        </div>
        <div className="">
          {openAddNotesModel ? (
            <Model
              isOpen={openAddNotesModel}
              onClose={() => setOpenAddNotesModel(false)}
              title="Add Note"
            >
              <AddNotesForm onAddNote={handleAddNote} />
            </Model>
          ) : openEditNotesModel.show ? (
            <Model
              isOpen={openEditNotesModel.show}
              onClose={() => setOpenEditNotesModel({ show: false, data: null })}
              title="Edit Note"
            >
              <AddNotesForm
                initialData={openEditNotesModel.data}
                onUpdateNote={(updatedNote) =>
                  handleUpdateNote(openEditNotesModel.data._id, updatedNote)
                }
              />
            </Model>
          ) : (
            <NotesList
              notes={notesData}
              onDelete={(id) => {
                console.log("Delete clicked", id);
                setOpenDeleteAlert({ show: true, data: id });
              }}
              onEdit={(id) => setOpenEditNotesModel({ show: true, data: id })}
              onPin={handlePinNote}
              onUnpin={handleUnpinNote}
              onFavorite={handleFavoriteNote}
              onUnfavorite={handleUnfavoriteNote}
              onArchived={handleArchiveNote}
              onUnarchived={handleUnarchiveNote}
            />
          )}
        </div>
      </div>
      <DeleteModel
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Note"
      >
        <DeleteAlert
          content="Are you sure you want to delete this note?"
          onDelete={() => handleDeleteNote(openDeleteAlert.data)}
          onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
        />
      </DeleteModel>
    </DashboardLayout>
  );
};

export default Note;
