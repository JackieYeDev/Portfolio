import { useState, useEffect } from "react";

function useGetUsers(OPTION) {
  // OPTIONS = ["USERNAMES", "USER-LIST"];
  const [userList, setUserList] = useState([]);
  const url = "https://dry-lowlands-31397.herokuapp.com/users";
  let fetchData;

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        data =>
          (fetchData = data.map(user => {
            return {
              id: user.id,
              username: user.username,
              password: user.password,
              stocks: user.stocks,
            };
          }))
      )
      .finally(() => {
        switch (OPTION) {
          case "USERNAMES":
            setUserList(
              fetchData.map(data => ({
                username: data.username,
              }))
            );
            break;
          case "USER-LIST":
            setUserList(
              fetchData.map(data => ({
                id: data.id,
                username: data.username,
                password: data.password,
                stocks: data.stocks,
              }))
            );
            break;
          default:
            console.error("Something went wrong!");
        }
      })
      .catch(err => console.error(err));
  }, []);
  return [userList, setUserList];
}

export default useGetUsers;
