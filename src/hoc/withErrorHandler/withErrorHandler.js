import React from "react";
import Aux from "../Auxillary/Auxillary";
import useHttpErrorHandler from "../../hooks/http-error-handler";
import Modal from "../../components/UI/Modals/Modal";
const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);
    return (
      <Aux>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};
export default withErrorHandler;
