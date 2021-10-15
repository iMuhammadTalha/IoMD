/** @format */

import React, { Component } from "react";
import { Button, Icon, Paper, MuiThemeProvider, Typography } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import CsvDownloader from "react-csv-downloader";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "./store/actions";
import _ from "@lodash";

class GraphHeader extends Component {
    state = {
        patient_id: "",
        graph_type: "",
        role: localStorage.getItem('role')
    };
    render() {
        const { graphs, mainTheme, searchReading } = this.props;

        return (
            <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
                <div className="flex flex-shrink items-center sm:w-224">
                    <div className="flex items-center">
                        <FuseAnimate
                            animation="transition.expandIn"
                            delay={300}
                        >
                            <Icon className="text-32 mr-12">charts</Icon>
                        </FuseAnimate>
                        <FuseAnimate
                            animation="transition.slideLeftIn"
                            delay={300}
                        >
                            <Typography variant="h6" className="hidden sm:flex">
                                Graph
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
                                        {this.props.patients ? (                                                                                                                    
                                        <select
                                            style={{width: "100%"}}
                                            onChange={this.handleChange}
                                            value={this.state.patient_id}
                                            id="patient_id"
                                            name="patient_id"
                                        >
                                            
                                            {this.props.patients.map((op) => (
                                                    <option key={op.id} value={op.id}>
                                                        {op.name}
                                                    </option>
                                                ))}
                                        </select>
                                    ):( null )}

                                            
                                    </Paper>
                                </FuseAnimate>
                            </MuiThemeProvider>
                        </div>

                        <div className="d-flex flex-column flex-1 items-center justify-center pr-6 sm:px-4">
                            <label>Select Time</label>
                            <MuiThemeProvider theme={mainTheme}>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Paper
                                        className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                                        elevation={1}
                                    >
                                        {this.props.patients ? (                                                                                                                    
                                        <select
                                            style={{width: "100%"}}
                                            onChange={this.handleChange}
                                            value={this.state.graph_type}
                                            id="graph_type"
                                            name="graph_type"
                                        >
                                            
                                            <option key='daily' value='daily'>
                                                Daily
                                                </option>

                                                <option key='weekly' value='weekly'>
                                                Weekly
                                                </option>

                                        </select>
                                    ):( null )}

                                            
                                    </Paper>
                                </FuseAnimate>
                            </MuiThemeProvider>
                        </div>

                    </div>
                    <div className="flex flex-1 items-center float-right justify-center pr-8 sm:px-12">
                        {/* <Button
                            style={{marginTop: 5}}
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                searchReading(this.state);
                            }}
                        >
                            Apply
                        </Button> */}
                    </div>
                </div>


                    <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
                        <Button
                            style={{marginTop: 5}}
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                searchReading(this.state);
                            }}
                        >
                            Apply
                        </Button>
                    </div>
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
            getAllPatients: Actions.getAllPatients,
            searchReading: Actions.searchReading
        },
        dispatch
    );
}

function mapStateToProps({ GraphApp, fuse }) {
    return {
        graphs: GraphApp.GraphReducer.entities,
        patients: GraphApp.GraphReducer.patients,
        selected_patient_id: GraphApp.GraphReducer.selected_patient_id,
        selected_graph_type: GraphApp.GraphReducer.selected_graph_type,
        mainTheme: fuse.settings.mainTheme
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphHeader);
