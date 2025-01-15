import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import request from '../../../../../config/Connect';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalSuccessCart({ show, setShow, id }) {
    const handleClose = () => setShow(false);

    const [date1, setDate1] = useState('');
    const [idthe, setIdthe] = useState('');

    const handleSuccessCart = () => {
        const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(\d{4})$/;

        if (!dateRegex.test(date1)) {
            toast.error('Vui lòng nhập đúng ngày tháng năm!');
            return;
        }
        request
            .post('/api/editcart', {
                ngayhethan: date1,
                idthe: idthe,
                id: id,
            })
            .then((res) => toast.success(res.data.message));
        window.location.reload();
    };

    return (
        <>
            <ToastContainer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Duyệt Thẻ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setDate1(e.target.value)}
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Ngày Hết Hạn</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setIdthe(e.target.value)}
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Mã Thẻ</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleSuccessCart}>
                        Lưu Lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalSuccessCart;
