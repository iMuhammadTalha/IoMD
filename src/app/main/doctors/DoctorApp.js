/** @format */

import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {FuseAnimate, FusePageSimple} from "@fuse";
import {Fab, Icon} from "@material-ui/core";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import withReducer from "app/store/withReducer";
import DoctorDataList from "./DoctorDataList";
import DoctorHeader from "./DoctorHeader";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import "./style.css";
import DoctorDialog from "./DoctorDialog";

const styles = (theme) => ({
    addButton: {
        position: "fixed",
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class DoctorApp extends Component {
    componentDidMount() {
        this.props.getAllDoctors();
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <FusePageSimple
                    header={
                        <DoctorHeader pageLayout={() => this.pageLayout}/>
                    }
                    content={<DoctorDataList/>}
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
                        onClick={this.props.openNewDoctorDialog}
                    >
                        <Icon>add_box</Icon>
                    </Fab>
                </FuseAnimate>
                <DoctorDialog/>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getAllDoctors: Actions.getAllDoctors,
            openNewDoctorDialog: Actions.openNewDoctorDialog
        },
        dispatch
    );
}

function mapStateToProps() {
    return {};
}

export default withReducer(
    "DoctorApp",
    reducer
)(
    withStyles(styles, {withTheme: true})(
        withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorApp))
    )
);
