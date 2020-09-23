import React, { Component } from "react";
import * as authActions from "../../../store/actions/index";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
class Logout extends Component {
    componentDidMount()
    {
        this.props.onLogout();
    }
 

  render() {
  
    return (
      <Redirect to="/"/>
    );
  }
}
// const mapToProps = (state) => {
//   return {
//     loading: state.auth.loading,
//     error: state.auth.error,
//   };
// };
const mapDispatch = (dispatch) => {
  return {
    onLogout: () => dispatch(authActions.logout()),
  };
};
export default connect(null,mapDispatch)(Logout);
