import { useEffect, useRef, useState } from "react";
import { User } from "./interfaces/request.response";
import { loadUserAction } from "./actions/load-user.actions";

 const useUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const currentPageRef = useRef(1);

  useEffect(() => {
    loadUserAction(1).then(setUsers);
  }, []);

  const nextPage = async () => {
    currentPageRef.current++;
    const users = await loadUserAction(currentPageRef.current);

    if (users.length > 0) {
      setUsers(users);
    } else {
      currentPageRef.current--;
    }
  };

  const prevPage = async () => {
    if (currentPageRef.current < 1) return;

    currentPageRef.current--;

    const users = await loadUserAction(currentPageRef.current);
    setUsers(users);
  };

  return { users, nextPage, prevPage };
};

export { useUser };

