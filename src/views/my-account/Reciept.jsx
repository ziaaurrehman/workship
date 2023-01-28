import React, { useState, useEffect } from 'react'
import * as $ from 'jquery'

import { CCard, CCardHeader, CCol, CRow, CButton, CSmartTable, CTooltip } from '@coreui/react-pro'
import { CCardBody } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDelete } from '@coreui/icons'
import ReceivedModal from './Modal/receivedModal'
// import './Reciept.css'
import ProductsModal from './Modal/productsModal'
import DimensionModal from './Modal/dimentionsModal'
import ShippedModal from './Modal/shippedModal'
import LabelModal from './Modal/labelModal'
const id = localStorage.getItem('token2')

let today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
const yyyy = today.getFullYear()

today = `${mm}/${dd}/${yyyy}`

const Receipt = () => {
  const [allReceipts, setAllReceipts] = useState()
  const [receivedModal, setReceivedModal] = useState(false)
  const [productsModal, setProductsModal] = useState(false)
  const [labelModal, setLabelModal] = useState(false)
  const [shippedModal, setShippedModal] = useState(false)
  const [dimensionModal, setDimensionModal] = useState(false)
  const [allData, setAllData] = useState({
    received_tracking_number: '',
    product_tracking_number: '',
    shipped_id: '',
    label_id: '',
    dimension_id: '',
  })
  let getUserReceipts = 'http://apps.k2bay.com/laptopzone/worldship/c_wordship/getUserReceipts'

  // const handleDelete = (order) => {
  //   const nonDeletedItem = allOrders.filter((item) => item.id !== order.id)
  //   localStorage.setItem('orders', JSON.stringify(nonDeletedItem))
  //   setAllOrders(nonDeletedItem)
  //   alert('Order Deleted')
  // }

  const showReceivedModal = (item) => {
    setAllData((prevState) => ({
      ...prevState,
      received_tracking_number: item.Tracking_number,
    }))

    setReceivedModal(true)
  }

  const showDimensionsModal = (item) => {
    setAllData((prevState) => ({
      ...prevState,
      dimension_id: item.Receipt_id,
    }))
    setDimensionModal(true)
  }

  const showShippedModal = (item) => {
    setAllData((prevState) => ({
      ...prevState,
      shipped_id: item.Receipt_id,
    }))
    setShippedModal(true)
  }

  const showLabelModal = (item) => {
    setAllData((prevState) => ({
      ...prevState,
      label_id: item.Receipt_id,
    }))
    setLabelModal(true)
  }

  const showProductModal = (item) => {
    setAllData((prevState) => ({
      ...prevState,
      product_tracking_number: item.Tracking_number,
    }))
    setProductsModal(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = new FormData()
        data.append('user_id', id)

        new Promise(function (resolve, reject) {
          $.ajax({
            url: getUserReceipts,
            type: 'POST',
            data: data,
            processData: false,
            contentType: false,
          }).then(
            function (addData) {
              resolve(addData)
            },
            function (err) {
              reject(err)
            },
          )
        })
          .then((result) => {
            if (result) {
              setAllReceipts(JSON.parse(result))
            } else {
              console.log('Some thing Wrong')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <h2>All Receipts</h2>
      <ReceivedModal
        receivedModal={receivedModal}
        setReceivedModal={setReceivedModal}
        trackingNumber={allData.received_tracking_number}
      />
      <ProductsModal
        productsModal={productsModal}
        setProductsModal={setProductsModal}
        productTrackingNumber={allData.product_tracking_number}
      />
      <DimensionModal
        dimensionModal={dimensionModal}
        setDimensionModal={setDimensionModal}
        dimensionReceiptId={allData.dimension_id}
      />
      <ShippedModal
        setShippedModal={setShippedModal}
        shippedModal={shippedModal}
        shippedId={allData.shipped_id}
      />
      <LabelModal
        labelModal={labelModal}
        setLabelModal={setLabelModal}
        labelsId={allData.label_id}
      />

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Product</strong>
            </CCardHeader>
            <CCardBody>
              <CSmartTable
                items={allReceipts}
                columns={[
                  {
                    key: 'delete',
                    label: '',
                    _style: { width: '1%' },
                    filter: false,
                    sorter: false,
                  },
                  {
                    key: 'show_details',
                    label: '',
                    _style: { width: '1%' },
                    filter: false,
                    sorter: false,
                  },
                  {
                    key: 'update_receipt_status',
                    label: '',
                    _style: { width: '1%' },
                    filter: false,
                    sorter: false,
                  },
                  {
                    key: 'product_receipt',
                    label: '',
                    _style: { width: '1%' },
                    filter: false,
                    sorter: false,
                  },
                  {
                    key: 'enter_dimensions',
                    label: '',
                    _style: { width: '1%' },
                    filter: false,
                    sorter: false,
                  },
                  {
                    key: 'labels',
                    label: '',
                    _style: { width: '1%' },
                    filter: false,
                    sorter: false,
                  },
                  {
                    key: 'shipped',
                    label: '',
                    _style: { width: '1%' },
                    filter: false,
                    sorter: false,
                  },
                  'Receipt_id',
                  'Carrier_name',
                  'Description',
                  'Recipt_type',
                  'Remarks',
                  'Status',
                  'Tracking_number',
                  'Weight',
                  'Dimension',
                ]}
                itemsPerPage={5}
                columnFilter
                columnSorter
                pagination
                scopedColumns={{
                  delete: (items) => {
                    return (
                      <td className="py-2">
                        <CTooltip content="Delete">
                          <CButton
                            color="danger"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              this.showDeleteAlert(items)
                            }}
                          >
                            <CIcon icon={cilDelete} className="me-2 " />
                          </CButton>
                        </CTooltip>
                      </td>
                    )
                  },
                  show_details: (items) => {
                    return (
                      <td className="py-2">
                        <CTooltip content="edit">
                          <CButton
                            color="dark"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              this.editProduct(items)
                            }}
                          >
                            Edit
                          </CButton>
                        </CTooltip>

                        <br />
                      </td>
                    )
                  },
                  update_receipt_status: (items) => {
                    return (
                      <td className="py-2">
                        <CTooltip content="set status to received">
                          <CButton
                            color="success"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              showReceivedModal(items)
                            }}
                          >
                            Received
                          </CButton>
                        </CTooltip>
                      </td>
                    )
                  },
                  product_receipt: (items) => {
                    return (
                      <td className="py-2">
                        <CTooltip content="product receipt">
                          <CButton
                            color="success"
                            shape="square"
                            size="sm"
                            onClick={() => showProductModal(items)}
                          >
                            Products
                          </CButton>
                        </CTooltip>
                      </td>
                    )
                  },
                  enter_dimensions: (items) => {
                    return (
                      <td className="py-2">
                        <CTooltip content="enter dimensions">
                          <CButton
                            color="success"
                            shape="square"
                            size="sm"
                            onClick={() => showDimensionsModal(items)}
                          >
                            Dimensions
                          </CButton>
                        </CTooltip>
                      </td>
                    )
                  },
                  labels: (items) => {
                    return (
                      <td className="py-2">
                        <CTooltip content="set label">
                          <CButton
                            color="success"
                            shape="square"
                            size="sm"
                            onClick={() => showLabelModal(items)}
                          >
                            Labels
                          </CButton>
                        </CTooltip>
                      </td>
                    )
                  },
                  shipped: (items) => {
                    return (
                      <td className="py-2">
                        <CTooltip content="set status to shipped">
                          <CButton
                            color="success"
                            shape="square"
                            size="sm"
                            onClick={() => showShippedModal(items)}
                          >
                            Shipped
                          </CButton>
                        </CTooltip>
                      </td>
                    )
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Receipt
