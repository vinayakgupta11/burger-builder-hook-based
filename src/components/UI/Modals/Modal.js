import React from "react";
import Classes from "./Modal.css";
import Aux from "../../../hoc/Auxillary/Auxillary";
import Backdrop from "../Backdrop/Backdrop";
const modal=props=> {
    // shouldComponentUpdate(nextProps,nextState){
    //     return nextProps.show!==this.props.show || nextProps.children!== this.props.children;
    // }
 
     return(
        <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
          className={Classes.Modal}
          style={{
            transform: props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: props.show ? "1" : "0",
          }}
        >
          {props.children}
        </div>
      </Aux>
     )
 
};
export default React.memo(modal);
