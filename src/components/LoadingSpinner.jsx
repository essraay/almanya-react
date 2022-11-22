import { CSpinner } from '@coreui/react'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center p-4">
      <CSpinner />
    </div>
  )
}

export default LoadingSpinner
