/** @format */

import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {FuseAnimate, FusePageSimple} from "@fuse";
import {Fab, Icon} from "@material-ui/core";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import withReducer from "app/store/withReducer";
import CareTakerDataList from "./CareTakerDataList";
import CareTakerHeader from "./CareTakerHeader";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import "./style.css";
import CareTakerDialog from "./CareTakerDialog";

const styles = (theme) => ({
    addButton: {
        position: "fixed",
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class CareTakerApp extends Component {
    componentDidMount() {
        this.props.getAllCareTakers();
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <FusePageSimple
                    header={
                        <CareTakerHeader pageLayout={() => this.pageLayout}/>
                    }
                    content={<CareTakerDataList/>}
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
                        onClick={this.props.openNewCareTakerDialog}
                    >
                        <Icon>add_person</Icon>
                    </Fab>
                </FuseAnimate>
                <CareTakerDialog/>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getAllCareTakers: Actions.getAllCareTakers,
            openNewCareTakerDialog: Actions.openNewCareTakerDialog
        },
        dispatch
    );
}

function mapStateToProps() {
    return {};
}

export default withReducer(
    "CareTakerApp",
    reducer
)(
    withStyles(styles, {withTheme: true})(
        withRouter(connect(mapStateToProps, mapDispatchToProps)(CareTakerApp))
    )
);
