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


const newDoctorState = {
    name: "",
    pmdc_no: "",
    contact_no: "",
    email: "",
    specialization: "",
    password: ""
};

class DoctorDialog extends Component {
    state = { ...newDoctorState };

    canBeSubmitted() {
        const { name, pmdc_no, contact_no, email, specialization, password } = this.state;

        if (name !== "" && pmdc_no !== "" && contact_no !== "" && email !== "" && specialization !== "" && password !== "") {
            return true;
        }
    }

    componentDidMount() {
        // this.props.getAllServices();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (
            !prevProps.doctorDialog.props.open &&
            this.props.doctorDialog.props.open
        ) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (
                this.props.doctorDialog.type === "edit" &&
                this.props.doctorDialog.data &&
                !_.isEqual(this.props.doctorDialog.data, prevState)
            ) {
                this.setState({ ...this.props.doctorDialog.data });
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (
                this.props.doctorDialog.type === "new" &&
                !_.isEqual(newDoctorState, prevState)
            ) {
                this.setState({ ...newDoctorState });
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
        this.props.doctorDialog.type === "edit"
            ? this.props.closeEditDoctorDialog()
            : this.props.closeNewDoctorDialog();
    };

    render() {
        const { services } = this.props;
        const { doctorDialog, addNewDoctor, updateDoctors } = this.props;
        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...doctorDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {doctorDialog.type === "new"
                                ? "Add New Doctor "
                                : "Edit Doctor"}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {doctorDialog.type === "edit" && (
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
                            label="PMDC No"
                            id="pmdc"
                            name="pmdc_no"
                            value={this.state.pmdc_no}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
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
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">local_offer </Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Specialization"
                            id="specialization"
                            name="specialization"
                            value={this.state.specialization}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>

                    {doctorDialog.type === "new" ? (
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">local_offer </Icon>
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

                {doctorDialog.type === "new" ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addNewDoctor(this.state);
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
                                updateDoctors(this.state);
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
            closeEditDoctorDialog: Actions.closeEditDoctorDialog,
            closeNewDoctorDialog: Actions.closeNewDoctorDialog,
            addNewDoctor: Actions.addNewDoctor,
            updateDoctors: Actions.updateDoctors,
            removeDoctor: Actions.removeDoctor,
            getAllDoctors: Actions.getAllDoctors
        },
        dispatch
    );
}

function mapStateToProps({ DoctorApp }) {
    return {
        doctorDialog: DoctorApp.DoctorAppReducer.doctorDialog,
        // services: DoctorApp.DoctorAppReducer.services
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDialog);
