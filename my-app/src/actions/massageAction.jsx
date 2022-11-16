import axios from "axios";
import {
  MASSAGE_INSERT_REQUEST,
  MASSAGE_INSERT_SUCCESS,
  MASSAGE_INSERT_FAIL,
  FILE_UPLOARD_REQUEST,
  FILE_UPLOARD_SUCCESS,
  FILE_UPLOARD_FAIL,
} from "../constants/massageConstants";

export const massageInsert = (title, message) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MASSAGE_INSERT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "https://localhost:5000/api/protected/messages/create",
      { title, message },
      config
    );

    dispatch({
      type: MASSAGE_INSERT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: MASSAGE_INSERT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fileUploard = (getfile) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FILE_UPLOARD_REQUEST,
    });

    const file = getfile;
    const formData = new FormData();

    formData.append("image", file);

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      "https://localhost:5000/api/protected/files/upload",
      formData,
      config
    );

    dispatch({
      type: FILE_UPLOARD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: FILE_UPLOARD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
