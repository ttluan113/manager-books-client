import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { jwtDecode } from 'jwt-decode';

import request from '../../../../../config/Connect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalRequestBook({ show, setShow, nameBook }) {
    const handleClose = () => setShow(false);

    const [idUser, setIdUser] = useState('');
    const [masinhvien, setMasinhvien] = useState('');

    const token = document.cookie;
    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setIdUser(decoded.id);
            setMasinhvien(decoded.masinhvien);
        }
    }, [token]);

    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');

    const handleRequestBook = async () => {
        const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(\d{4})$/;

        if (!dateRegex.test(date1) || !dateRegex.test(date2)) {
            toast.error('Vui lòng đúng ngày cấp và ngày hết hạn!');
            return;
        }
        try {
            const res = await request.post('/api/requestbookuser', {
                ngaycap: date1,
                ngayhethan: date2,
                maSinhVien: masinhvien,
                nameBook: nameBook,
            });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <ToastContainer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông Báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="form-floating mb-3">
                        <input value={idUser} class="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label for="floatingInput">ID Người Dùng</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input value={nameBook} class="form-control" id="floatingPassword" placeholder="Password" />
                        <label for="floatingPassword">Tên Sách</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input
                            class="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            onChange={(e) => setDate1(e.target.value)}
                        />
                        <label for="floatingPassword">Ngày Mượn Sách</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input
                            class="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            onChange={(e) => setDate2(e.target.value)}
                        />
                        <label for="floatingPassword">Ngày Trả Sách</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleRequestBook}>
                        Gửi Yêu Cầu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalRequestBook;
