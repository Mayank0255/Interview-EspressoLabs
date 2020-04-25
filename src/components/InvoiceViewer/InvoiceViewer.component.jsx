import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getInvoice } from "../../redux/invoice/invoice.actions";

import './InvoiceViewer.styles.scss'

class InvoiceViewer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            body: 'Sample'
        }
    }

    componentDidMount() {
        this.props.getInvoice();
    }

    subTotal = () => {
        const invoice = this.props.invoice.invoice;
        let subtotal = parseFloat(invoice.data.order.amount);
        invoice.data.order_items.map( item => (
            subtotal += parseFloat(item.total)
        ));
        return subtotal
    };


    handleData = async () => {

        const invoice = this.props.invoice.invoice;

        let body = JSON.stringify({
            html : `<div class="invoice-panel">
                    <div class="address-sec">
                        <div class="brandLogo">
                            <img src=${invoice.data.company.logo} alt={invoice.data.company.name}/>
                            ${invoice.data.company.name}
                        </div>
                        <div class="address-info">
                            <span>${invoice.data.company.address}</span>
                            <span>${invoice.data.company.mobile}</span>
                            <span>${invoice.data.company.email}</span>
                        </div>
                    </div>
                    <div class="information">
                        <div class="client-info">
                            <h5 class="client-head">
                                Client Information :
                            </h5>
                            <span class="client-name">${invoice.data.client.name}</span>
                            <span>${invoice.data.client.address}</span>
                            <span>${invoice.data.client.mobile}</span>
                            <span>${invoice.data.client.email}</span>
                        </div>
                        <div class="order-info">
                            <h5 class="order-head">
                                Order Information :
                            </h5>
                            <div class="info-date">
                                <span>Date:</span>
                                ${invoice.data.order.date}
                            </div>
                            <div class="info-status">
                                <span>Status:</span>
                                ${invoice.data.order.status.toLowerCase() === "pending" ? <Fragment>
                                        <span class="yellow-status">
                                            ${invoice.data.order.status}
                                        </span>
                                    </Fragment> :
                                    <Fragment>
                                        <span class="red-status">
                                            ${invoice.data.order.status}
                                        </span>
                                    </Fragment>
                                }
                            </div>
                            <div class="info-id">
                                <span>Id:</span>
                                # ${invoice.data.order.id}
                            </div>
                        </div>
                        <div class="invoice-info">
                            <div class="invoice_num">
                                <h5>
                                    INVOICE NUMBER # ${invoice.data.order.invoice_number}
                                </h5>
                            </div>
                            <div class="amountDue">
                                TOTAL DUE:
                                ${invoice.data.order.currency}
                                ${invoice.data.order.amount}
                            </div>
                        </div>
                    </div>
                    <div class="items-box">
                        <div class="items-label">
                            <p>Description</p>
                            <p>Quantity</p>
                            <p>Amount</p>
                            <p>Total</p>
                        </div>
                        <div class="items">
                            
                                <div class="item">
                                    <div class="items-desc">
                                        <span>${invoice.data.order_items[0].name}</span>
                                        <span>${invoice.data.order_items[0].description}</span>
                                    </div>
                                    <div class="items-quan">
                                        ${invoice.data.order_items[0].quantity}
                                    </div>
                                    <div class="items-amt">
                                        ${invoice.data.order_items[0].currency}
                                        ${invoice.data.order_items[0].amount}
                                    </div>
                                    <div class="items-total">
                                        ${invoice.data.order_items[0].currency}
                                        ${invoice.data.order_items[0].total}
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="items-desc">
                                        <span>${invoice.data.order_items[1].name}</span>
                                        <span>${invoice.data.order_items[1].description}</span>
                                    </div>
                                    <div class="items-quan">
                                        ${invoice.data.order_items[1].quantity}
                                    </div>
                                    <div class="items-amt">
                                        ${invoice.data.order_items[1].currency}
                                        ${invoice.data.order_items[1].amount}
                                    </div>
                                    <div class="items-total">
                                        ${invoice.data.order_items[1].currency}
                                        ${invoice.data.order_items[1].total}
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="items-desc">
                                        <span>${invoice.data.order_items[2].name}</span>
                                        <span>${invoice.data.order_items[2].description}</span>
                                    </div>
                                    <div class="items-quan">
                                        ${invoice.data.order_items[2].quantity}
                                    </div>
                                    <div class="items-amt">
                                        ${invoice.data.order_items[2].currency}
                                        ${invoice.data.order_items[2].amount}
                                    </div>
                                    <div class="items-total">
                                        ${invoice.data.order_items[2].currency}
                                        ${invoice.data.order_items[2].total}
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div class="total-box">
                        <div class="total-info">
                            <span><h4>Sub Total:</h4> ${invoice.data.order.currency}${this.subTotal()}</span>
                            <span><h4>Taxes (10%):</h4> ${invoice.data.order.currency}${this.subTotal()/10}</span>
                            <span><h4>Discount (5%):</h4> ${invoice.data.order.currency}${this.subTotal()/20}</span>
                            <span class="total">Total: ${invoice.data.order.currency}${this.subTotal() + this.subTotal()/10 - this.subTotal()/20}</span>
                        </div>
                    </div>
                </div>
                <style>
                    body{
                        background-color: rgba(0,0,0,0.05);
                    }
                    .invoice-viewer{
                      width: 100%;
                      height: 100%;
                      display: flex;
                      justify-content: center;
                      flex-direction: column;
                      align-items: center;
                      color: rgba(0,0,0,0.5);
                    }
                    .invoice-panel {
                        margin: 30px 0;
                        width: 90%;
                        background-color: #fff;
                        box-shadow: 0 20px 25px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.1);
                        padding: 20px;
                        border-radius: 2px;
                        display: flex;
                        flex-direction: column;
                    }
                    .address-sec{
                      display: flex;
                      flex-direction: column;
                      margin-bottom: 15px;
                    }
                    .brandLogo {
                    display: flex;
                    flex-direction: column;
                    }
                    .brandLogo img{
                      width: 50px;
                      height: 50px;
                      z-index:1;
                    }
                    .address-info {
                      display: flex;
                      flex-direction: column;
                      font-size: 14px;
                    }
                    .information {
                      display: flex;
                      flex-direction: row;
                      margin-bottom: 15px;
                      font-size: 14px;
                    }
                    .client-info{
                    display: flex;
                    flex-direction: column;
                    width: 30%;
                    margin-right: 15px;
                    }
                    .client-head{
                      font-size: 14px;
                      margin-bottom: 10px;
                    }
                    .client-name{
                      font-weight: 600;
                    }
                    .order-info{
                    display: flex;
                    flex-direction: column;
                    width: 30%;
                    margin-right: 15px;
                    }
                    .order-head{
                      font-size: 14px;
                      margin-bottom: 10px;
                    }
                    .order-info span{
                      margin-right: 20px;
                      font-weight: 500;
                    }
                    .info-status{
                      margin: 2px 0;
                    }
                    .yellow-status{
                    padding:2px 4px;
                    background-color: #ffff50;
                    }
                    .red-status{
                        padding: 4px;
                        background-color: red;
                      }
                    .invoice-info{
                    display: flex;
                    flex-direction: column;
                    width: 30%;
                    margin-right: 15px;
                    }
                    .invoice_num > h5{
                      font-size: 14px;
                      margin-bottom: 10px;
                    }
                    .amountDue{
                      color: #349feb;
                    }
                    .items-box{
                      display: flex;
                      flex-direction: column;
                      margin-bottom: 15px;
                    }
                    .items-label{
                    display: flex;
                    flex-direction: row;
                    border-top: 1px solid rgba(0,0,0,0.2);
                    padding: 8px;
                    }
                    .items-label p{
                      width: 10%;
                      text-align: center;
                    }
                    .items-label p:nth-child(1){
                      text-align: left;
                      width: 65%;
                    }
                    .items{
                    display: flex;
                    flex-direction: column;
                    }
                    .item{
                      display: flex;
                      flex-direction: row;
                      border-top: 1px solid rgba(0,0,0,0.2);
                      padding: 8px 8px 20px 8px;
                    }
                    .items-desc{
                        width: 65%;
                        display: flex;
                        flex-direction: column;
                      }
                      .items-quan{
                        text-align: center;
                        width: 10%;
                      }
                      .items-amt{
                        text-align: center;
                        width: 10%;
                      }
                      .items-total{
                        text-align: center;
                        width: 10%;
                      }
                    .total-box{
                      display: flex;
                      justify-content: flex-end;
                      background-color: rgba(0,0,0,0.06);
                      margin-bottom: 15px;
                      padding: 20px;
                      }
                    .total-info{
                    display: flex;
                    flex-direction: column;
                    font-size: 14px;
                    }
                    .total-info span{
                      margin-bottom: 12px;
                      }
                    .total-info h4{
                        display: inline;
                        margin-right: 8px;
                        color: rgba(0,0,0,0.4);
                      }
                    .total {
                      font-weight: 500;
                      font-size: 16px;
                      color: #349feb;
                      margin-top: 10px;
                    }
                    
                   
                  
                </style>`
        });

        await fetch('http://ec2-13-231-224-159.ap-northeast-1.compute.amazonaws.com:8080/api/invoice/pdf/generate', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Accept: 'application/json'
            },
            body
        })
            .then(response => response.json())
            .then(data => {
                window.open(`http://ec2-13-231-224-159.ap-northeast-1.compute.amazonaws.com:8080/api/invoice/pdf/${data.data.filename}`, '_blank');
            })
            .catch(function(err) {
                console.log(err);
            });
    };


       render() {
           // const Invoice = this.props.invoice;
           const invoice = this.props.invoice.invoice;
        return this.props.invoice.loading || invoice === null ? <Fragment>Loading...</Fragment> : <Fragment>
            <div className="invoice-viewer">
                <div className="invoice-panel">
                    <div className="address-sec">
                        <div className="brandLogo">
                            <img src={invoice.data.company.logo} alt={invoice.data.company.name}/>
                            {invoice.data.company.name}
                        </div>
                        <div className="address-info">
                            <span>{invoice.data.company.address}</span>
                            <span>{invoice.data.company.mobile}</span>
                            <span>{invoice.data.company.email}</span>
                        </div>
                    </div>
                    <div className="information">
                        <div className="client-info">
                            <h5 className="client-head">
                                Client Information :
                            </h5>
                            <span className="client-name">{invoice.data.client.name}</span>
                            <span>{invoice.data.client.address}</span>
                            <span>{invoice.data.client.mobile}</span>
                            <span>{invoice.data.client.email}</span>
                        </div>
                        <div className="order-info">
                            <h5 className="order-head">
                                Order Information :
                            </h5>
                            <div className="info-date">
                                <span>Date:</span>
                                {invoice.data.order.date}
                            </div>
                            <div className="info-status">
                                <span>Status:</span>
                                {invoice.data.order.status.toLowerCase() === "pending" ? <Fragment>
                                        <span className="yellow-status">
                                            {invoice.data.order.status}
                                        </span>
                                    </Fragment> :
                                    <Fragment>
                                        <span className="red-status">
                                            {invoice.data.order.status}
                                        </span>
                                    </Fragment>
                                }
                            </div>
                            <div className="info-id">
                                <span>Id:</span>
                                #{invoice.data.order.id}
                            </div>
                        </div>
                        <div className="invoice-info">
                            <div className="invoice_num">
                                <h5>
                                    INVOICE NUMBER #{invoice.data.order.invoice_number}
                                </h5>
                            </div>
                            <div className="amountDue">
                                TOTAL DUE:
                                {invoice.data.order.currency}
                                {invoice.data.order.amount}
                            </div>
                        </div>
                    </div>
                    <div className="items-box">
                        <div className="items-label">
                            <p>Description</p>
                            <p>Quantity</p>
                            <p>Amount</p>
                            <p>Total</p>
                        </div>
                        <div className="items">
                            {invoice.data.order_items.map((item,index) => (
                                <div className="item" key={index}>
                                    <div className="items-desc">
                                        <span>{item.name}</span>
                                        <span>{item.description}</span>
                                    </div>
                                    <div className="items-quan">
                                        {item.quantity}
                                    </div>
                                    <div className="items-amt">
                                        {item.currency}
                                        {item.amount}
                                    </div>
                                    <div className="items-total">
                                        {item.currency}
                                        {item.total}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="total-box">
                        <div className="total-info">
                            <span><h4>Sub Total:</h4> {invoice.data.order.currency}{this.subTotal()}</span>
                            <span><h4>Taxes (10%):</h4> {invoice.data.order.currency}{this.subTotal()/10}</span>
                            <span><h4>Discount (5%):</h4> {invoice.data.order.currency}{this.subTotal()/20}</span>
                            <span className="total">Total: {invoice.data.order.currency}{this.subTotal() + this.subTotal()/10 - this.subTotal()/20}</span>
                        </div>
                    </div>
                    <div className="guidelines">
                        <h5>Terms and Conditions</h5>
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi asperiores at cupiditate enim et eveniet ex explicabo fuga hic nisi odit quas qui quidem ratione, rem repellendus unde voluptatem.</span>
                    </div>
                </div>
                <div className="actions-box">
                    <button onClick={this.handleData}>
                        Print
                    </button>
                </div>
            </div>
        </Fragment>
    }
};

InvoiceViewer.propTypes = {
    getInvoice: PropTypes.func.isRequired,
    invoice: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    invoice: state.invoice
});

export default connect(mapStateToProps,{ getInvoice })(InvoiceViewer);