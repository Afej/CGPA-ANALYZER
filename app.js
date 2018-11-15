//Storage controller
const StorageCtrl = (function () {
  return {
    storeDetail: function (detail) {
      let data;

      if (localStorage.getItem("data") === null) {
        data = [];

        data.push(detail);

        localStorage.setItem("data", JSON.stringify(data));
      } else {
        data = JSON.parse(localStorage.getItem("data"));

        data.push(detail);

        localStorage.setItem("data", JSON.stringify(data));
      }
    },
    getDetailFromStorage: function () {
      let data;
      if (localStorage.getItem("data") === null) {
        data = [];
      } else {
        data = JSON.parse(localStorage.getItem("data"));
      }
      return data;
    }
  };
})();

// Item controller
const ItemCtrl = (function () {
  return {
    getDetails: function () {
      const UISelectors = UICtrl.getSelectors();

      return {
        name: document.querySelector(UISelectors.name).value,
        faculty: document.querySelector(UISelectors.faculty).value,
        dept: document.querySelector(UISelectors.dept).value,
        level: document.querySelector(UISelectors.level).value,
        school: document.querySelector(UISelectors.school).value
      };
    },
    setEditDetails: function (detail) {
      const UISelectors = UICtrl.getSelectors();

      const data = detail;

      document.querySelector(UISelectors.name).value = data[0].name;
      document.querySelector(UISelectors.faculty).value = data[0].faculty;
      document.querySelector(UISelectors.dept).value = data[0].dept;
      document.querySelector(UISelectors.level).value = data[0].level;
      document.querySelector(UISelectors.school).value = data[0].school;
    },
    getCourses: function () {
      const UISelectors = UICtrl.getSelectors();

      return {
        courseCode: document.querySelector(UISelectors.courseCode).value,
        creditUnit: document.querySelector(UISelectors.creditUnit).value,
        score: document.querySelector(UISelectors.score).value
      };
    },
    grades: function () {
      return {
        A: "70",
        B: "60 - 69",
        C: "50 - 59",
        D: "45 - 49",
        E: "40 - 44",
        F: "0 - 39"
      };
    },
    gradePoint: function () {
      return {
        A: "5",
        B: "4",
        C: "3",
        D: "2",
        E: "1",
        F: "0"
      };
    }
  };
})();

// UI controller
const UICtrl = (function () {
  const UISelectors = {
    name: "#name",
    faculty: "#faculty",
    dept: "#dept",
    level: "#level",
    school: "#school",
    submitBtn: "#submitDetails",
    editBtn: "#editDetails",
    output: "#output",
    textInputs: "#enterDetails",
    resultInputSection: "#resultInputSection",
    resultOutputSection: "#resultOutputSection",
    calcResult: "#calcSemResult",
    selectSem: "#selectSem",
    resultInput: "#resultInput",
    resultOutput: "#resultOutput",
    submitCourse: ".submitCourse",
    courseCode: "#courseCode",
    creditUnit: "#creditUnit",
    score: "#score"
  };

  return {
    getSelectors: function () {
      return UISelectors;
    },
    showDetails: function (detail) {
      let dataOutput = "";

      if (detail) {
        dataOutput += `
        <div class='container mx-auto'>
        <h5 class='text-center'>
        <i>
        Welcome, here are your details.</i>
        </h5>
        <li>Name : ${detail.name} </li>
        <li>Faculty : ${detail.faculty} </li>
        <li>Department : ${detail.dept} </li>
        <li>Level : ${detail.level} </li>
        <li>School : ${detail.school} </li>
        </div>
        `;
      }

      document.querySelector(UISelectors.output).innerHTML = dataOutput;
    },
    displayState: function () {
      document.querySelector(UISelectors.editBtn).style.display = "inline";

      document.querySelector(UISelectors.submitBtn).style.display = "none";

      document.querySelector(UISelectors.textInputs).style.display = "none";

      document.querySelector(UISelectors.resultInputSection).style.display =
        "block";
    },
    editState: function () {
      document.querySelector(UISelectors.editBtn).style.display = "none";

      document.querySelector(UISelectors.output).innerHTML = "";

      document.querySelector(UISelectors.submitBtn).style.display = "inline";

      document.querySelector(UISelectors.textInputs).style.display = "block";

      document.querySelector(UISelectors.resultInputSection).style.display =
        "none";

      document.querySelector(UISelectors.resultOutputSection).style.display =
        "none";
    }
  };
})();

// App controller
const App = (function (ItemCtrl, UICtrl) {
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();

    document
      .querySelector(UISelectors.submitBtn)
      .addEventListener("click", displayDetails);

    document
      .querySelector(UISelectors.editBtn)
      .addEventListener("click", editDetails);

    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    document
      .querySelector(UISelectors.selectSem)
      .addEventListener("change", getSemester);

    document
      .querySelector(UISelectors.resultInput)
      .addEventListener("click", submitCourse);

    document
      .querySelector(UISelectors.calcResult)
      .addEventListener("click", calcResult);
  };

  const displayDetails = function (e) {
    const details = ItemCtrl.getDetails();
    const UISelectors = UICtrl.getSelectors();

    if (
      details.name !== "" &&
      details.faculty !== "" &&
      details.dept !== "" &&
      details.level !== "Level" &&
      details.school !== ""
    ) {
      UICtrl.displayState();

      UICtrl.showDetails(details);

      StorageCtrl.storeDetail(details);
    } else {
      let errorOutput = `<p class='alert text-danger'>Please fill in all the required details.</p>`;

      document.querySelector(UISelectors.output).innerHTML = errorOutput;
    }

    e.preventDefault();
  };

  const editDetails = function (e) {
    UICtrl.editState();

    const editDetail = StorageCtrl.getDetailFromStorage();

    ItemCtrl.setEditDetails(editDetail);

    localStorage.removeItem("data");

    e.preventDefault();
  };

  const getSemester = function (e) {
    const UISelectors = UICtrl.getSelectors();

    document.querySelector(UISelectors.editBtn).style.display = "none";

    let output = ``;
    if (e.target.value == 1) {
      output += `
      <form class="form-inline">
       <div class="form-group">
        <legend>First Semester</legend>
          <div class="row">
            <div class="col-md">
              <input type="text" id="courseCode" class="form-control m-2 p-1" placeholder="Course Code">
              <input type="number" id="creditUnit" class="form-control m-2 p-1" placeholder="Credit Unit">
              <input type="number" id="score" class="form-control m-2 p-1" placeholder="Score">
            </div>
          </div>
           <br>
          <div class="m-2">
            <button class="btn btn-primary btn-sm submitCourse">submit</button>
          </div>
        </div>
      </form>`;

      document.querySelector(UISelectors.resultInput).innerHTML = output;
      document.querySelector(UISelectors.selectSem).style.display = "none";
    } else if (e.target.value == 2) {
      output += `
      <form class="form-inline">
       <div class="form-group">
        <legend>Second Semester</legend>
          <div class="row">
            <div class="col-md">
              <input type="text" id="courseCode" class="form-control m-2 p-1" placeholder="Course Code">
              <input type="number" id="creditUnit" class="form-control m-2 p-1" placeholder="Credit Unit">
              <input type="number" id="score" class="form-control m-2 p-1" placeholder="Score">
            </div>
          </div>
           <br>
          <div class="m-2">
            <button class="btn btn-primary btn-sm submitCourse">submit</button>
          </div>
        </div>
      </form>`;

      document.querySelector(UISelectors.resultInput).innerHTML = output;
      document.querySelector(UISelectors.selectSem).style.display = "none";
    } else {
      document.querySelector(UISelectors.resultInput).innerHTML = "";
    }
  };

  let data = [];

  const submitCourse = function (e) {
    const UISelectors = UICtrl.getSelectors();

    if (e.target.classList.contains("submitCourse")) {
      const course = ItemCtrl.getCourses();
      if (
        course.courseCode !== "" &&
        course.creditUnit !== "" &&
        course.score !== ""
      ) {
        data.push(course);

        let rows = ``;

        data.forEach(function (course) {
          rows += `
          <tr>
            <td class='text-center'>${course.courseCode}</td>
            <td class='text-center'>${course.creditUnit}</td>
            <td class='text-center'>${course.score}</td>
          </tr>
          `;
        });

        let result = `
            <table>
              <colgroup span="3"></colgroup>
                <thead>
                  <tr>
                    <th>CourseCode</th>
                    <th>CreditUnit</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows}
                </tbody>
            </table>
          `;

        document.querySelector(UISelectors.resultOutput).innerHTML = result;
        document.querySelector(UISelectors.resultOutputSection).style.display =
          "block";
      } else {
        let errorOutput = `<p class='alert text-danger'>Please fill in all your course details.</p>`;

        document.querySelector(
          UISelectors.resultOutput
        ).innerHTML = errorOutput;

        document.querySelector(UISelectors.resultOutputSection).style.display =
          "none";
      }
    }

    e.preventDefault();
  };

  const calcResult = function (e) {
    const grades = ItemCtrl.grades();
    const gradePoint = ItemCtrl.gradePoint();

    for (x in data) {
      let score = data[x].score;
      let creditUnit = data[x].creditUnit;

      if (score === grades.A) {
        console.log(123);
      }
    }
    e.preventDefault();
  };

  return {
    init: function () {
      localStorage.clear();

      UICtrl.editState();

      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

App.init();