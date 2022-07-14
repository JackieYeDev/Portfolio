import { useState, useEffect } from "react";

function useGetUsers() {
  const [userList, setUserList] = useState([]);
  const url = "https://dry-lowlands-31397.herokuapp.com/users";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) =>
        setUserList(
          data.map((user) => {
            return {
              id: user.id,
              username: user.username,
            };
          })
        )
      );
  }, []);

  return [userList, setUserList];
}

export default useGetUsers;
