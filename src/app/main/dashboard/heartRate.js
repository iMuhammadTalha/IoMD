import React, { Component } from "react";
import {Paper, Typography} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as Actions from "./store/actions";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

class HeartRate extends Component {

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        let patient_id = localStorage.getItem('id');

        const url = "vital/get-a-recent-vital/"+patient_id;

        this.props.getPatientRecentVital(url);
    }

    render() {
        const { heart_rate } = this.props;
        return (
            <Paper className="w-full rounded-8 border-1">
                {this.props.user.role[0] !== "fleet" &&
                <div className="flex items-center justify-end pr-4 pl-16 pt-4">
                    <IconButton aria-label="more" onClick={this.refreshData}>
                        <Icon>refresh</Icon>
                    </IconButton>
                </div>
                }
                <div className="text-center pt-12 pb-28" style={{overflow: "auto"}}>
                    <Typography
                        className="text-56 leading-none text-purple-dark">{heart_rate ? heart_rate : 0}</Typography>
                    <Typography className="text-16" color="textSecondary"><h3>beats per min</h3></Typography>
                    <Typography className="text-16" color="textSecondary"><h1>Heart Rate</h1></Typography>
                </div>
            </Paper>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getPatientRecentVital: Actions.getPatientRecentVital
        },
        dispatch
    );
}

function mapStateToProps({ DashBoardApp, auth }) {
    return {
        heart_rate: DashBoardApp.DashboardReducer.heart_rate,
        user: auth.user
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HeartRate)
);
