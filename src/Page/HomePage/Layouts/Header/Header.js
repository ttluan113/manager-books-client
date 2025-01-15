import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ModalHeader from '../Modal/ModalHeader';
import { jwtDecode } from 'jwt-decode';
import request from '../../../../config/Connect';

import Logo from '../../../../asset/img/logo.jpg';

const cx = classNames.bind(styles);

function Header({ setSearchValue }) {
    const [show, setShow] = useState(false);
    const [checkAdmin, setCheckAdmin] = useState(false);

    const handleShow = () => {
        setShow(!show);
    };

    const token = document.cookie.slice(6, 9999);
    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.admin) {
                setCheckAdmin(true);
            }
        }
    }, [token]);

    const handleLogout = () => {
        request.post('/api/logout').then((res) => console.log(res));
    };

    return (
        <div className={cx('wrapper')}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/homepage">
                        <img style={{ width: '50px' }} src={Logo} alt="" />
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#/"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Cài Đặt
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link to="/info" className="dropdown-item" href="#/">
                                            Thông Tin Tài Khoản
                                        </Link>
                                    </li>
                                    {checkAdmin ? (
                                        <li>
                                            <Link to="/admin" className="dropdown-item" href="#/">
                                                Trang Quản Trị Admin
                                            </Link>
                                        </li>
                                    ) : (
                                        <></>
                                    )}
                                    <li>
                                        <Link className="dropdown-item" to="/history">
                                            Lịch Sử Mượn Sách
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={handleShow} className="dropdown-item">
                                            Gửi Yêu Cầu Cấp Thẻ
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li onClick={handleLogout}>
                                        <a className="dropdown-item" href="#/">
                                            Đăng Xuất
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <h1>Thư Viện FBU</h1>
            <form className="d-flex">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Tìm Kiếm Sách"
                    aria-label="Search"
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </form>
            <ModalHeader show={show} setShow={setShow} />
        </div>
    );
}

export default Header;
