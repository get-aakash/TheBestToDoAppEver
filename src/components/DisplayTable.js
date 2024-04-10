import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config/firebaseConfig';
import { getTodos } from '../redux/todos';

const DisplayTable = () => {
  const dispatch = useDispatch();
  const { todoData } = useSelector(state => state.todo);
  const { userInfo } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getTodos(userInfo.uid));
  }, [dispatch, userInfo.uid]);

  const handleToggle = async (id) => {
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, {
        completed: !todoData.find(todo => todo.id === id).completed
      });
      dispatch(getTodos(userInfo.uid));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOnDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Todo??")) {
      try {
        await deleteDoc(doc(db, "todos", id));
        toast.success("Todo Deleted successfully !!!");
        dispatch(getTodos(userInfo.uid));
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="table p-2">
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>ToDo</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todoData.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <input
                  className="form-check-input mx-2"
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleToggle(item.id)}
                />
                {item.completed ? 'Acheived' : 'Not Acheived'}
              </td>
              <td style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.todo}</td>
              <td style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.date}</td>
              <td className="text-center gap-3">
                {!item.completed ? (
                  <Link
                    title="Update"
                    className="m-1"
                    to={`/update/${item.id}`}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                ) : (
                  <span className="m-1 disabled-link">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </span>
                )}
                <Link
                  title="Delete"
                  onClick={() => handleOnDelete(item.id)}
                >
                  <i className="fa-solid fa-trash blackColor"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayTable;
