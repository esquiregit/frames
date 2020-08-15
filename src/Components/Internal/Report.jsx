import React, { useState } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import Loader from '../Extras/Loadrr';
import styles from '../Extras/styles';
import Toastrr from '../Extras/Toastrr';
import Sidebar from './Layout/Sidebar/Sidebar';
import MenuItem from '@material-ui/core/MenuItem';
import Breadcrumb from './Layout/Breadcrumb';
import LoadrrSmall from '../Extras/LoadrrInnerRow';
import MUIDataTable from "mui-datatables";
import { getBaseURL } from '../Extras/server';
import { getMaxDate } from '../Extras/Functions';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { FormikTextField } from 'formik-material-fields';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    patient_id: Yup
        .string(),
    start_date: Yup
        .date(),
        // .required('Please Select Start Date'),
    end_date: Yup
        .date()
        // .required('Please Select End Date'),
});

function Report({ history }) {
    const staff       = useSelector(state => state.authReducer.staff);
    const classes     = styles();
    const visible     = useSelector(state => state.sidebarReducer.visible);
    const permissions = useSelector(state => state.authReducer.permissions);
    let endDateMax    = getMaxDate();
    let endDateMin    = null;
    let startDateMax  = getMaxDate();
    let startDateMin  = null;

    const initialValues = {
        staff      : staff.staff_id,
        patient_id : '',
        start_date : '',
        end_date   : ''
    };

    const [error, setError]         = useState(false);
    const [report, setReport]       = useState([]);
    const [loading, setLoading]     = useState(true);
    const [message, setMessage]     = useState('');
    const [comError, setComError]   = useState(false);
    const [fetching, setFetching]   = useState(false);
    const [searched, setSearched]   = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [discountedCost, setDiscountedCost]   = useState(1000);
    const [patientOptions, setPatientOptions]   = useState([]);
    const [outstandingCost, setOutstandingCost] = useState(1000);

    React.useEffect(() => {
        document.title = 'Report | Liberty Medical Labs';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(staff) {
            if(permissions && permissions.includes("Can Create Reports")) {
                Axios.post(getBaseURL()+'get_dropdown_patients', { signal: signal })
                    .then(response => {
                        setPatientOptions(response.data);
                        setLoading(false);
                    })
                    .catch(error => {
                        setLoading(false);
                        setMessage('Network Error. Server Unreachable....');
                        setComError(true);
                    });
            } else {
                history.push('/unauthorized-access/');
            }
        } else {
            history.push('/');
        }

        return () => abortController.abort();
    }, [staff, permissions, history, loading]);
    
    let rowsPerPage = [];
    const columns   = [
        {
            label: "Patient",
            name: "patient",
            options: {
                filter: true,
            }
        },
        {
            label: "Requests",
            name: "requests",
            options: {
                filter: true,
            }
        },
        {
            label: "Total Cost",
            name: "total_cost",
            options: {
                filter: true,
            }
        },
        {
            label: "Discounted Cost",
            name: "discounted_cost",
            options: {
                filter: true,
            }
        },
        {
            label: "Total Paid",
            name: "amount_paid",
            options: {
                filter: true,
            }
        },
        {
            label: "Payment Type",
            name: "payment_type",
            options: {
                filter: true,
            }
        },
        {
            label: "Date",
            name: "date_added",
            options: {
                filter: true,
            }
        },
        {
            label: "Performed By",
            name: "staff",
            options: {
                filter: true,
            }
        }
    ];
    if (report) {
        if (report.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, report.length];
        }
    } else {
        rowsPerPage = [10, 25, 50, 100];
    }
    const options = {
        filter: true,
        filterType: 'dropdown',
        responsive: 'vertical',
        pagination: true,
        rowsPerPageOptions: rowsPerPage,
        resizableColumns: false,
        expandableRows: false,
        downloadOptions: { filename: 'Report.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Report Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Report",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Report",
            }
        }
    };
    const handleChange = event => {
        setSearched(false);
        const name  = event.target.name;
        const value = event.target.value;

        if(name === 'start_date') {
            endDateMin = value;
        } else if(name === 'end_date') {
            startDateMax = value;
        }
    };
    const onSubmit = values => {
        setFetching(true);
        setError(false);
        setComError(false);
        setSearched(true);

        const abortController = new AbortController();
        const signal          = abortController.signal;

        Axios.post(getBaseURL()+'get_patient_report', values, { signal: signal })
            .then(response => {
                setReport(response.data[0].requests);
                setTotalCost(response.data[0].total_cost);
                setTotalPaid(response.data[0].total_paid);
                setDiscountedCost(response.data[0].discounted_cost);
                let discounted_cost = parseFloat(response.data[0].discounted_cost.replace(',', ''));
                let total_paid      = parseFloat(response.data[0].total_paid.replace(',', ''));
                let outstanding     = discounted_cost - total_paid;
                setOutstandingCost(outstanding.toFixed(2));
                setFetching(false);
            })
            .catch(error => {
                setFetching(false);
                setMessage('Network Error. Server Unreachable....');
                setComError(true);
            });

        return () => abortController.abort();
    };
    
    return (
        <>
            { error    && <Toastrr message={message} type="error" /> }
            { comError && <Toastrr message={message} type="info"  /> }
            <Header staff={staff} />
            <Sidebar roleName={staff && staff.role_name} />
            <main
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Report" />
                {
                    loading ? <Loader /> :
                    <Card variant="outlined" className="p-40">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit} >
                            {() => (
                                <Form className="text-right">
                                    <Grid container spacing={4}>
                                        <Grid className="text-left" item xs={4}>
                                            <FormikTextField
                                                select
                                                onChange={handleChange}
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="patient_id"
                                                label="Patient"
                                                placeholder="Patient"
                                                name="patient_id">
                                                {patientOptions.map((patient, index) => (
                                                    <MenuItem key={index} value={patient.value}>
                                                        {patient.label}
                                                    </MenuItem>
                                                ))}
                                            </FormikTextField>
                                        </Grid>
                                        <Grid className="text-left" item xs={4}>
                                            <FormikTextField
                                                onChange={handleChange}
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="start_date"
                                                label="Start Date"
                                                placeholder="Start Date"
                                                name="start_date"
                                                type="date"
                                                InputProps={{ inputProps: { min: startDateMin, max: startDateMax } }} />
                                        </Grid>
                                        <Grid className="text-left" item xs={4}>
                                            <FormikTextField
                                                onChange={handleChange}
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="end_date"
                                                label="End Date"
                                                placeholder="End Date"
                                                name="end_date"
                                                type="date"
                                                InputProps={{ inputProps: { min: endDateMin, max: endDateMax } }} />
                                        </Grid>
                                        <Grid className="text-centre" item xs={12}>
                                            <Button
                                                className="mr-5"
                                                type="reset"
                                                size="small"
                                                variant="contained"
                                                color="secondary">
                                                Reset
                                            </Button>
                                            <Button
                                                className="ml-5"
                                                size="small"
                                                type="submit"
                                                variant="contained"
                                                color="primary">
                                                View Report
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Card>
                }
                {
                    fetching ? <LoadrrSmall /> :
                    searched &&
                    <div id="report-table">
                        <MUIDataTable
                            className="mt-10"
                            data={report}
                            columns={columns}
                            options={options} />

                        <table id="sum-display">
                            <tbody>
                                <tr>
                                    <th>Total Amount</th>
                                    <td>GHS {totalCost}</td>
                                </tr>
                                <tr>
                                    <th>Discounted Amount</th>
                                    <td>GHS {discountedCost}</td>
                                </tr>
                                <tr>
                                    <th>Total Paid</th>
                                    <td>GHS {totalPaid}</td>
                                </tr>
                                <tr>
                                    <th>Outstanding Amount</th>
                                    <td>GHS {outstandingCost}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
            </main>
            <Footer />
        </>
    );
}

export default Report;
