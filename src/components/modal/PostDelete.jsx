import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiInstance } from '../../api/apiInstance';

function PostDelete({ toggleModal, postId }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const handleModalClose = () => {
    toggleModal();
  };
  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        toggleModal();
      }
    };
    document.addEventListener('mousedown', handleOutSideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutSideClick);
    };
  }, [modalRef, toggleModal]);

  const deletePost = async () => {
    try {
      await apiInstance.delete(`/article/${postId}`);
      navigate('/main');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  return (
    <div className="fixed left-0 top-0 z-[100] flex size-full flex-col items-center justify-center bg-black bg-opacity-70">
      <div ref={modalRef} className="flex h-[30rem] w-[52rem] flex-col items-center bg-white">
        <div className="mt-8 flex flex-col">
          <p>정말 삭제하시겠습니까?</p>
          <div>
            <button aria-label="post delete button" onClick={deletePost}>
              삭제
            </button>
            <button aria-label="delete cancel button" onClick={toggleModal}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDelete;
