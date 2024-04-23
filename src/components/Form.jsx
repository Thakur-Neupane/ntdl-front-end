/* eslint-disable react/prop-types */
import { useState } from "react";
import { postNewTask } from "../utils/axiosHelper";

const initialState = {
  task: "",
  hr: "",
  type: "entry",
};

const ttHrPerWk = 24 * 7;
export const Form = ({ fetchAllTasks, ttlHr }) => {
  //local state
  const [form, setForm] = useState(initialState);
  const [response, setRespons] = useState({});

  // create a function that receives the form data and updates to the local state
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    response.message && setRespons({});

    setForm({
      ...form,
      [name]: name === "hr" ? +value : value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    //decide

    if (ttlHr + form.hr > ttHrPerWk) {
      return alert("sorry Boss not enough hours left to fit this task");
    }

    const result = await postNewTask(form);
    setRespons(result);

    if (result.status === "success") {
      setForm(initialState);
      fetchAllTasks();
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-5 border p-5 rounded shadow-lg bg-transparent"
    >
      {response?.message && (
        <div className="row">
          <div
            className={
              response.status === "success"
                ? "alert alert-success"
                : "alert alert-danger"
            }
          >
            {response.message}{" "}
          </div>
        </div>
      )}

      <div className="row g-2">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Coding.."
            aria-label="First name"
            name="task"
            required
            // call the fuction on onchange event of the inputfield
            onChange={handleOnChange}
            value={form.task}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            min="1"
            className="form-control"
            placeholder="23"
            aria-label="Last name"
            name="hr"
            required
            onChange={handleOnChange}
            value={form.hr}
          />
        </div>
        <div className="col-md-3">
          <div className="d-grid">
            <button className="btn btn-primary">Add Task</button>
          </div>
        </div>
      </div>
    </form>
  );
};
