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

class ReadingsList extends Component {
    state = {
        selectedReadingsMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map(id => entities[id]);
        if (searchText.length === 0) {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedReadingMenu = event => {
        this.setState({selectedReadingsMenu: event.currentTarget});
    };

    closeSelectedReadingsMenu = () => {
        this.setState({selectedReadingsMenu: null});
    };

    render() {
        const {
            readings,
            searchText,
            selectedReadingIds,

            openEditReadingDialog,
            removeReadings,
            removeReading,
            setReadingsUnstarred,
            setReadingsStarred,
            getReadingsPaginationData,
            totalPages,
        } = this.props;
        const data = this.getFilteredArray(readings, searchText);
        const {selectedReadingsMenu} = this.state;

        if (!data && data.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no reading!
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
                                    // openEditReadingDialog(rowInfo.original);
                                }
                            }
                        };
                    }}
                    data={data}
                    columns={[

                        // {
                        //     Header: () =>
                        //         selectedReadingIds.length > 0 && (
                        //             <React.Fragment>
                        //                 <IconButton
                        //                     aria-owns={
                        //                         selectedReadingsMenu ? 'selectedReadingsMenu' : null
                        //                     }
                        //                     aria-haspopup="true"
                        //                     onClick={this.openSelectedReadingMenu}
                        //                 >
                        //                     <Icon>more_horiz</Icon>
                        //                 </IconButton>
                        //                 <Menu
                        //                     id="selectedReadingsMenu"
                        //                     anchorEl={selectedReadingsMenu}
                        //                     open={Boolean(selectedReadingsMenu)}
                        //                     onClose={this.closeSelectedReadingsMenu}
                        //                 >
                        //                     <MenuList>
                        //                         <MenuItem
                        //                             onClick={() => {
                        //                                 removeReadings(selectedReadingIds);
                        //                                 this.closeSelectedReadingsMenu();
                        //                             }}
                        //                         >
                        //                             <ListItemIcon>
                        //                                 <Icon>delete</Icon>
                        //                             </ListItemIcon>
                        //                             <ListItemText inset primary="Remove"/>
                        //                         </MenuItem>
                        //                         <MenuItem
                        //                             onClick={() => {
                        //                                 setReadingsStarred(selectedReadingIds);
                        //                                 this.closeSelectedReadingsMenu();
                        //                             }}
                        //                         >
                        //                             <ListItemIcon>
                        //                                 <Icon>star</Icon>
                        //                             </ListItemIcon>
                        //                             <ListItemText inset primary="Starred"/>
                        //                         </MenuItem>
                        //                         <MenuItem
                        //                             onClick={() => {
                        //                                 setReadingsUnstarred(selectedReadingIds);
                        //                                 this.closeSelectedReadingsMenu();
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
                            Header: 'CH4',
                            accessor: 'ch4',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'CO',
                            accessor: 'co',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'Dust',
                            accessor: 'dust',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'Humidity',
                            accessor: 'humidity',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'NH3',
                            accessor: 'nh3',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'NO2',
                            accessor: 'no2',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'CO2',
                            accessor: 'co2',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'Temperature',
                            accessor: 'temperature',
                            filterable: false,
                            className: 'justify-center font-bold'
                        },
                        {
                            Header: 'Node',
                            accessor: 'node_id',
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
                        //                     if (window.confirm('Are you sure to delete ' + row.original.name + ' reading?')) {
                        //                         ev.stopPropagation();
                        //                         removeReading(row.original.id);
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
                    noDataText="No Air Reading found"
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
                        getReadingsPaginationData(state.page, state.pageSize, state.sorted, state.filtered);
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
            getReadings: Actions.getReadings,
            toggleInSelectedReadings: Actions.toggleInSelectedReadings,
            selectAllReadings: Actions.selectAllReadings,
            // deSelectAllReadings: Actions.deSelectAllReadings,
            openEditReadingDialog: Actions.openEditReadingDialog,
            removeReadings: Actions.removeReadings,
            removeReading: Actions.removeReading,
            toggleStarredReading: Actions.toggleStarredReading,
            toggleStarredReadings: Actions.toggleStarredReadings,
            setReadingsStarred: Actions.setReadingsStarred,
            getReadingsPaginationData: Actions.getReadingsPaginationData,
            setReadingsUnstarred: Actions.setReadingsUnstarred
        },
        dispatch
    );
}

function mapStateToProps({readingsApp}) {
    return {
        readings: readingsApp.readings.entities,
        totalPages: readingsApp.readings.pages,
        selectedReadingIds: readingsApp.readings.selectedReadingIds,
        searchText: readingsApp.readings.searchText,
        user: readingsApp.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ReadingsList)
);
