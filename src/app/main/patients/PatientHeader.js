/** @format */

import React, { Component } from "react";
import { Button, Icon, MuiThemeProvider, Typography } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import CsvDownloader from "react-csv-downloader";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "@lodash";

class PatientHeader extends Component {

    render() {
        const { patients, mainTheme } = this.props;
        const datas = patients;
        const columns = [
            {
                Header: "Patient Type",
                accessor: "type",
                filterable: true,
                className: "font-bold"
            },

            {
                Header: "Service Type",
                accessor: "service_name",
                filterable: true,
                className: "font-bold"
            },
            {
                Header: "Model",
                accessor: "model",
                filterable: true,
                className: "font-bold"
            },
            {
                Header: "Color",
                accessor: "color",
                filterable: true,
                className: "font-bold"
            }
        ];

        return (
            <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
                <div className="flex flex-shrink items-center sm:w-224">
                    <div className="flex items-center">
                        <FuseAnimate
                            animation="transition.expandIn"
                            delay={300}
                        >
                            <Icon className="text-32 mr-12">
                            user
                            </Icon>
                        </FuseAnimate>
                        <FuseAnimate
                            animation="transition.slideLeftIn"
                            delay={300}
                        >
                            <Typography variant="h6" className="hidden sm:flex">
                                Patients
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>

                {datas && datas.length > 0 ? (
                    <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
                        <MuiThemeProvider theme={mainTheme}>
                            <FuseAnimate
                                animation="transition.slideLeftIn"
                                delay={300}
                            >
                                <CsvDownloader
                                    columns={columns}
                                    datas={datas}
                                    filename="patient"
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
                { ...this.state },
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
        {},
        dispatch
    );
}

function mapStateToProps({ PatientApp, fuse }) {
    // console.log(PatientApp)
    return {
        patients: PatientApp.PatientAppReducer.entities,
        mainTheme: fuse.settings.mainTheme
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientHeader);
