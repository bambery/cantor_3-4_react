import React from 'react'

const Header = () => {
    return(
        <div className="page-header">
            <div id="page-and-paper-title">
                <div id="page-title">
                    Cantor-like Set Generator
                </div>
                <div id="paper-title">
                    <a href="https://arxiv.org/pdf/2211.08664.pdf">Read the Paper: A Non-Centered Asymmetric Cantor-like Set</a>
                </div>
            </div>
            <div id="credit-and-github">
                <div id="github-logo">
                </div>
                <div id="author">
                    Lauren Wszolek
                </div>
                <div id="github-link">
                    <a href="https://github.com/bambery/cantor_3-4_react">Project Github</a>
                </div>
            </div>
        </div>
    )
}

export default Header
