import classNames from 'classnames/bind';
import styles from './InfoUser.module.scss';
import Header from '../HomePage/Layouts/Header/Header';

import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { ModalEditUser } from './Modal/ModalEditUser';

const cx = classNames.bind(styles);

function InfoUser() {
    const [dataUser, setDataUser] = useState({});
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    };

    const token = document.cookie;

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setDataUser(decoded);
        }
    }, [token]);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>
            <div className={cx('wrapper')}>
                <header className={cx('header-page-admin')}>
                    <div className={cx('img-admin')}>
                        <img
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                            alt=""
                        />
                    </div>

                    <div className={cx('info-admin')}>
                        <h1>{dataUser?.dataUser?.fullname}</h1>
                        <div className={cx('position')}>
                            <span>{dataUser?.email}</span>
                            <span>{dataUser?.isAdmin ? 'Admin' : 'User'}</span>
                        </div>
                    </div>
                </header>

                <main className={cx('info-account')}>
                    <header>
                        <h1>Account</h1>
                    </header>

                    <div className={cx('input-info')}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                                Username
                            </span>
                            <input value={dataUser?.name} type="text" className="form-control" readOnly />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                                Email
                            </span>
                            <input value={dataUser?.email} type="text" className="form-control" />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                                PassWord
                            </span>
                            <input value={1234556778} type="password" className="form-control" />
                        </div>
                    </div>

                    <div>
                        <button onClick={handleShow} type="button" className="btn btn-primary">
                            Thay Đổi Thông Tin
                        </button>
                    </div>
                </main>
            </div>
            <ModalEditUser show={show} setShow={setShow} />
        </div>
    );
}

export default InfoUser;
