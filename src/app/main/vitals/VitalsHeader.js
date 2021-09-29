import React, {Component} from 'react';
import {Button, Icon, Input, MuiThemeProvider, Paper, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import CsvDownloader from "react-csv-downloader";
import _ from "@lodash";


class VitalsHeader extends Component {
    state = {
        patient_id: ""
        
    };
    render() {
        const {vitals, setSearchText, searchText, searchVital, mainTheme} = this.props;
        // this.state.patient_id=this.props.selected_patient_id;
        return (
            <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
                <div className="flex flex-shrink items-center sm:w-224">
                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">account_box</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">
                                Medical Vitals
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>

                <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
                    <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
                        
                        <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
                            <label>Select Patient</label>
                            <MuiThemeProvider theme={mainTheme}>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Paper
                                        className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                                        elevation={1}
                                    >
                                        <select
                                            style={{width: "100%"}}
                                            onChange={this.handleChange}
                                            value={this.state.patient_id}
                                            id="patient_id"
                                            name="patient_id"
                                        >
                                            <option value="">All</option>
                                            {this.props.patients.map((op) => (
                                                <option key={op.id} value={op.id}>
                                                    {op.name}
                                                </option>
                                            ))}
                                        </select>
                                    </Paper>
                                </FuseAnimate>
                            </MuiThemeProvider>
                        </div>
                    </div>
                    <div className="flex flex-1 items-center float-right justify-center pr-8 sm:px-12">
                        <Button
                            style={{marginTop: 5}}
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                searchVital(this.state);
                            }}
                        >
                            Apply
                        </Button>
                    </div>
                </div>
                {vitals && vitals.length > 0 ? (
                    <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
                        <MuiThemeProvider theme={mainTheme}>
                            <FuseAnimate
                                animation="transition.slideLeftIn"
                                delay={300}
                            >
                                <CsvDownloader
                                    datas={vitals}
                                    filename="vitals"
                                >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Export to CSV
                                    </Button>
                                </CsvDownloader>
                            </FuseAnimate>
                        </MuiThemeProvider>
                    </div>
                ) : null}
            </div>
        );
    }
    handleChange = (event) => {
        this.setState(
            _.set(
                {...this.state},
                event.target.name,
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value
            )
        );
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            setSearchText: Actions.setSearchText,
            getAllPatients: Actions.getAllPatients,
            searchVital: Actions.searchVital

        },
        dispatch
    );
}

function mapStateToProps({VitalsApp, fuse}) {
    
    // console.log(VitalsApp.vitalAppReducer.selected_patient_id);
    // if(VitalsApp.vitalAppReducer.selected_patient_id>0){
    //     console.log('Patient ID', VitalsApp.vitalAppReducer.selected_patient_id);
    //     console.log('STATE Patient ID', this.state);
    // }

    return {
        searchText: VitalsApp.vitalAppReducer.searchText,
        vitals: VitalsApp.vitalAppReducer,
        patients: VitalsApp.vitalAppReducer.patients,
        selected_patient_id: VitalsApp.vitalAppReducer.selected_patient_id,
        mainTheme: fuse.settings.mainTheme
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VitalsHeader);
