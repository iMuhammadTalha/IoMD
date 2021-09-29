import React, {Component} from 'react';
import {
    Avatar,
    Icon,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    Typography
} from '@material-ui/core';
import {FuseAnimate, FuseUtils} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from 'react-table';
import * as Actions from './store/actions';
import moment from "moment";

class VitalsList extends Component {
    state = {
        selectedVitalsMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedVitalMenu = event => {
        this.setState({selectedVitalsMenu: event.currentTarget});
    };

    closeSelectedVitalsMenu = () => {
        this.setState({selectedVitalsMenu: null});
    };

    render() {
        const {
            vitals,
            searchText,
            selectedVitalIds,

            openEditVitalDialog,
            removeVitals,
            removeVital,
            setVitalsUnstarred,
            setVitalsStarred,
            getVitalsPaginationData,
            totalPages,
        } = this.props;
        const data = this.getFilteredArray(vitals, searchText);
        const {selectedVitalsMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no vital!
                    </Typography>
                </div>
            );
        }

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight border-0"
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: 'cursor-pointer',
                            onClick: (e, handleOriginal) => {
                                if (rowInfo) {
                                    // openEditVitalDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[

                        // {
                        //     Header: () =>
                        //         selectedVitalIds.length > 0 && (
                        //             <React.Fragment>
                        //                 <IconButton
                        //                     aria-owns={
                        //                         selectedVitalsMenu ? 'selectedVitalsMenu' : null
                        //                     }
                        //                     aria-haspopup="true"
                        //                     onClick={this.openSelectedVitalMenu}
                        //                 >
                        //                     <Icon>more_horiz</Icon>
                        //                 </IconButton>
                        //                 <Menu
                        //                     id="selectedVitalsMenu"
                        //                     anchorEl={selectedVitalsMenu}
                        //                     open={Boolean(selectedVitalsMenu)}
                        //                     onClose={this.closeSelectedVitalsMenu}
                        //                 >
                        //                     <MenuList>
                        //                         <MenuItem
                        //                             onClick={() => {
                        //                                 removeVitals(selectedVitalIds);
                        //                                 this.closeSelectedVitalsMenu();
                        //                             }}
                        //                         >
                        //                             <ListItemIcon>
                        //                                 <Icon>delete</Icon>
                        //                             </ListItemIcon>
                        //                             <ListItemText inset primary="Remove"/>
                        //                         </MenuItem>
                        //                         <MenuItem
                        //                             onClick={() => {
                        //                                 setVitalsStarred(selectedVitalIds);
                        //                                 this.closeSelectedVitalsMenu();
                        //                             }}
                        //                         >
                        //                             <ListItemIcon>
                        //                                 <Icon>star</Icon>
                        //                             </ListItemIcon>
                        //                             <ListItemText inset primary="Starred"/>
                        //                         </MenuItem>
                        //                         <MenuItem
                        //                             onClick={() => {
                        //                                 setVitalsUnstarred(selectedVitalIds);
                        //                                 this.closeSelectedVitalsMenu();
                        //                             }}
                        //                         >
                        //                             <ListItemIcon>
                        //                                 <Icon>star_border</Icon>
                        //                             </ListItemIcon>
                        //                             <ListItemText inset primary="Unstarred"/>
                        //                         </MenuItem>
                        //                     </MenuList>
                        //                 </Menu>
                        //             </React.Fragment>
                        //         ),
                        //     accessor: 'avatar',
                        //     Cell: row => (
                        //         <Avatar
                        //             className="mr-8"
                        //             alt={row.original.name}
                        //             src={row.value}
                        //         />
                        //     ),
                        //     className: 'justify-center',
                        //     width: 64,
                        //     sortable: false
                        // },
                        // {
                        //     Header: 'ID',
                        //     accessor: 'id',
                        //     filterable: false,
                        //     className: 'justify-center font-bold'
                        // },
                        {
                            Header: 'Time',
                            accessor: 'created_time',
                            id: 'created_time',
                            width: 150,
                            // accessor: d => {
                            //     return moment(d.created_time)
                            //         // .local()
                            //         .format("DD-MM-YYYY hh:mm:ss")
                            // },
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'Heart Rate',
                            accessor: 'heart_rate',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'Body Temperature',
                            accessor: 'body_temperature',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'ECG',
                            accessor: 'ecg',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'PPG',
                            accessor: 'ppg',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'SBP',
                            accessor: 'sbp',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'DBP',
                            accessor: 'dbp',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'SPO2',
                            accessor: 'spo2',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'Respiration Rate',
                            accessor: 'respiration_rate',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'Patient',
                            accessor: 'patient_name',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        // {
                        //     Header: '',
                        //     width: 128,
                        //     Cell: row => (
                        //         <div className="flex items-center justify-center">
                        //             <IconButton
                        //                 hidden={localStorage.getItem('Role') !== 'superAdmin'}
                        //                 disabled={localStorage.getItem('Role') !== 'superAdmin'}
                        //                 onClick={ev => {
                        //                     if (window.confirm('Are you sure to delete ' + row.original.name + ' vital?')) {
                        //                         ev.stopPropagation();
                        //                         removeVital(row.original.id);
                        //                     }
                        //                 }}
                        //             >
                        //                 <Icon>delete</Icon>
                        //             </IconButton>
                        //         </div>
                        //     )
                        // }
                    ]}
                    defaultPageSize={20}
                    resizable={true}
                    noDataText="No Medical Vital found"
                    loading={this.state.loading}
                    showPagination={true}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    pages={totalPages}
                    pageSizeOptions={[20, 25, 50, 100]}
                    pageSize={this.state.pageSize}
                    page={this.state.page}
                    sorted={this.state.sorted}
                    onPageChange={(page) => this.setState({ page: page })}
                    onPageSizeChange={(pageSize, page) => {
                        this.setState({ pageSize: pageSize, page: page });
                    }}
                    onSortedChange={(val) => {
                        this.setState({ sorted: val });
                    }}
                    manual  // this would indicate that server side pagination has been enabled
                    onFetchData={(state, instance) => {
                        // this.setState({loading: true});
                        getVitalsPaginationData(state.page, state.pageSize, state.sorted, state.filtered);
                        // this.setState({loading: false});
                    }}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getVitals: Actions.getVitals,
            toggleInSelectedVitals: Actions.toggleInSelectedVitals,
            selectAllVitals: Actions.selectAllVitals,
            // deSelectAllVitals: Actions.deSelectAllVitals,
            // openEditVitalDialog: Actions.openEditVitalDialog,
            removeVitals: Actions.removeVitals,
            removeVital: Actions.removeVital,
            toggleStarredVital: Actions.toggleStarredVital,
            toggleStarredVitals: Actions.toggleStarredVitals,
            setVitalsStarred: Actions.setVitalsStarred,
            getVitalsPaginationData: Actions.getVitalsPaginationData,
            setVitalsUnstarred: Actions.setVitalsUnstarred
        },
        dispatch
    );
}

function mapStateToProps({VitalsApp}) {
    return {
        vitals: VitalsApp.vitalAppReducer.entities,
        totalPages: VitalsApp.vitalAppReducer.pages,
        selectedVitalIds: VitalsApp.vitalAppReducer.selectedVitalIds,
        searchText: VitalsApp.vitalAppReducer.searchText,
        user: VitalsApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(VitalsList)
);
