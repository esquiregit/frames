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
        marginBottom: 10,
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
                            <Text style={styles.info_one_column_left}>Product ID:</Text>
                            <Text style={styles.info_one_column_right}>{product.product_id}</Text>
                        </View>
                        <View style={styles.info_two_column}>
                            <Text style={styles.info_two_column_left}>Product:</Text>
                            <Text style={styles.info_two_column_right}>{product.frame}</Text>
                            <Text style={styles.info_two_column_left}>Category:</Text>
                            <Text style={styles.info_two_column_right}>{product.category}</Text>
                        </View>
                        <View style={[styles.info_two_column, { backgroundColor: '#eee'}]}>
                            <Text style={styles.info_one_column_left}>Description:</Text>
                            <Text style={styles.info_one_column_right}>{product.description}</Text>
                        </View>
                        <View style={[styles.info_two_column]}>
                            <Text style={styles.info_two_column_left}>Price:</Text>
                            <Text style={styles.info_two_column_right}>{product.price}</Text>
                            <Text style={styles.info_two_column_left}>Quantity:</Text>
                            <Text style={styles.info_two_column_right}>{product.quantity}</Text>
                        </View>
                        <View style={[styles.info_two_column, { backgroundColor: '#eee'}]}>
                            <Text style={styles.info_two_column_left}>Interior Width:</Text>
                            <Text style={styles.info_two_column_right}>{product.interior_width}</Text>
                            <Text style={styles.info_two_column_left}>Interior Height:</Text>
                            <Text style={styles.info_two_column_right}>{product.interior_height}</Text>
                        </View>
                        <View style={[styles.info_two_column]}>
                            <Text style={styles.info_two_column_left}>Exterior Width:</Text>
                            <Text style={styles.info_two_column_right}>{product.exterior_width}</Text>
                            <Text style={styles.info_two_column_left}>Exterior Height:</Text>
                            <Text style={styles.info_two_column_right}>{product.exterior_height}</Text>
                        </View>
                        <View style={[styles.info_two_column_last, { backgroundColor: '#eee'}]}>
                            <Text style={styles.info_two_column_left}>Date Added:</Text>
                            <Text style={styles.info_two_column_right_wide}>{product.date_added}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default ProductPDF;
