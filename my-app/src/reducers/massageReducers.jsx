import {
  MASSAGE_INSERT_REQUEST,
  MASSAGE_INSERT_SUCCESS,
  MASSAGE_INSERT_FAIL,
  FILE_UPLOARD_REQUEST,
  FILE_UPLOARD_SUCCESS,
  FILE_UPLOARD_FAIL,
} from "../constants/massageConstants";

export const massageInsertReducer = (state = {}, action) => {
  switch (action.type) {
    case MASSAGE_INSERT_REQUEST:
      return { loading: true, success: false };
    case MASSAGE_INSERT_SUCCESS:
      return { loading: false, success: true };
    case MASSAGE_INSERT_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const uploadFileReducesr = (state = {}, action) => {
  switch (action.type) {
    case FILE_UPLOARD_REQUEST:
      return { succes: false };
    case FILE_UPLOARD_SUCCESS:
      return { succes: true };
    case FILE_UPLOARD_FAIL:
      return { succes: false, errorr: action.payload };
    default:
      return state;
  }
};
