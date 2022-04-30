import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as taskActionCreators from "../store/actions/taskActionCreators";

export const useTaskActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(taskActionCreators, dispatch);
  }, [dispatch]);
};
