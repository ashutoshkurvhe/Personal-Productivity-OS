export const BASE_URL = "http://localhost:5000";

//utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v2/auth/login",
    REGISTER: "/api/v2/auth/register",
    GET_USER_INFO: "/api/v2/auth/getUser",
  },
  NOTES: {
    ADD_NOTE: "/api/v2/note/",
    GET_ALL_NOTES: "/api/v2/note/",
    UPDATE_NOTE: (noteId) => `/api/v2/note/${noteId}`,
    DELETE_NOTE: (noteId) => `/api/v2/note/${noteId}`,
    SUMMARIZE_NOTE: (noteId) => `/api/v2/note/summarizeNote/${noteId}`,
  },
  TASKS: {
    ADD_TASK: "/api/v2/task/",
    GET_ALL_TASKS: "/api/v2/task/",
    UPDATE_TASK: (taskId) => `/api/v2/task/${taskId}`,
    DELETE_TASK: (taskId) => `/api/v2/task/${taskId}`,
    REORDER_TASK: "/api/v2/task/reorder",
  },
  POMODORO: {
    SAVE_SESSION: "/api/v2/pomodoro/session",
    GET_STATS: "/api/v2/pomodoro/stats"
  }
};




// webpush.setVapidDetails(
//   "mailto:ashu0101ashu2001@gmail.com", // use your real email
//   process.env.VAPID_PUBLIC_KEY,
//   process.env.VAPID_PRIVATE_KEY
// );