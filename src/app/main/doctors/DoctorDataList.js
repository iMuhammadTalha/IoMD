
import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import ReactTable from "react-table";
import * as Actions from "./store/actions";

class DoctorDataList extends Component {

    render() {
        const { doctors, openEditDoctorDialog } = this.props;

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight border-0"
                    getTrProps={(state, rowInfo) => {
                        return {
                            className: "cursor-pointer",
                            onClick: () => {
                                if (rowInfo) {
                                    openEditDoctorDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={doctors}
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
                            Header: "Specialization",
                            accessor: "specialization",
                            filterable: true,
                            className: "justify-center"
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
            openEditDoctorDialog: Actions.openEditDoctorDialog,
            removeDoctor: Actions.removeDoctor
        },
        dispatch
    );
}

function mapStateToProps({ DoctorApp }) {
    return {
        doctors: DoctorApp.DoctorAppReducer.entities
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(DoctorDataList)
);
