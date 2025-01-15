import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import request from '../config/Connect';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalDeleteUser({ showModalDeleteUser, setShowModalDeleteUser, idUser }) {
    const handleClose = () => setShowModalDeleteUser(false);

    const handleDeleteBook = async () => {
        try {
            const res = await request.post('/api/deleteuser', { id: idUser });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <Modal show={showModalDeleteUser} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Xóa Người Dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn muốn xóa Người Dùng Có ID : {idUser}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleDeleteBook}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;
