import { CToast, CToastBody, CToastClose } from '@coreui/react'

const Toast = ({ children }) => {
  return (
    <CToast
      visible={true}
      delay={2000}
      className="align-items-center"
    >
      <div className="d-flex">
        <CToastBody>{children}</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  )
}

export default Toast
