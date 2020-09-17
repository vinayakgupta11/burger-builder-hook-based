import React, { Component } from "react";
import Aux from "../Auxillary/Auxillary";
import Modal from "../../components/UI/Modals/Modal";
const withErrorHandler = (WrappedComponent,axios) => {
  return class extends Component {
      state={
          error:null
      };
      componentWillMount()
      {
          this.reqint=axios.interceptors.request.use(req=>{
              this.setState({error:null});
              return req;
          })
         this.resint= axios.interceptors.response.use(res=>res,err=>{
              this.setState({error:err});

          })
      }
      componentWillUnmount()
      {
          axios.interceptors.request.eject(this.reqint);
          axios.interceptors.response.eject(this.resint);

      }
      errorConfirmHandler=()=>{
          this.setState({error:null});
      }
      render()
      {
          return(
            <Aux>
            <Modal show={this.state.error}
            modalClosed={this.errorConfirmHandler}>
                {this.state.error? this.state.error.message:null}
            </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
          )}};
};
export default withErrorHandler;
