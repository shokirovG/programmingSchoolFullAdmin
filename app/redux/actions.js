const changeMonthAction = (month) => {
  return {
    type: "changeMonth",
    payload: month,
  };
};

const fetchingStudents = () => {
  return {
    type: "fetchingStudents",
  };
};
const fetchedStudents = (students) => {
  return {
    type: "fetchedStudents",
    payload: students,
  };
};
const addStudent = (student) => {
  return {
    type: "addStudent",
    payload: student,
  };
};
const loaded = () => {
  return {
    type: "loaded",
  };
};
const spinnerLoading = () => {
  return {
    type: "spinnerLoading",
  };
};
const spinnerLoaded = () => {
  return {
    type: "spinnerLoaded",
  };
};
const hisobotFetched = (hisobot) => {
  return {
    type: "hisobotFetched",
    payload: hisobot,
  };
};
const addTodo = (month, newTodo) => {
  return {
    type: "addTodo",
    payload: { month, newTodo },
  };
};
const fetchedMajburiy = (chiqimlar) => {
  return {
    type: "fetchedMajburiy",
    payload: chiqimlar,
  };
};
const signIn = (log, pass) => {
  return {
    type: "signIn",
    payload: { log, pass },
  };
};
const logOut = () => {
  return {
    type: "logOut",
  };
};
const auth = (login, parol) => {
  return {
    type: "auth",
    payload: { login, parol },
  };
};
const monthPriceFetched = (db) => {
  return {
    type: "monthPriceFetched",
    payload: db,
  };
};
const fetchedWorkers = (workers) => {
  return {
    type: "fetchedWorkers",
    payload: workers,
  };
};
const spinnerDeleteLoading = () => {
  return {
    type: "spinnerDeleteLoading",
  };
};
const spinnerDeleteLoaded = () => {
  return {
    type: "spinnerDeleteLoaded",
  };
};
const fetchedGroups = (groups) => {
  return {
    type: "fetchedGroups",
    payload: groups,
  };
};
export {
  auth,
  signIn,
  logOut,
  changeMonthAction,
  loaded,
  fetchingStudents,
  fetchedStudents,
  addStudent,
  spinnerLoaded,
  spinnerLoading,
  hisobotFetched,
  addTodo,
  fetchedMajburiy,
  monthPriceFetched,
  fetchedWorkers,
  spinnerDeleteLoading,
  spinnerDeleteLoaded,
  fetchedGroups,
};
