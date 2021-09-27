
import React, { Component } from "react";
import { Avatar, Icon, IconButton } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import ReactTable from "react-table";
import * as Actions from "./store/actions";

class CareTakerDataList extends Component {

    render() {
        const { careTakers, removeCareTaker, openEditCareTakerDialog } = this.props;

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight border-0"
                    getTrProps={(state, rowInfo) => {
                        return {
                            className: "cursor-pointer",
                            onClick: () => {
                                if (rowInfo) {
                                    openEditCareTakerDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={careTakers}
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
                            Header: "Patient",
                            accessor: "patient_name",
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
                                                        " CareTaker?"
                                                )
                                            ) {
                                                ev.stopPropagation();
                                                removeCareTaker(
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
            openEditCareTakerDialog: Actions.openEditCareTakerDialog,
            removeCareTaker: Actions.removeCareTaker
        },
        dispatch
    );
}

function mapStateToProps({ CareTakerApp }) {
    return {
        careTakers: CareTakerApp.CareTakerAppReducer.entities
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CareTakerDataList)
);
