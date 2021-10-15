import React, {Component} from 'react';
import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Icon,
    IconButton,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

const newVitalState = {
    name: ''
};

class VitalDialog extends Component {
    state = {...newVitalState};

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (
            !prevProps.VitalDialog.props.open &&
            this.props.VitalDialog.props.open
        ) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (
                this.props.VitalDialog.type === 'edit' &&
                this.props.VitalDialog.data &&
                !_.isEqual(this.props.VitalDialog.data, prevState)
            ) {
                this.setState({...this.props.VitalDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (
                this.props.VitalDialog.type === 'new' &&
                !_.isEqual(newVitalState, prevState)
            ) {
                this.setState({...newVitalState});
            }
        }
    }

    handleChange = event => {
        this.setState(
            _.set(
                {...this.state},
                event.target.name,
                event.target.type === 'checkbox'
                    ? event.target.checked
                    : event.target.value
            )
        );
    };

    closeComposeDialog = () => {
        this.props.VitalDialog.type === 'edit'
            ? this.props.closeEditVitalDialog()
            : this.props.closeNewVitalDialog();
    };

    canBeSubmitted() {
        const {name} = this.state;
        return name.length > 0;
    }

    render() {
        const {
            VitalDialog,
            // addVital,
            updateVital,
            removeVital
        } = this.props;

        return (
            <Dialog
                classes={{
                    paper: 'm-24'
                }}
                {...VitalDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {VitalDialog.type === 'new' ? 'New Vital' : 'Edit Vital'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {/* <Avatar
              className="w-96 h-96"
              alt="vital avatar"
              src={this.state.avatar}
            /> */}
                        {VitalDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.name}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: 'p-24'}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Time"
                            autoFocus
                            id="created_time"
                            name="created_time"
                            value={this.state.created_time}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>
                </DialogContent>

                {VitalDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                // addVital(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                updateVital(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            hidden={localStorage.getItem('Role') !== 'superAdmin'}
                            disabled={localStorage.getItem('Role') !== 'superAdmin'}
                            onClick={() => {
                                if (window.confirm('Are you sure to delete ' + this.state.name + ' vital?')) {
                                    removeVital(this.state.id);
                                    this.closeComposeDialog();
                                }
                            }}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            // closeEditVitalDialog: Actions.closeEditVitalDialog,
            // closeNewVitalDialog: Actions.closeNewVitalDialog,
            // addVital: Actions.addVital,
            // updateVital: Actions.updateVital,
            // removeVital: Actions.removeVital
        },
        dispatch
    );
}

function mapStateToProps({VitalsApp}) {
    return {
        VitalDialog: VitalsApp.vitalAppReducer.VitalDialog
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VitalDialog);
