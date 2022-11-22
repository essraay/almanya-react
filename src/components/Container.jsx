import { CContainer } from '@coreui/react'

const Container = ({ children }) => {
  return <CContainer style={{ maxWidth: 640 }}>{children}</CContainer>
}

export default Container
