import axios from "axios";

const apiEP = import.meta.env.VITE_API_URL + "/api/v1/tasks";
export const postNewTask = async (taskObj) => {
  try {
    const { data } = await axios.post(apiEP, taskObj);

    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const getAllTasks = async () => {
  try {
    const { data } = await axios.get(apiEP);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

// ids must be an array when doing bulk delete
export const deleteTasks = async (ids) => {
  try {
    // send one id as params
    //
    const { data } = await axios.delete(apiEP, { data: ids });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};
export const updateTask = async (_id) => {
  try {
    const { data } = await axios.patch(apiEP, _id);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};