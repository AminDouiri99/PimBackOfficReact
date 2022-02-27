import React from 'react'
import { Link } from 'react-router-dom'
import Badge from '../../components/badge/Badge'
import Table from '../../components/table/Table'
const latestOrders = {
    header: [
        "order id",
        "user",
        "total price",
        "date",
        "status"
    ],
    body: [
        {
            id: "#OD1711",
            user: "john doe",
            date: "17 Jun 2021",
            price: "$900",
            status: "shipping"
        },
        {
            id: "#OD1712",
            user: "frank iva",
            date: "1 Jun 2021",
            price: "$400",
            status: "paid"
        },
        {
            id: "#OD1713",
            user: "anthony baker",
            date: "27 Jun 2021",
            price: "$200",
            status: "pending"
        },
        {
            id: "#OD1712",
            user: "frank iva",
            date: "1 Jun 2021",
            price: "$400",
            status: "paid"
        },
        {
            id: "#OD1713",
            user: "anthony baker",
            date: "27 Jun 2021",
            price: "$200",
            status: "refund"
        }
    ]
}
const orderStatus = {
    "shipping": "primary",
    "pending": "warning",
    "paid": "success",
    "refund": "danger"
}

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.user}</td>
        <td>{item.price}</td>
        <td>{item.date}</td>
        <td>
            <Badge type={orderStatus[item.status]} content={item.status}/>
        </td>
    </tr>
)

const Orders =()=>{
    return(
        
        <div className="col-8">
             <h2 className="page-header">
                Orders
            </h2>
        <div className="card">
            <div className="card__header">
                <h3>latest orders</h3>
            </div>
            <div className="card__body">
                <Table
                    headData={latestOrders.header}
                    renderHead={(item, index) => renderOrderHead(item, index)}
                    bodyData={latestOrders.body}
                    renderBody={(item, index) => renderOrderBody(item, index)}
                />
            </div>
            <div className="card__footer">
                <Link to='/'>view all</Link>
            </div>
        </div>
    </div>
    )

}

export default Orders
