import { useState } from "react";
import useInput from "../../hooks/use-input";
import classes from "./NewUser.module.css";

const NewUser = (props) => {
  const [formHasError, setFormHasError] = useState(false);

  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameInputChangeHandler,
    inputBlurHandler: usernameInputBlurHandler,
    reset: resetUsernameInput,
  } = useInput((value) => value.trim() !== "");

  const submitHandler = (event) => {
    event.preventDefault();

    if (!enteredUsernameIsValid) {
      setFormHasError(true);
      return;
    }

    setFormHasError(false);
    sessionStorage.setItem("user", enteredUsername);
    props.sessionChange(true);

    resetUsernameInput();
  };

  const usernameInputClasses = usernameInputHasError
    ? classes["form-control-invalid"]
    : classes["form-control"];

  return (
    <form autoComplete="off" onSubmit={submitHandler}>
      {formHasError && (
        <p className={classes["error-text"]}>Please enter your username.</p>
      )}

      <div className={usernameInputClasses}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={enteredUsername}
          onChange={usernameInputChangeHandler}
          onBlur={usernameInputBlurHandler}
        />
        {usernameInputHasError && (
          <p className={classes["error-text"]}>
            Please enter a valid username.
          </p>
        )}
      </div>

      <div className={classes["form-actions"]}>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default NewUser;
