import { useState, useEffect } from "react";

function useGetUsersList() {
  const [userList, setUserList] = useState([]);
  const url = "https://dry-lowlands-31397.herokuapp.com/users";
  let fetchData;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (data) =>
          (fetchData = data.map((user) => {
            return {
              id: user.id,
              username: user.username,
              password: user.password,
              stocks: user.stocks,
            };
          }))
      )
      .finally(() => {
        setUserList(
          fetchData.map((data) => ({
            id: data.id,
            username: data.username,
            password: data.password,
            stocks: data.stocks,
          }))
        );
      })
      .catch((err) => console.error(err));
  }, []);
  return [userList, setUserList];
}

export default useGetUsersList;
