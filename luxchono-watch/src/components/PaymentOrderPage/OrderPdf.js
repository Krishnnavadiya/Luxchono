import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import dayjs from 'dayjs';
// Import your company logo
import Logo from '../../assets/image/PdfLogo.png';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 20,

    },
    section: {
        marginBottom: 10,

    },
    header: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20
    },
    logo: {
        width: "190px",
        height: "60px",
    },
    userDetails: {
        fontSize: 10,
    },
    heading: {
        fontSize: "1px",
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: "2rem",

    },
    orderInfo: {
        marginBottom: 20,
        fontSize: "13px"
    },

    orderDetails: {
        marginBottom: 20,
    },

    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        alignItems: 'center',
        padding: 5,
        marginBottom: 5,
        borderTopWidth: 1,
        borderTopColor: '#000000',

    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        alignItems: 'center',
        padding: 5,
    },
    tableHeaderCell: {
        fontSize: 12,
        fontWeight: 'bold',
        flex: 1,
    },
    tableCell: {
        fontSize: 12,
        flex: 1,
    },
    totalsSection: {
        marginTop: 20,
        flexDirection: "column",
        gap: "3px",
        fontSize: '13px',
        marginBottom: 60,
    },

    thankYou: {
        marginTop: 20,
        fontSize: 14,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    userdata: {
        fontSize: "13px",
        display: "flex",
        gap: "3px",
        width: "50%",


    }
});

// Create PDF component
const OrderPdf = ({ orderData }) => {

    console.log(orderData, "orderDataorderData")

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                <View style={styles.section}>

                    <Image src={Logo} style={styles.logo} />

                    {/* Header */}
                    <View style={styles.header}>

                        <View style={styles.userdata}>
                            <Text style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                <Text>{"Name : "}</Text>
                                <Text>{orderData?.fullName}</Text>
                            </Text>

                            <Text>
                                <Text >{"Contact number : "}</Text>
                                <Text>{orderData?.phoneNo}</Text>
                            </Text>

                            <Text>
                                <Text >{"Email : "}</Text>
                                <Text>{orderData?.user?.email}</Text>
                            </Text>
                            <Text>
                                <Text >{"Address : "}</Text>
                                <Text >
                                    <Text>{`${orderData?.address} , ${orderData?.city} , ${orderData?.state} - ${orderData?.pincode} `}</Text>
                                </Text>
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.heading}>{"Order Invoice :"}</Text>

                    <View style={styles.orderInfo}>

                        <View style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <Text>
                                <Text >{"Order Id : "}</Text>
                                <Text style={{ color: "#964315" }}>{orderData?.orderId}</Text>
                            </Text>

                            <Text>
                                <Text >{"Order date : "}</Text>
                                <Text>{dayjs(orderData?.date).format('MMM DD, YYYY')}</Text>
                            </Text>
                            <Text>
                                <Text >{"Payment method : "}</Text>
                                <Text>{`${orderData?.method} (${orderData?.paymentStatus})`}</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.orderDetails}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderCell} >Product</Text>
                            <Text style={styles.tableHeaderCell}>Price</Text>
                            <Text style={styles.tableHeaderCell}>Warranty</Text>
                            <Text style={styles.tableHeaderCell}>Quantity</Text>
                        </View>
                        {/* Iterate through order items and display in table */}
                        {orderData?.products?.map((item, index) => {
                            return (
                                <View style={styles.tableRow} key={index}>
                                    <Text style={styles.tableCell}>{item?.product?.name}</Text>
                                    <Text style={styles.tableCell}>{`${item?.product?.price?.toLocaleString('en-IN')} Rs.`}</Text>
                                    <Text style={styles.tableCell}>{item?.product?.warranty}</Text>
                                    <Text style={styles.tableCell}>{item?.quantity}</Text>
                                </View>
                            )
                        })}
                    </View>

                    {/* Totals section */}
                    <View style={styles.totalsSection}>


                        <View style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <Text>
                                <Text >{"Total : "}</Text>
                                <Text>{`${orderData?.totalAmount?.toLocaleString('en-IN')} Rs.`}</Text>
                            </Text>

                            <Text>
                                <Text >{"Discount : "}</Text>
                                <Text>{`${orderData?.discountAmount?.toLocaleString('en-IN')} Rs.`}</Text>
                            </Text>

                            <Text>
                                <Text>{"Payment : "}</Text>
                                <Text style={{ color: "#964315" }}>{`${orderData?.paymentAmount?.toLocaleString('en-IN')} Rs.`}</Text>
                            </Text>
                        </View>
                    </View>

                    {/* Signature section */}


                    {/* Thank you message */}
                    <View >
                        <Text style={styles.thankYou}>Thank you for your purchase!</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default OrderPdf;
