/** @format */

import React, { Component } from "react";
import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Icon,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import { bindActionCreators } from "redux";
import * as Actions from "./store/actions";
import { connect } from "react-redux";
import _ from "@lodash";

const newCareTakerState = {
    name: "",
    contact_no: "",
    email: "",
    patient_id: 0,
    password: ""
};

class CareTakerDialog extends Component {
    state = { ...newCareTakerState };

    canBeSubmitted() {
        const { name, contact_no, email, password, patient_id } = this.state;

        if (name !== "" && contact_no !== "" && email !== "" && password !== "" && patient_id !==0) {
            return true;
        }
    }

    componentDidMount() {
        this.props.getAllPatients();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (
            !prevProps.careTakerDialog.props.open &&
            this.props.careTakerDialog.props.open
        ) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (
                this.props.careTakerDialog.type === "edit" &&
                this.props.careTakerDialog.data &&
                !_.isEqual(this.props.careTakerDialog.data, prevState)
            ) {
                this.setState({ ...this.props.careTakerDialog.data });
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (
                this.props.careTakerDialog.type === "new" &&
                !_.isEqual(newCareTakerState, prevState)
            ) {
                this.setState({ ...newCareTakerState });
            }
        }
    }

    handleChange = (event) => {
        this.setState(
            _.set(
                { ...this.state },
                event.target.name,
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value
            )
        );
    };

    closeComposeDialog = () => {
        this.props.careTakerDialog.type === "edit"
            ? this.props.closeEditCareTakerDialog()
            : this.props.closeNewCareTakerDialog();
    };

    render() {
        const { services } = this.props;
        const { careTakerDialog, addNewCareTaker, updateCareTakers } = this.props;
        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...careTakerDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="md"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {careTakerDialog.type === "new"
                                ? "Add New CareTaker "
                                : "Edit CareTaker"}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {careTakerDialog.type === "edit" && (
                            <Typography
                                variant="h6"
                                color="inherit"
                                className="pt-8"
                            >
                                {this.state.type}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{ root: "p-24" }}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">person</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Name"
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">person</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Patient"
                            id="patient_id"
                            name="patient_id"
                            select
                            value={this.state.patient_id}
                            onChange={this.handleChange}
                            margin="normal"
                            fullWidth
                            variant="outlined"
                        >
                            {this.props.patients.map((op) => (
                                <option key={op.id} value={op.id}>
                                    {op.name}
                                </option>
                            ))}
                        </TextField>
                    </div>

                    

                    <div className="flex">
                        <div className="min-w-48">
                            <Icon color="action">phone </Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Contact No"
                            id="contact"
                            name="contact_no"
                            value={this.state.contact_no}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">email</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Email"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>

                    {careTakerDialog.type === "new" ? (
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">person </Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Password"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>
                    ):( null )}

                </DialogContent>

                {careTakerDialog.type === "new" ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addNewCareTaker(this.state);
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
                                updateCareTakers(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            closeEditCareTakerDialog: Actions.closeEditCareTakerDialog,
            closeNewCareTakerDialog: Actions.closeNewCareTakerDialog,
            addNewCareTaker: Actions.addNewCareTaker,
            updateCareTakers: Actions.updateCareTakers,
            removeCareTaker: Actions.removeCareTaker,
            getAllPatients: Actions.getAllPatients
        },
        dispatch
    );
}

function mapStateToProps({ CareTakerApp }) {
    return {
        careTakerDialog: CareTakerApp.CareTakerAppReducer.careTakerDialog,
        patients: CareTakerApp.CareTakerAppReducer.patients,
        // services: CareTakerApp.CareTakerAppReducer.services
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CareTakerDialog);
