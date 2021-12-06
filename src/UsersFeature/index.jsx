import React, { useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

export default function UsersFeature() {
  const [userList, setUserList] = useState([]);
  const [updatedUser, setUpdatedUser] = useState(undefined);

  const onSubmit = (values) => {
    setUserList((prevUserList) => [
      ...prevUserList,
      { id: Date.now(), ...values },
    ]);
  };

  const onDelete = (user) => {
    setUserList((prevUserList) =>
      [...prevUserList].filter((u) => u.id !== user.id)
    );
  };

  const onUpdate = (user) => {
    setUpdatedUser({ ...user });
  };

  const onSubmitUpdate = (values) => {
    const index = userList.findIndex((user) => user.id === updatedUser.id);
    if (index >= 0) {
      setUserList((prevUserList) => {
        prevUserList[index] = { ...values };
        return [...prevUserList];
      });
    }
    setUpdatedUser(undefined);
  };

  return (
    <div>
      <UserForm
        onSubmitUpdate={onSubmitUpdate}
        updatedUser={updatedUser}
        onSubmit={onSubmit}
      />
      <UserList onUpdate={onUpdate} onDelete={onDelete} userList={userList} />
    </div>
  );
}
