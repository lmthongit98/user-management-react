import React from "react";

export default function UserList({ userList, onDelete, onUpdate }) {
  const handleDelete = (user) => {
    if (onDelete) {
      onDelete(user);
    }
  };

  const handleUpdate = (user) => {
    if (onUpdate) {
      onUpdate(user);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">UserName</th>
                <th scope="col">Full name</th>
                <th scope="col">Email</th>
                <th>User Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.userType}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(user)}
                      className="btn btn-danger me-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdate(user)}
                      className="btn btn-secondary"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
