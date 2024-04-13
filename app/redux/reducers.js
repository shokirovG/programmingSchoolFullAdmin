const initialState = {
  currentMonth: "",
  loading: "loading",
  students: [],
  spinnerLoader: "none",
  hisobot: [],
  majburiyChiqimlar: [],
  login: "",
  parol: "",
  monthPrice: {},
  workers: [],
  spinnerDeleteLoader: "none",
  groups: [],
};

function reducers(state = initialState, action) {
  switch (action.type) {
    case "changeMonth": {
      return {
        ...state,
        currentMonth: action.payload,
      };
    }
    case "fetchingStudents": {
      return {
        ...state,
        loading: "loading",
      };
    }
    case "fetchedStudents": {
      return {
        ...state,
        students: action.payload,
        loading: "loaded",
      };
    }
    case "addStudent": {
      return {
        ...state,
        students: [...state.students, action.payload],
        loading: "loaded",
      };
    }
    case "loaded": {
      return {
        ...state,
        loading: "loaded",
      };
    }
    case "spinnerLoading": {
      return {
        ...state,
        spinnerLoader: "loading",
      };
    }
    case "spinnerLoaded": {
      return {
        ...state,
        spinnerLoader: "loaded",
      };
    }
    case "hisobotFetched": {
      return {
        ...state,
        loading: "loaded",
        hisobot: action.payload,
      };
    }
    case "addTodo": {
      // const newHisobot = state.hisobot.map((elem) => {
      //   if (elem.month === action.payload.month) {
      //     return {
      //       ...elem,
      //       hisoblar: action.payload.newTodo,
      //     };
      //   } else {
      //     return elem;
      //   }
      // });
      return {
        ...state,
        hisobot: [
          { hisoblar: action.payload.newTodo, month: action.payload.month },
        ],
      };
    }
    case "fetchedMajburiy": {
      return {
        ...state,
        majburiyChiqimlar:
          action.payload.length > 0
            ? action.payload
            : [{ month: localStorage.getItem("currentMonth"), chiqimlar: [] }],
      };
    }
    case "signIn": {
      localStorage.setItem("login", action.payload.log);
      localStorage.setItem("parol", action.payload.pass);
      return {
        ...state,
        login: action.payload.log,
        parol: action.payload.pass,
      };
    }
    case "logOut": {
      localStorage.setItem("login", "");
      localStorage.setItem("parol", "");
      return {
        ...state,
        login: "",
        parol: "",
      };
    }
    case "auth": {
      return {
        ...state,
        login: action.payload.login,
        parol: action.payload.parol,
      };
    }
    case "monthPriceFetched": {
      console.log("month reducer");
      return {
        ...state,
        monthPrice: action.payload,
      };
    }
    case "fetchedWorkers": {
      return {
        ...state,
        workers: action.payload,
      };
    }
    case "spinnerDeleteLoaded": {
      return {
        ...state,
        spinnerDeleteLoader: "loaded",
      };
    }
    case "spinnerDeleteLoading": {
      return {
        ...state,
        spinnerDeleteLoader: "loading",
      };
    }
    case "fetchedGroups": {
      return {
        ...state,
        groups: action.payload,
      };
    }
    default:
      return state;
  }
}

export default reducers;
