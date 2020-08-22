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
        padding: 15
    },
    image_div: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 270,
        // borderRadius: 120,
        // border: '2px solid #aaa',
        marginBottom: 10,
    },
    two_column: {
        display: 'flex',
        flexDirection: 'row',
        // marginTop: 10,
        marginBottom: 20,
        // borderTop: '1px solid #666',
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

function ProductPDF({ product }) {
    const image = getBaseURL()+product.image;

    return (
        <Document>
            <Page style={styles.page} size="A4" wrap>
                <View style={styles.container}>
                    <View>
                        <View style={styles.two_column}>
                            <Text style={styles.two_column_left}>Product Info</Text>
                            <Text style={styles.two_column_right}>{moment().format('dddd Do MMMM YYYY [at] HH:mm:ss')}</Text>
                        </View>
                        <View style={styles.image_div}>
                            <Image
                                style={styles.image}
                                src={image}
                                source={image} />
                        </View>
                        <View style={[styles.info_two_column, { backgroundColor: '#eee'}]}>
                            <Text style={styles.info_two_column_left}>Product ID:</Text>
                            <Text style={styles.info_two_column_right}>{product.product_id}</Text>
                            <Text style={styles.info_two_column_left}>Product:</Text>
                            <Text style={styles.info_two_column_right}>{product.name}</Text>
                        </View>
                        <View style={styles.info_two_column}>
                            <Text style={styles.info_two_column_left}>Gender:</Text>
                            <Text style={styles.info_two_column_right}>{product.gender}</Text>
                            <Text style={styles.info_two_column_left}>Email Address:</Text>
                            <Text style={styles.info_two_column_right}>{product.email_address}</Text>
                        </View>
                        <View style={[styles.info_two_column, { backgroundColor: '#eee'}]}>
                            <Text style={styles.info_two_column_left}>Phone Number:</Text>
                            <Text style={styles.info_two_column_right}>{product.phone_number}</Text>
                            <Text style={styles.info_two_column_left}>Alternate Phone Number:</Text>
                            <Text style={styles.info_two_column_right}>{product.phone_number_two}</Text>
                        </View>
                        <View style={styles.info_two_column}>
                            <Text style={styles.info_two_column_left}>Role:</Text>
                            <Text style={styles.info_two_column_right}>{product.role}</Text>
                            <Text style={styles.info_two_column_left}>Branch:</Text>
                            <Text style={styles.info_two_column_right}>{product.branch}</Text>
                        </View>
                        <View style={[styles.info_two_column, { backgroundColor: '#eee'}]}>
                            <Text style={styles.info_two_column_left}>Username:</Text>
                            <Text style={styles.info_two_column_right}>{product.username}</Text>
                            <Text style={styles.info_two_column_left}>Status:</Text>
                            <Text style={styles.info_two_column_right}>{product.status}</Text>
                        </View>
                        <View style={styles.info_two_column_last}>
                            <Text style={styles.info_two_column_left}>Date Created:</Text>
                            <Text style={styles.info_two_column_right_wide}>{product.created_at}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default ProductPDF;
