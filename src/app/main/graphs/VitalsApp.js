import React, {Component} from 'react';
import {Fab, Icon, withStyles} from '@material-ui/core';
import {FuseAnimate, FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import VitalsList from './VitalsList';
import VitalsHeader from './VitalsHeader';
// import VitalDialog from './VitalsDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import './style.css';
// import { StickyContainer, Sticky } from 'react-sticky';
const styles = theme => ({
    addButton: {
        position: 'fixed',
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class VitalsApp extends Component {
    componentDidMount() {
        this.props.getVitals(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.location, prevProps.location)) {
            this.props.getVitals(this.props.match.params);
        }
    }

    render() {
        const {classes, openNewVitalDialog} = this.props;
        if (!localStorage.getItem('jwtToken')) {
            window.location = '/home';
        }
        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: 'p-16 sm:p-24 pb-80',
                        leftSidebar: 'w-256 border-0',
                        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
                    }}
                    header={<VitalsHeader pageLayout={() => this.pageLayout}/>}
                    content={<VitalsList/>}
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                {/* <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
                        onClick={openNewVitalDialog}
                    >
                        <Icon>add</Icon>
                    </Fab>
                </FuseAnimate> */}
                {/* <VitalDialog/> */}
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getVitals: Actions.getVitals,
            // openNewVitalDialog: Actions.openNewVitalDialog
        },
        dispatch
    );
}

function mapStateToProps({VitalsApp}) {
    return {
        // vitals: VitalsApp.vitalAppReducer.entities,
        selectedVitalIds: VitalsApp.vitalAppReducer.selectedVitalIds,
        searchText: VitalsApp.vitalAppReducer.searchText,
        user: VitalsApp.user
    };
}

export default withReducer('VitalsApp', reducer)(
    withStyles(styles, {withTheme: true})(
        withRouter(
            connect(
                mapStateToProps,
                mapDispatchToProps
            )(VitalsApp)
        )
    )
);
