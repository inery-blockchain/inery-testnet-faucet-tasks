import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAction, readAction } from "../redux/slices/InerySlices";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
const formSchema = Yup.object({
  id: Yup.number().typeError("ID must be a number").required("ID is required"),
  // data: Yup.string().required("Message is required"),
});

function Main() {
  const dispatch = useDispatch();
  const user = "emblem1";
  const myAcoount = "emblem1";
  const actor = "emblem1";
  const [action, setAction] = useState("1");
  const [label, setLabel] = useState("create");
  // const id = Math.floor(Math.random() * 10000);
  // const values = {
  //   id: id,
  //   user: user,
  //   account: myAcoount,
  //   actor: actor,
  //   data: "Create Transaction via JSON RPC Successfully",
  // };
  // dispatch(createAction(values))

  const storeData = useSelector((store) => store?.inery);
  const { loading, create, read } = storeData;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: null,
      data: "",
    },
    onSubmit: (values) => {
      values.user = user;
      values.account = myAcoount;
      values.actor = actor;
      console.log(values);
      if (values.id !== 125) {
        if (action === "1") {
          dispatch(createAction(values));
        } else if (action === "2") {
          dispatch(readAction(values));
        }
      }
    },
    validationSchema: formSchema,
  });

  const handelIdRandom = () => {
    let idRandom = Math.floor(Math.random() * 10000);
    formik.setFieldValue("id", idRandom);
  };

  const renderTx = () => {
    if (action === "1") {
      return (
        <div className="box-data-hash">
          <b>Data Transaction Hash:</b>
          <pre>
            {create ? <code>{JSON.stringify(create, null, 2)}</code> : "{}"}
          </pre>
        </div>
      );
    } else if (action === "2") {
      return (
        <div className="box-data-hash">
          <b>Data Transaction Hash:</b>
          <pre>
            {read ? <code>{JSON.stringify(read, null, 2)}</code> : "{}"}
          </pre>
        </div>
      );
    }
  };

  const exampleId = () => {
    if (action === "1") {
      return false;
    } else {
      return "ID: 125 For testing action read, and update ";
    }
  };

  return (
    <Fragment>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container-custom">
        <div className="box-main">
          <div className="text-center">
            <div className="input-group m-auto">
              <button
                onClick={() => {
                  setAction("1");
                  setLabel("create");
                }}
                className={`btn btn-outline-primary ${
                  action === "1" ? "active" : ""
                }`}
              >
                Create
              </button>
              <button
                onClick={() => {
                  setAction("2");
                  setLabel("read");
                }}
                className={`btn btn-outline-secondary ${
                  action === "2" ? "active" : ""
                }`}
              >
                Read
              </button>
              <button
                className={`btn btn-outline-warning ${
                  action === "3" ? "active" : ""
                }`}
              >
                Update
              </button>
              <button
                className={`btn btn-outline-danger ${
                  action === "4" ? "active" : ""
                }`}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="body-content">
            {exampleId()}
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-2">
                <label htmlFor="id">ID</label>
                <div className="input-costum">
                  <input
                    type="text"
                    placeholder="0000"
                    value={formik.values.id}
                    onChange={formik.handleChange("id")}
                    onBlur={formik.handleBlur("id")}
                    className={`form-control ${
                      formik.errors.id && "is-invalid"
                    }`}
                  />
                  {formik.touched.id && (
                    <div
                      id="validationServer03Feedback"
                      className="invalid-feedback"
                    >
                      {formik.errors.id}
                    </div>
                  )}
                  <span onClick={() => handelIdRandom()}>Random</span>
                </div>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="data">Message</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  value={formik.values.data}
                  onChange={formik.handleChange("data")}
                  onBlur={formik.handleBlur("data")}
                  className={`form-control ${
                    formik.errors.data && "is-invalid"
                  }`}
                ></textarea>
                {formik.touched.data && (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.data}
                  </div>
                )}
              </div>
              <div className="form-group mt-2">
                {loading ? (
                  <button
                    type="submit"
                    disabled
                    className="btn btn-success w-100"
                  >
                    Loading...
                  </button>
                ) : (
                  <button type="submit" className="btn btn-success w-100">
                    {label}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        {renderTx()}
      </div>
    </Fragment>
  );
}

export default Main;
