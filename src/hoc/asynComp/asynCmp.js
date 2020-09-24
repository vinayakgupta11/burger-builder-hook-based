import React, { Component } from 'react';

const asynCmp=(impCmp)=>{
    return class extends Component{
        state={
            component:null
        };
        componentDidMount()
        {
            impCmp()
            .then(cmp=>{
                this.setState({component:cmp.default});
            });
        }
        render()
        {
            const RetCmp= this.state.component;
            return(
                RetCmp? <RetCmp {...this.props}/>:null
            );
        }
    }
}
export default asynCmp;