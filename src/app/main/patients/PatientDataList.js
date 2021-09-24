
import React, { Component } from "react";
import { Avatar, Icon, IconButton } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import ReactTable from "react-table";
import * as Actions from "./store/actions";

class PatientDataList extends Component {

    render() {
        const { patients, removePatient, openEditPatientDialog } = this.props;

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight border-0"
                    getTrProps={(state, rowInfo) => {
                        return {
                            className: "cursor-pointer",
                            onClick: () => {
                                if (rowInfo) {
                                    openEditPatientDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={patients}
                    columns={[
                        {
                            accessor: "profile_pic",
                            Cell: (row) => (
                                <Avatar
                                    className="mr-8"
                                    alt={row.original.name}
                                    src="https://wowsciencecamp.org/wp-content/uploads/2018/07/dummy-user-img-1.png"
                                />
                            ),
                            className: "justify-center",
                            width: 64,
                            sortable: false
                        },

                        {
                            Header: "Name",
                            accessor: "name",
                            filterable: true,
                            className: "font-bold justify-center"
                        },

                        {
                            Header: "Contact No",
                            accessor: "contact_no",
                            filterable: true,
                            className: "justify-center"
                        },
                        {
                            Header: "Email",
                            accessor: "email",
                            filterable: true,
                            className: "justify-center"
                        },
                        {
                            Header: "height",
                            accessor: "height",
                            className: "justify-center"
                        },
                        {
                            Header: "weight",
                            accessor: "weight",
                            className: "justify-center"
                        },
                        {
                            Header: "",
                            width: 128,
                            Cell: (row) => (
                                <div className="flex items-center justify-center">
                                    <IconButton
                                        onClick={(ev) => {
                                            if (
                                                window.confirm(
                                                    "Are you sure to delete " +
                                                        row.original
                                                            .name +
                                                        " Patient?"
                                                )
                                            ) {
                                                ev.stopPropagation();
                                                removePatient(
                                                    row.original.id
                                                );
                                            }
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={20}
                    resizable={false}
                    noDataText="no record available yet"
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pageSizeOptions={[20, 25, 50, 100]}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            openEditPatientDialog: Actions.openEditPatientDialog,
            removePatient: Actions.removePatient
        },
        dispatch
    );
}

function mapStateToProps({ PatientApp }) {
    return {
        patients: PatientApp.PatientAppReducer.entities
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PatientDataList)
);
