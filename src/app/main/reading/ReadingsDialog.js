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

const newReadingState = {
    name: ''
};

class ReadingDialog extends Component {
    state = {...newReadingState};

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (
            !prevProps.readingDialog.props.open &&
            this.props.readingDialog.props.open
        ) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (
                this.props.readingDialog.type === 'edit' &&
                this.props.readingDialog.data &&
                !_.isEqual(this.props.readingDialog.data, prevState)
            ) {
                this.setState({...this.props.readingDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (
                this.props.readingDialog.type === 'new' &&
                !_.isEqual(newReadingState, prevState)
            ) {
                this.setState({...newReadingState});
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
        this.props.readingDialog.type === 'edit'
            ? this.props.closeEditReadingDialog()
            : this.props.closeNewReadingDialog();
    };

    canBeSubmitted() {
        const {name} = this.state;
        return name.length > 0;
    }

    render() {
        const {
            readingDialog,
            // addReading,
            updateReading,
            removeReading
        } = this.props;

        return (
            <Dialog
                classes={{
                    paper: 'm-24'
                }}
                {...readingDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {readingDialog.type === 'new' ? 'New Reading' : 'Edit Reading'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {/* <Avatar
              className="w-96 h-96"
              alt="reading avatar"
              src={this.state.avatar}
            /> */}
                        {readingDialog.type === 'edit' && (
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

                {readingDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                // addReading(this.state);
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
                                updateReading(this.state);
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
                                if (window.confirm('Are you sure to delete ' + this.state.name + ' reading?')) {
                                    removeReading(this.state.id);
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
            // closeEditReadingDialog: Actions.closeEditReadingDialog,
            // closeNewReadingDialog: Actions.closeNewReadingDialog,
            // addReading: Actions.addReading,
            // updateReading: Actions.updateReading,
            // removeReading: Actions.removeReading
        },
        dispatch
    );
}

function mapStateToProps({readingsApp}) {
    return {
        readingDialog: readingsApp.readings.readingDialog
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReadingDialog);
