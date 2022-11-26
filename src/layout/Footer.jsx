import { CFooter, CLink } from '@coreui/react'
import React from 'react'

const Footer = () => {
    return (
        <CFooter>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        © <a href="">EY</a> 2022
                    </div>
                </div>
            </div>
        </CFooter>
    )
}

export default Footer

