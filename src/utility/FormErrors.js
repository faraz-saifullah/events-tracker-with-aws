import React from "react";

function FormErrors(props) {
  if (
    props.formerrors &&
    (props.formerrors.blankField || props.formerrors.passwordMatch)
  ) {
    return (
      <div className="error container help is-danger">
        <div className="row justify-content-center">
          {props.formerrors.passwordMatch
            ? "Password value does not match confirm password value"
            : ""}
        </div>
        <div className="row justify-content-center help is-danger">
          {props.formerrors.blankField ? "All fields are required" : ""}
        </div>
      </div>
    );
  }
  if (props.apierrors) {
    return (
      <div className="error container help is-danger">
        <div className="row justify-content-center">{props.apierrors}</div>
      </div>
    );
  }
  if (props.formerrors && props.formerrors.cognito) {
    return (
      <div className="error container help is-danger">
        <div className="row justify-content-center">
          {props.formerrors.cognito.message}
        </div>
      </div>
    );
  }
  return <div />;
}

export default FormErrors;
