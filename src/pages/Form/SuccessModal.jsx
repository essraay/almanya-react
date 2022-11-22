import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'
import Lottie from 'lottie-react'
import successAnimation from '../../animations/successAnimation.json'

const SuccessModal = ({ visible = false, onClose }) => {
  return (
    <CModal
      className="show "
      keyboard={false}
      alignment="center"
      visible={visible}
      onClose={onClose}
    >
      <CModalHeader></CModalHeader>
      <CModalBody>
        <div className="d-flex flex-column gap-3 justify-content-center text-center">
          <span className="h3">Başvurunuz alındı!</span>
          <span>
            <Lottie
              animationData={successAnimation}
              loop={false}
            />
          </span>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          onClick={onClose}
        >
          Tamam
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
export default SuccessModal
