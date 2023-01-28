import React from 'react'
import { CToast, CToastBody, CToastClose } from '@coreui/react'

const Toast = ({ text = 'Order Added Successfully', onClose }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'relative',
        marginBottom: 10,
        position: 'absolute',
        top: '20vh  ',
        right: '20px',
        zIndex: 1000,
      }}
    >
      <CToast
        autohide={false}
        visible={true}
        color="primary"
        className="text-white align-items-center"
      >
        <div className="d-flex border">
          <CToastBody>{text}</CToastBody>
          <CToastClose className="me-2 m-auto" white onClick={onClose} />
        </div>
      </CToast>
    </div>
  )
}

export default Toast
