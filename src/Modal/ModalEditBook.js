import request from '../config/Connect';
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalEditBook({ showModalEditBook, setShowModalEditBook, idBook }) {
    const handleClose = () => setShowModalEditBook(false);

    const [masach, setMasach] = useState('');
    const [tensach, setTensach] = useState('');
    const [tacgia, setTacgia] = useState('');
    const [nhaxuatban, setNhaxuatban] = useState('');
    const [namxb, setNamxb] = useState('');
    const [soluong, setSoluong] = useState(Number);
    const [phienban, setPhienban] = useState('');
    const [danhmuc, setDanhmuc] = useState('');
    const [mota, setMota] = useState('');
    const [ngaycapnhat, setNgaycapnhat] = useState('');

    const handleEditBook = async () => {
        try {
            const res = await request.post('/api/editbook', {
                id: idBook,
                masach,
                tensach,
                tacgia,
                nhaxuatban,
                namxb,
                soluong,
                phienban,
                danhmuc,
                mota,
                ngaycapnhat,
            });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <Modal show={showModalEditBook} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setMasach(e.target.value)}
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Mã Sách</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setTensach(e.target.value)}
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Tên Sách</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setTacgia(e.target.value)}
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Tác Giả</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setNhaxuatban(e.target.value)}
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Nhà xuất bản</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setPhienban(e.target.value)}
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Phiên bản</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setDanhmuc(e.target.value)}
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Danh Mục</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setNamxb(e.target.value)}
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Năm xuất bản</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setMota(e.target.value)}
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Mô Tả</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setSoluong(e.target.value)}
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Số Lượng</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            onChange={(e) => setNgaycapnhat(e.target.value)}
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label htmlFor="floatingInput">Ngày Cập Nhật</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleEditBook}>
                        Lưu Lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditBook;
