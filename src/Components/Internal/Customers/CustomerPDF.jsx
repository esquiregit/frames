import React from 'react';
import moment from "moment";
import { getBaseURL } from '../../Extras/server';
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff"
    },
    container: {
        display: "flex",
        flexDirection: "row",
        marginTop: '50px',
        padding: 15
    },
    two_column: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
        borderBottom: '1px solid #666',
        paddingTop: '5px',
        paddingBottom: '6px',
    },
    two_column_left: {
        textAlign: 'left',
        fontSize: 11,
    },
    two_column_right: {
        textAlign: 'right',
        fontSize: 11,
        marginRight: 65,
    },
    info_two_column: {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid #333',
        paddingBottom: 0,
        borderBottom: 'transparent',
    },
    info_two_column_last: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 0,
        border: '1px solid #333',
    },
    info_one_column_left: {
        textAlign: 'right',
        fontSize: 11,
        padding: 10,
        flex: '1 1 20%',
        marginRight: 10,
        color: '#555',
    },
    info_one_column_right: {
        textAlign: 'left',
        fontSize: 11,
        padding: 10,
        paddingLeft: 0,
        flex: '1 2 80%',
    },
    info_two_column_left: {
        textAlign: 'right',
        fontSize: 11,
        padding: 10,
        flex: '1 1 20%',
        marginRight: 30,
        color: '#555',
    },
    info_two_column_right: {
        textAlign: 'left',
        fontSize: 11,
        marginRight: 95,
        padding: 10,
        flex: '1 2 30%',
    },
    info_two_column_right_wide: {
        textAlign: 'left',
        fontSize: 11,
        marginLeft: -20,
        marginRight: 95,
        padding: 10,
        flex: '1 2 80%',
    },
    addressHeader: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'extrabold',
        paddingBottom: 6,
        marginTop: 50,
    },
    addressSubHeader: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'semibold',
        paddingBottom: 6,
    },
    addressParagraph: {
        textAlign: 'center',
        fontSize: 12,
        paddingBottom: 6,
    },
    addressParagraphLast: {
        textAlign: 'center',
        fontSize: 12,
        paddingBottom: 6,
        marginBottom: 15,
    }
});

function CustomerPDF({ customer }) {
    return (
        <Document>
            <Page style={styles.page} size="A4" wrap>
                <View style={styles.container}>
                    <View>
                        <View style={styles.two_column}>
                            <Text style={styles.two_column_left}>Customer Info</Text>
                            <Text style={styles.two_column_right}>{moment().format('dddd Do MMMM YYYY [at] HH:mm:ss')}</Text>
                        </View>
                        <View style={[styles.info_two_column, { backgroundColor: '#eee'}]}>
                            <Text style={styles.info_one_column_left}>Customer ID:</Text>
                            <Text style={styles.info_one_column_right}>{customer.customer_id}</Text>
                        </View>
                        <View style={[styles.info_two_column]}>
                            <Text style={styles.info_one_column_left}>Customer:</Text>
                            <Text style={styles.info_one_column_right}>{customer.name}</Text>
                        </View>
                        <View style={[styles.info_two_column, { backgroundColor: '#eee'}]}>
                            <Text style={styles.info_two_column_left}>Email Address:</Text>
                            <Text style={styles.info_two_column_right}>{customer.email_address}</Text>
                            <Text style={styles.info_two_column_left}>Phone Numbers:</Text>
                            <Text style={styles.info_two_column_right}>{customer.phone_numbers}</Text>
                        </View>
                        <View style={[styles.info_two_column]}>
                            <Text style={styles.info_two_column_left}>Address:</Text>
                            <Text style={styles.info_two_column_right}>{customer.address}</Text>
                            <Text style={styles.info_two_column_left}>District:</Text>
                            <Text style={styles.info_two_column_right}>{customer.district}</Text>
                        </View>
                        <View style={[styles.info_two_column, { backgroundColor: '#eee'}]}>
                            <Text style={styles.info_two_column_left}>City:</Text>
                            <Text style={styles.info_two_column_right}>{customer.city}</Text>
                            <Text style={styles.info_two_column_left}>Region:</Text>
                            <Text style={styles.info_two_column_right}>{customer.region}</Text>
                        </View>
                        <View style={[styles.info_two_column_last]}>
                            <Text style={styles.info_two_column_left}>Date Created:</Text>
                            <Text style={styles.info_two_column_right_wide}>{customer.created_on}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default CustomerPDF;
