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

const gender = [
    {
        value: "male",
        label: "Male"
    },
    {
        value: "female",
        label: "Female"
    }
];

const cities = [
    {
        value: "islamabad",
        label: "Islamabad"
    },
    {
        value: "rawalpindi",
        label: "Rawalpindi"
    },
    {
        value: "lahore",
        label: "Lahore"
    },
    {
        value: "karachi",
        label: "Karachi"
    }
];

const newPatientState = {
    name: "",
    gender: "",
    contact_no: "",
    email: "",
    date_of_birth: "",
    doctor_id: 0,
    address: "",
    city: "",
    height: 0,
    weight: 0,
    password: ""
};

class PatientDialog extends Component {
    state = { ...newPatientState };

    canBeSubmitted() {
        const { name, gender, contact_no, email, date_of_birth, address, city, height, weight, password, doctor_id } = this.state;

        if (name !== "" && gender !== "" && contact_no !== "" && email !== "" && date_of_birth !== "" && address !== "" && city !== "" && height !== "" && weight !== "" && password !== "" && doctor_id !==0) {
            return true;
        }
    }

    componentDidMount() {
        this.props.getAllDoctors();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (
            !prevProps.patientDialog.props.open &&
            this.props.patientDialog.props.open
        ) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (
                this.props.patientDialog.type === "edit" &&
                this.props.patientDialog.data &&
                !_.isEqual(this.props.patientDialog.data, prevState)
            ) {
                this.setState({ ...this.props.patientDialog.data });
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (
                this.props.patientDialog.type === "new" &&
                !_.isEqual(newPatientState, prevState)
            ) {
                this.setState({ ...newPatientState });
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
        this.props.patientDialog.type === "edit"
            ? this.props.closeEditPatientDialog()
            : this.props.closeNewPatientDialog();
    };

    render() {
        const { services } = this.props;
        const { patientDialog, addNewPatient, updatePatients } = this.props;
        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...patientDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="md"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {patientDialog.type === "new"
                                ? "Add New Patient "
                                : "Edit Patient"}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {patientDialog.type === "edit" && (
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
                            label="Doctor"
                            id="doctor_id"
                            name="doctor_id"
                            select
                            value={this.state.doctor_id}
                            onChange={this.handleChange}
                            margin="normal"
                            fullWidth
                            variant="outlined"
                        >
                            {this.props.doctors.map((op) => (
                                <option key={op.id} value={op.id}>
                                    {op.name}
                                </option>
                            ))}
                        </TextField>
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">person</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Gender"
                            id="gender"
                            name="gender"
                            select
                            value={this.state.gender}
                            onChange={this.handleChange}
                            margin="normal"
                            fullWidth
                            variant="outlined"
                        >
                            {gender.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
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

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">person</Icon>
                        </div>
                        <TextField
                            type="date"
                            className="mb-24"
                            label="Date of Birth"
                            id="date_of_birth"
                            name="date_of_birth"
                            value={this.state.date_of_birth}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </div>

                    

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">home</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Address"
                            id="address"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>

                    {/* <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">local_offer </Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="City"
                            id="city"
                            name="city"
                            value={this.state.city}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div> */}

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">home</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="City"
                            id="city"
                            name="city"
                            select
                            value={this.state.city}
                            onChange={this.handleChange}
                            margin="normal"
                            fullWidth
                            variant="outlined"
                        >
                            {cities.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">local_offer </Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Weight"
                            id="weight"
                            name="weight"
                            value={this.state.weight}
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
                            label="Height"
                            id="height"
                            name="height"
                            value={this.state.height}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>

                    {patientDialog.type === "new" ? (
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

                {patientDialog.type === "new" ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addNewPatient(this.state);
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
                                updatePatients(this.state);
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
            closeEditPatientDialog: Actions.closeEditPatientDialog,
            closeNewPatientDialog: Actions.closeNewPatientDialog,
            addNewPatient: Actions.addNewPatient,
            updatePatients: Actions.updatePatients,
            removePatient: Actions.removePatient,
            getAllDoctors: Actions.getAllDoctors
        },
        dispatch
    );
}

function mapStateToProps({ PatientApp }) {
    return {
        patientDialog: PatientApp.PatientAppReducer.patientDialog,
        doctors: PatientApp.PatientAppReducer.doctors,
        // services: PatientApp.PatientAppReducer.services
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDialog);
