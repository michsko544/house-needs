import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "store/auth";
import { supabase } from "supabase";

export default function AppInit(): null {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const user = supabase.auth.user();
    if (user !== null && user.role === "authenticated") {
      dispatch(login(user));
      history.replace("/");
    }
  }, [dispatch, history]);

  return null;
}
