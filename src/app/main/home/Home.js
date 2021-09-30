import React, {Component} from 'react';
import {Card, CardContent, Tab, Tabs, Typography, withStyles} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';
import JWTLoginTab from './tabs/JWTLoginTab';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        background:
            'linear-gradient(to right, ' +
            theme.palette.primary.dark +
            ' 0%, ' +
            darken(theme.palette.primary.dark, 0.5) +
            ' 100%)',
        color: theme.palette.primary.contrastText
    }
});

class Home extends Component {
    state = {
        tabValue: 0
    };

    handleTabChange = (event, value) => {
        this.setState({tabValue: value});
    };

    render() {
        const {classes} = this.props;
        const {tabValue} = this.state;

        return (
            <div
                className={classNames(
                    classes.root,
                    'flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0'
                )}
            >

{/* <div class="flex" id="root">

    <div id="fuse-splash-screen">
        <div class="center">
            <div class="logo">
                <img alt="logo" src="assets/images/logos/fuse.svg" width="128"/>
            </div>


            <div class="spinner-wrapper">
                <div class="spinner">
                    <div class="inner">
                        <div class="gap"></div>
                        <div class="left">
                            <div class="half-circle"></div>
                        </div>
                        <div class="right">
                            <div class="half-circle"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</div> */}

                    <div
                        className="flex flex-col flex-no-grow items-center text-white p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left">
                        <FuseAnimate animation="transition.expandIn">
                            <img
                                className="w-128 mb-32"
                                src="assets/images/logos/fuse.svg"
                                alt="logo"
                            />
                        </FuseAnimate>

                        <FuseAnimate animation="transition.slideUpIn" delay={300}>
                            <Typography variant="h3" color="inherit" className="font-light">
                            Cardiac Health Monitoring!
                            </Typography>
                        </FuseAnimate>

                        <FuseAnimate delay={400}>
                        <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
                        Using IoMD, WBSN, Cloud, Edge Computing, & AI
                        </Typography>
                        </FuseAnimate>
                        

                        {/* <FuseAnimate animation="transition.expandIn">
                            <img
                                className="w-128 mb-32"
                                src="assets/images/logos/fuse.svg"
                                alt="logo"
                            />
                        </FuseAnimate> */}

                    

                        
                            

                    </div>
                
                <FuseAnimate animation={{translateX: [0, '100%']}}>
                    <Card className="w-full max-w-400 mx-auto m-8 md:m-0" square>
                        <CardContent className="flex flex-col items-center justify-center p-32 md:p-48">
                            

                            <div className="flex flex-col items-center justify-center pt-16">
                                <Link to="/admin/login">
                                        <img
                                            className="w-128 mb-32"
                                            src="assets/images/Admin.png"
                                            alt="firebase"
                                        />
                                </Link>

                                <Link className="font-medium" to="/admin/login">
                                Admin Account
                                </Link>
                            </div>

                            <div className="flex flex-col items-center justify-center pt-32">
                                <Link className="font-medium" to="/doctor/login">
                                        <img
                                            className="w-128 mb-32"
                                            src="assets/images/Doctor.png"
                                            alt="firebase"
                                        />
                                </Link>

                                <Link className="font-medium" to="/doctor/login">
                                Doctor Account
                                </Link>
                            </div>

                            <div className="flex flex-col items-center justify-center pt-32">
                                <Link className="font-medium" to="/patient/login">
                                        <img
                                            className="w-128 mb-32"
                                            src="assets/images/Patient.png"
                                            alt="firebase"
                                        />
                                </Link>

                                <Link className="font-medium" to="/patient/login">
                                Patient Account
                                </Link>
                            </div>

                            <div className="flex flex-col items-center justify-center pt-32">
                                <Link className="font-medium" to="/caretaker/login">
                                        <img
                                            className="w-128 mb-32"
                                            src="assets/images/Caretaker.png"
                                            alt="firebase"
                                        />
                                </Link>

                                <Link className="font-medium" to="/caretaker/login">
                                Care Taker Account
                                </Link>
                            </div>

                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(Home));
