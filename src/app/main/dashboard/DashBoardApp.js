/** @format */

import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FuseAnimateGroup } from "@fuse";
import {FusePageSimple} from "@fuse";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import withReducer from "app/store/withReducer";


import Doctor from "./doctor"
import Patient from "./patient"
import CareTaker from "./caretaker"

import Vital from "./vital"
import BP from "./bp"
import HeartRate from "./heartRate"
import Temperature from "./temperature"
import SPO2 from "./spo2"
import RespirationRate from "./respiration"

import reducer from "./store/reducers";

import "./style.css";


const styles = () => ({
    addButton: {
        position: "fixed",
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class DashBoardApp extends Component {
    state = {
        user_id: "",
        role: localStorage.getItem('Role')
    };
    render() {
        const {classes} = this.props;
        if (!localStorage.getItem('jwtToken')) {
            window.location = '/home';
        }
        return (
            // <FusePageSimple
            //     classes={{
            //         root: classes.layoutRoot
            //     }}
            //     header={
            //         <div className="p-24"><h4>IoMD</h4></div>
            //     }
            //     contentToolbar={
                    
                    
            //     }
            // />
            <div className="w-full p-12">
                <FuseAnimateGroup
                    className="flex flex-wrap"
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    {/* <div className="mb-16 w-full">
                        <div className="widget w-full p-16">
                            <RecentAQI />
                        </div>
                    </div> */}
                       
                    
                    {/* <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                        <CH4 />
                    </div>
                    
                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                        <NO2 />
                    </div>

                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                        <NH3 />
                    </div>

                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                        <CO />
                    </div>

                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                        <CO2 />
                    </div>
                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                        <Temperature />
                    </div>
                    
                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                        <Dust />
                    </div> 
*/}


                {this.state.role== 'admin' ? (
                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                        < Doctor />
                    </div>
                ) : null}

                {this.state.role== 'admin' || this.state.role== 'doctor' ? (
                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                        < Patient />
                    </div>
                ) : null}

                {this.state.role== 'admin' ? (
                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                        < CareTaker />
                    </div>
                ) : null}

                {/* {this.state.role== 'patient' ? (
                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                        < Vital />
                    </div>
                ) : null} */}

                {this.state.role== 'patient' || this.state.role== 'caretaker' ? (
                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                        < BP />
                    </div>
                ) : null}

                {this.state.role== 'patient' || this.state.role== 'caretaker' ? (
                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                        < HeartRate />
                    </div>
                ) : null}

                {this.state.role== 'patient' || this.state.role== 'caretaker' ? (
                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                        < Temperature />
                    </div>
                ) : null}

                {this.state.role== 'patient' || this.state.role== 'caretaker' ? (
                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                        < SPO2 />
                    </div>
                ) : null}

                {this.state.role== 'patient' || this.state.role== 'caretaker' ? (
                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                        < RespirationRate />
                    </div>
                ) : null}


                </FuseAnimateGroup>
            
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            // getAllAdminUsers: Actions.getAllAdminUsers,
            // openNewAdminDialog: Actions.openNewAdminDialog
        },
        dispatch
    );
}

function mapStateToProps({ auth }) {
    return {
        user: auth.user
    };
}

export default withReducer(
    "DashBoardApp",
    reducer
)(
    withStyles(styles, { withTheme: true })(
        withRouter(connect(mapStateToProps, mapDispatchToProps)(DashBoardApp))
    )
);
