import React, { useReducer } from "react";
import * as styles from "./form.module.css";

const INITIAL_STATE = {
  name: "",
  email: "",
  subject: "",
  body: "",
  status: "IDLE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateFieldValue":
      return { ...state, [action.field]: action.value };
    case "updateStatus":
      return { ...state, status: action.status };
    case "reset":
      return INITIAL_STATE;
    default:
      return state;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setStatus = (status) => dispatch({ type: "updateStatus", status });

  const updateFieldValue = (field) => (event) => {
    dispatch({
      type: "updateFieldValue",
      field,
      value: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("PENDING");

    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(state),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setStatus("SUCCESS");
      })
      .catch((error) => {
        console.log(error);
        setStatus("ERROR");
      });
  };

  if (state.status === "SUCCESS") {
    return (
      <p className={styles.success}>
        The message was sent{" "}
        <button type="reset" onClick={() => dispatch({ type: "reset" })}>
          Reset
        </button>
      </p>
    );
  }

  return (
    <>
      {state.status === "ERROR" && (
        <p className={styles.error}>Something went wrong</p>
      )}
      <form
        className={`${styles.form} ${
          state.status === "PENDING" && styles.pending
        }`}
        onSubmit={handleSubmit}
      >
        <label className={styles.label}>
          Name
          <input
            name="name"
            className={styles.input}
            value={state.name}
            onChange={updateFieldValue("name")}
          />
        </label>
        <label className={styles.label}>
          Email
          <input
            type="email"
            name="email"
            className={styles.input}
            value={state.email}
            onChange={updateFieldValue("email")}
          />
        </label>
        <label className={styles.label}>
          Subject
          <input
            name="subject"
            className={styles.input}
            value={state.subject}
            onChange={updateFieldValue("subject")}
          />
        </label>
        <label className={styles.label}>
          Body
          <textarea
            name="body"
            className={styles.input}
            value={state.body}
            onChange={updateFieldValue("body")}
          />
        </label>
        <button className={styles.button}>Send</button>
      </form>
    </>
  );
};

export default Form;
