import React, { useContext, useEffect } from "react";

// axios
import axios from "axios";

// form validation
import { useFormik } from "formik";
import * as Yup from "yup";

// context
import WindowLayoutContext from "../../context/windowLayoutContext";

// styles
import styles from "./user-form.module.css";

const addValidation = Yup.object({
  firstName: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(15, "Maximum 15 characters")
    .required("Required!"),
  lastName: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(15, "Maximum 15 characters")
    .required("Required!"),
  age: Yup.number().min(2, "Minimum 2 characters").required("Required!"),
});

const updateValidation = Yup.object({
  id: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(100, "Maximum 15 characters")
    .required("Required!"),
  firstName: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(15, "Maximum 15 characters")
    .required("Required!"),
  lastName: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(15, "Maximum 15 characters")
    .required("Required!"),
  age: Yup.number().min(2, "Minimum 2 characters").required("Required!"),
});

const UserForm = () => {
  const { activeTabId } = useContext(WindowLayoutContext);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
    },
    validationSchema: activeTabId === 0 ? addValidation : updateValidation,
    onSubmit: async (values, { resetForm }) => {
      if (activeTabId === 0) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/users`,
            values
          );

          console.log(response);
          resetForm({
            values: {
              firstName: "",
              lastName: "",
              age: "",
            },
          });
        } catch (error) {
          console.log(error);
        }
      }

      if (activeTabId === 1) {
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/users/${values.id}`,
            values
          );
          console.log(response);
          resetForm({
            values: {
              id: "",
              firstName: "",
              lastName: "",
              age: "",
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  useEffect(() => {
    if (activeTabId === 1) {
      formik.setValues({
        id: "",
        firstName: "",
        lastName: "",
        age: "",
      });
    } else {
      formik.setValues({
        firstName: "",
        lastName: "",
        age: "",
      });
    }
  }, [activeTabId]);

  console.log(formik.values);

  return (
    <div>
      <h1>Form - {activeTabId === 0 ? "Add User" : "Update User"}</h1>
      <form className={styles.userForm} onSubmit={formik.handleSubmit}>
        {activeTabId === 1 && (
          <div>
            <label className={styles.formLabel}>Id</label>
            <input
              className={styles.formInput}
              type="text"
              name="id"
              value={formik.values.id}
              onChange={formik.handleChange}
            />
            {formik.errors.id && formik.touched.id && <p>{formik.errors.id}</p>}
          </div>
        )}
        <div>
          <label className={styles.formLabel}>First Name</label>
          <input
            className={styles.formInput}
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          {formik.errors.firstName && formik.touched.firstName && (
            <p>{formik.errors.firstName}</p>
          )}
        </div>
        <div>
          <label className={styles.formLabel}>Last Name</label>
          <input
            className={styles.formInput}
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          {formik.errors.lastName && formik.touched.lastName && (
            <p>{formik.errors.lastName}</p>
          )}
        </div>
        <div>
          <label className={styles.formLabel}>Age</label>
          <input
            className={styles.formInput}
            type="number"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
          />
          {formik.errors.age && formik.touched.age && (
            <p>{formik.errors.age}</p>
          )}
        </div>
        <div>
          <button className={styles.formButton} type="submit">
            {activeTabId === 0 ? "Add User" : "Update User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
