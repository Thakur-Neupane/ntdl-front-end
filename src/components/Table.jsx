import React, { useState } from "react";
import { deleteTasks } from "../utils/axiosHelper";

export const Table = ({ entryList, switchTask, fetchAllTasks }) => {
  const [idsToDelete, setIdsToDelete] = useState([]);

  const entries = entryList.filter((item) => item.type === "entry");
  const badList = entryList.filter((item) => item.type === "bad");

  const handelOnSelect = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setIdsToDelete([...idsToDelete, value]);
    } else {
      //remove

      setIdsToDelete(idsToDelete.filter((_id) => _id !== value));
    }
  };

  const handelOnSelectAll = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    const ids =
      value === "entry"
        ? entries.map((entry) => entry._id)
        : badList.map((bad) => bad._id);

    checked
      ? setIdsToDelete([...new Set([...idsToDelete, ...ids])])
      : setIdsToDelete(idsToDelete.filter((id) => !ids.includes(id)));
  };

  const handOnDelete = async (ids) => {
    if (window.confirm("Are you sure, you want to delete the items?")) {
      const { status, message } = await deleteTasks(ids);
      if (status === "success") {
        setIdsToDelete([]);
        fetchAllTasks();
        alert(message);
      }
    }
  };

  console.log(idsToDelete);

  return (
    <>
      <div className="row mt-5 gap-2">
        {/* <!-- entry list --> */}
        <div className="col-md">
          <h3 className="text-center">Entry List</h3>
          <hr />
          <div>
            <input
              type="checkbox"
              className="form-check-input"
              id="selectEntryList"
              onChange={handelOnSelectAll}
              value="entry"
              checked={entries.every(item =>idsToDelete.includes(item._id))}
            />
            <label htmlFor="selectEntryList">Select all entry list</label>
          </div>
          <table className="table table-striped table-hover">
            <tbody id="entry">
              {entries.map((item, i) => (
                <tr key={item._id}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={handelOnSelect}
                      value={item._id}
                      checked={idsToDelete.includes(item._id)}
                    />
                  </td>
                  <th>{i + 1}</th>
                  <td>{item.task}</td>
                  <td>{item.hr}hrs</td>
                  <td className="text-end">
                    {/* <button
                    onClick={() => handOnDelete(item._id)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button> */}
                    <button
                      onClick={() => switchTask(item._id, "bad")}
                      className="btn btn-success btn-sm"
                    >
                      <i className="fa-sharp fa-solid fa-arrow-right-long"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <!-- bad list --> */}
        <div className="col-md">
          <h3 className="text-center">Bad List</h3>
          <hr />
          <div>
            <input
              type="checkbox"
              className="form-check-input"
              id="selectEntryList"
              onChange={handelOnSelectAll}
              value="bad"
              checked={badList.every(item =>idsToDelete.includes(item._id))}
            />
            <label htmlFor="selectEntryList">Select all Bad list</label>
          </div>
          <table className="table table-striped table-hover">
            <tbody id="bad">
              {badList.map((item, i) => (
                <tr key={item._id}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={handelOnSelect}
                      value={item._id}
                      checked={idsToDelete.includes(item._id)}
                    />
                  </td>
                  <th>{i + 1}</th>
                  <td>{item.task}</td>
                  <td>{item.hr}hrs</td>
                  <td className="text-end">
                    <button
                      onClick={() => switchTask(item._id, "entry")}
                      className="btn btn-warning btn-sm"
                    >
                      <i
                        className="fa-sharp fa-solid fa-arrow-left-long
                    "
                      ></i>
                    </button>
                    {/* <button
                    onClick={() => handOnDelete(item._id)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="alert alert-success" role="alert">
            You could have saved ={" "}
            <span id="total-bad">
              {badList.reduce((acc, item) => acc + item.hr, 0)}
            </span>
            hrs last week
          </div>
        </div>
      </div>

      {idsToDelete.length > 0 && (
        <div className="d-grid mb-3">
          <button
            className="btn btn-danger btn-lg"
            onClick={() => handOnDelete(idsToDelete)}
          >
            <i className="fa-solid fa-trash"></i> Delete {idsToDelete.length}
            task(s)
          </button>
        </div>
      )}
    </>
  );
};