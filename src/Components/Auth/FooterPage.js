import { Footer } from 'antd/es/layout/layout'
import React from 'react'

export const FooterPage = () => {
    return (<Footer>
        © {new Date().getFullYear()} All rights reserved.
    </Footer>
    )
}
