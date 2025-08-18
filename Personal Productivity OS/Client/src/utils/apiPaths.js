export const BASE_URL = "http://localhost:5000";

//utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
  },
  NOTES: {
    ADD_NOTE: "/api/v1/note/",
    GET_ALL_NOTES: "/api/v1/note/",
    GET_NOTE: (noteId) => `/api/v1/note/${noteId}`,
    UPDATE_NOTE: (noteId) => `/api/v1/note/${noteId}`,
    DELETE_NOTE: (noteId) => `/api/v1/note/${noteId}`,
    SUMMARIZE_NOTE: (noteId) => `/api/v1/note/${noteId}/summarize`,
  },
  TASKS: {
    ADD_TASK: "/api/v1/task/",
    GET_ALL_TASKS: "/api/v1/task/",
    UPDATE_TASK: (taskId) => `/api/v1/task/${taskId}`,
    DELETE_TASK: (taskId) => `/api/v2/task/${taskId}`,
    REORDER_TASK: "/api/v1/task/reorder",
  },
  POMODORO: {
    SAVE_SESSION: "/api/v1/pomodoro/session",
    GET_STATS: "/api/v1/pomodoro/stats",
  },
  EVENTS: {
    CREATE_EVENT: "/api/v1/event/import",
    GET_ALL_EVENTS: "api/v1/event/",
  },
  NOTIFY: {
    WEB_PUSH: "/api/v1/notify/web",
    EMAIL_REMINDER: "/api/v1/notify/email",
  },
  DASHBOARD: {
    GET_DASHBOARD_DATA: "/api/v1/dashboard/",
  },
};




// webpush.setVapidDetails(
//   "mailto:ashu0101ashu2001@gmail.com", // use your real email
//   process.env.VAPID_PUBLIC_KEY,
//   process.env.VAPID_PRIVATE_KEY
// );