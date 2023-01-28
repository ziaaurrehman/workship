import React, { useEffect, useState } from 'react'
import { api } from '../../constants'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CButton,
  CModalFooter,
  CCol,
  CRow,
  CCarousel,
  CCarouselItem,
  CImage,
  CToast,
CToastBody,
CToaster
} from '@coreui/react-pro'
import axios from 'axios'
import AddClient from './AddClient'
import Questionary from "./Questionary"
import "./style.css"

const id = localStorage.getItem('token2')

let user = JSON.parse(localStorage.getItem('user'))
let is_admin = Number(user?.user_id[0]?.is_admin)
let sj_user = Number(user?.user_id[0]?.sj_user)

const exampleToast = (message) => (
  <CToast autohide={true}>
    <CToastBody>{message}</CToastBody>
  </CToast>
)

function PackageModel({ packageModal, setPackageModal, packageId }) {
  const [getPackageDetail, setPackageDetail] = useState(null)
  const [clientData, setClientData] = useState([])
  const [productData, setProductData] = useState([])
  const [client, setClient] = useState(null)
  const [product, setProduct] = useState(null)
  const [productQty, setProductQty] = useState(0)
  const [loading, setLoading] = useState(false)
  const [productLoading, setProductLoading] = useState(false)
  const [addQuestionary, setQuestionary] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = React.useRef()


  const getClients = () => {
    try {
      axios
      .post(`${api}/getClients`)
      .then((res) => {
      if (res.data.status) {
        setClientData(res.data.users?.map(item=> {
          return {value:item?.user_id, label:item?.user_name}
        }))
      } else {
        setClientData([])
      }
    })
    .catch((err) => {
      setClientData([])
      console.log(err)
    })
  } catch (error) {
    setClientData([])
    console.log(error)
  }
}

  const getProducts = () => {
    try {
      axios
      .post(`${api}/getProducts`)
      .then((res) => {
        console.log(res.data , "PRODUCT")
      if (res.data) {
        setProductData(res.data?.map(item=> {
          return {value:item?.product_id, label:item?.title}
        }))
      } else {
        setProductData([])
      }
    })
    .catch((err) => {
      setProductData([])
      console.log(err)
    })
  } catch (error) {
    setProductData([])
    console.log(error)
  }
  }

  useEffect(()=> {
    const formData = new FormData()
    formData.append("package_id",packageId)
    try {
      axios
      .post(`${api}/getPackageImages`, formData)
      .then((res) => {
        console.log(res.data)
        if (res.data.status) {
          setPackageDetail(res.data.data)
        } else {
          setPackageDetail(null)
        }
      })
      .catch((err) => {
        setPackageDetail(null)
        console.log(err)
      })
    } catch (error) {
      setPackageDetail(null)
      console.log(error)
    }
    if(+is_admin === 1 || +sj_user === 1){
      getClients()
      getProducts()
    
    }
  },[packageId])


  const addClient = () => {
      try {
        setLoading(true)
        let formData = new FormData()
        formData.append("client_id", client?.value)
        formData.append("user_id", id)
        formData.append("package_id", packageId)
        axios
        .post(`${api}/identifyClient`, formData)
        .then((res) => {
          console.log(res.data, "IDENTIFY CLIENT")
        if (res.data.status) {
          addToast(exampleToast(res.data?.message || "Client Addedd Successfully"))
        } else {
          addToast(exampleToast(res.data?.message || "Client Not Addedd Successfully"))
        }
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        addToast(exampleToast(err?.message || "Client Not Addedd Successfully"))
        console.log(err)
      })
      } catch (error) {
        setLoading(false)
        addToast(exampleToast(error?.message || "Client Not Addedd Successfully"))
      console.log(error)
      }

  }

  const addProduct = () => {
    try {
      setProductLoading(true)
      let formData = new FormData()
      formData.append("client_id", client?.value)
      formData.append("user_id", id)
      formData.append("package_id", packageId)
      formData.append("product_id", product?.value)
      formData.append("qty", productQty)
      axios
      .post(`${api}/identifyProduct`, formData)
      .then((res) => {
      if (res.data.status) {
        addToast(exampleToast(res.data?.message || "Product Addedd Successfully"))
      } else {
        addToast(exampleToast(res.data?.message || "Product Not Addedd Successfully"))
      }
      setProductLoading(false)
    })
    .catch((err) => {
      setProductLoading(false)
      addToast(exampleToast(err?.message || "Product Not Addedd Successfully"))
    })
    } catch (error) {
      setProductLoading(false)
      addToast(exampleToast(error?.message || "Product Not Addedd Successfully"))
    console.log(error)
    }
      }


  return (
    <div>
          <CToaster ref={toaster} push={toast} placement="top-end" />
      <CModal
      alignment="center" scrollable
        visible={packageModal}
        onClose={() => {
          setPackageDetail([])
          setClientData([])
          setProductData([])
          setClient(null)
          setProduct(null)
          setLoading(false)
          setPackageModal(false)
        }}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>Package Verification</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs="12">
            <CCarousel controls>
                {getPackageDetail?.map(item=> (
                    <CCarouselItem key={item?.id}>
                    <CImage className="d-block w-100" src={item?.image_url} alt={item?.image_url} />
                    </CCarouselItem>
                ))}
            </CCarousel>
            </CCol>
          </CRow>
          {(+is_admin === 1 || +sj_user === 1) && !addQuestionary ?
          <AddClient clientData={clientData} client={client} setClient={setClient} loading={loading} addClient={addClient} productData={productData} product={product}setProduct={setProduct} productQty={productQty} setProductQty={setProductQty} productLoading={productLoading} addProduct={addProduct} />
         : null}
        </CModalBody>
        <CModalFooter className="justify-content-between">
          {(+is_admin === 1 || +sj_user === 1) && <CButton color="primary" onClick={() => {
          setQuestionary(!addQuestionary)
        }}>
            {addQuestionary ? "Add Client" : "Ask Question"}
          </CButton>}
          <CButton color="secondary" onClick={() => {
          setPackageDetail([])
          setClientData([])
          setProductData([])
          setClient(null)
          setProduct(null)
          setLoading(false)
          setPackageModal(false)
        }}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default PackageModel
