import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="container-fluid">
                <div className="row align-items-end">
                <div className="col-12 col-md-6">
                    <div className="help">
                    <h3>Help and support</h3>
                    <ul>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Call us: 020 8502 1100 (9am - 5pm, Mon - Fri)</a></li>
                        <li><a href="#">Message us securly</a></li>
                    </ul>
                    </div>
                </div>
                <div className="col-12 col-md-6 text-right">
                    <nav>
                    <ul>
                        <li><a href="#">Terms &amp; Conditions</a></li>
                        <li><a href="#">Privacy</a></li>
                        <li><a href="#">Feedback</a></li>
                    </ul>
                    </nav>
                    <p className="copyright">&copy; Stewardship Services (UKET) Limited - All rights reserved</p>
                </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;