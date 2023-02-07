import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createAction, readAction } from "../redux/slices/InerySlices";

function Main() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(createAction());
  }, []);

  return (
    <Fragment>
      <div className="container-custom">
        <div className="box-main">
          <div className="btn-group">
            <button className="btn btn-primary">Create</button>
            <button className="btn btn-secondary">Read</button>
            <button className="btn btn-warning">Update</button>
            <button className="btn btn-warning">Delete</button>
          </div>
          <div className="body-content">
            <form action="">
              <div className="form-group mb-2">
                <label htmlFor="id">ID</label>
                <input
                  type="text"
                  placeholder="0000"
                  className="form-control"
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="id">Message</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  className="form-control"
                ></textarea>
              </div>
              <div className="form-group mt-2">
                <button className="btn btn-success w-100">Action</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Main;
