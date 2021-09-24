/** @format */

import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {FuseAnimate, FusePageSimple} from "@fuse";
import {Fab, Icon} from "@material-ui/core";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import withReducer from "app/store/withReducer";
import PatientDataList from "./PatientDataList";
import PatientHeader from "./PatientHeader";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import "./style.css";
import PatientDialog from "./PatientDialog";

const styles = (theme) => ({
    addButton: {
        position: "fixed",
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class PatientApp extends Component {
    componentDidMount() {
        this.props.getAllPatients();
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <FusePageSimple
                    header={
                        <PatientHeader pageLayout={() => this.pageLayout}/>
                    }
                    content={<PatientDataList/>}
                    sidebarInner
                    onRef={(instance) => {
                        this.pageLayout = instance;
                    }}
                    innerScroll={false}
                />
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
                        onClick={this.props.openNewPatientDialog}
                    >
                        <Icon>add_person</Icon>
                    </Fab>
                </FuseAnimate>
                <PatientDialog/>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getAllPatients: Actions.getAllPatients,
            openNewPatientDialog: Actions.openNewPatientDialog
        },
        dispatch
    );
}

function mapStateToProps() {
    return {};
}

export default withReducer(
    "PatientApp",
    reducer
)(
    withStyles(styles, {withTheme: true})(
        withRouter(connect(mapStateToProps, mapDispatchToProps)(PatientApp))
    )
);
