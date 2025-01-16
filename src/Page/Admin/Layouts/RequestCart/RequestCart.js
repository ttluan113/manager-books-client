import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RequestCart.module.scss';

import request from '../../../../config/Connect';
import ModalSuccessCart from './Modal/ModalSuccessCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function RequestCart() {
    const [dataCart, setDataCart] = useState([]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState('');
    const [valueSearch, setValueSearch] = useState('');

    const fetchData = async () => {
        request.get('/api/getcart').then((res) => setDataCart(res.data));
    };

    useEffect(() => {
        fetchData();
    }, [show]);

    const handleShow = (idUser) => {
        setShow(!show);
        setId(idUser);
    };

    const handleThuHoiThe = async (id) => {
        const res = await request.post('/api/thuthe', { id });
        fetchData();
        toast.success(res.data.message);
    };

    useEffect(() => {
        request.get('/api/searchuser', { params: { valueSearch } }).then((res) => setDataCart(res.data));
    }, [valueSearch]);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <h4>Quản Lý Thẻ</h4>
                <form class="d-flex">
                    <input
                        class="form-control me-2"
                        type="search"
                        placeholder="tìm theo mã sinh viên"
                        aria-label="Search"
                        onChange={(e) => setValueSearch(e.target.value)}
                    />
                </form>
            </div>
            <table className="table">
                <ToastContainer />

                <thead>
                    <tr>
                        <th scope="col">Mã Sinh Viên</th>
                        <th scope="col">Mã Thẻ</th>
                        <th scope="col">Ngày Cấp</th>
                        <th scope="col">Ngày Hết Hạn</th>
                        <th scope="col">Trạng Thái Thẻ</th>
                        <th scope="col">Hành Động</th>
                    </tr>
                </thead>

                <tbody>
                    {dataCart.map((item) => (
                        <tr key={item._id}>
                            <th scope="row">{item.masinhvien}</th>
                            <th scope="row">{item.idthe}</th>
                            <td>{item.ngaycap}</td>
                            <td>{item.ngayhethan}</td>
                            <td>
                                {item.tinhtrang ? (
                                    <>
                                        <FontAwesomeIcon style={{ color: 'green' }} icon={faCheck} />
                                        <span style={{ paddingLeft: '10px' }}>Active</span>
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />
                                        <span style={{ paddingLeft: '10px', color: 'red' }}>Đang Xử Lý</span>
                                    </>
                                )}
                            </td>
                            <td>
                                {item.tinhtrang ? (
                                    <>
                                        <button
                                            onClick={() => handleThuHoiThe(item._id)}
                                            type="button"
                                            className="btn btn-danger"
                                        >
                                            Thu Hồi Thẻ
                                        </button>
                                        <button
                                            onClick={() => handleShow(item._id)}
                                            type="button"
                                            className="btn btn-warning"
                                        >
                                            Sửa Thẻ
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleShow(item._id)}
                                            type="button"
                                            className="btn btn-primary"
                                        >
                                            Duyệt
                                        </button>
                                        <button
                                            onClick={() => handleThuHoiThe(item._id)}
                                            type="button"
                                            className="btn btn-danger"
                                        >
                                            Hủy
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <ModalSuccessCart show={show} setShow={setShow} id={id} />
            </table>
        </>
    );
}

export default RequestCart;
