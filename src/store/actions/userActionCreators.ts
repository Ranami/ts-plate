import axios from "axios";
import { Dispatch } from "redux";
import { User, UserAction, UserActionType } from "../../types/userTypes";

export const fetchUsers = () => (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: UserActionType.FETCH_USER });
  axios
    .get<User[]>("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      setTimeout(() => {
        dispatch({
          type: UserActionType.FETCH_USER_SUCCESS,
          payload: res.data,
        });
      }, 1000);
    })
    .catch(() => {
      dispatch({
        type: UserActionType.FETCH_USERS_REJECT,
        payload: "Ошибка при загрузке пользователей",
      });
    });
};
