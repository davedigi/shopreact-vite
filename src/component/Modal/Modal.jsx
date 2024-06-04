import React, { useState } from "react";
import "./Modal.css";
import ImageComponent from '../image/image';

export default function Modal(value) {
  
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
      setModal(!modal);
    };

    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
  
    return (
      <>
        <button onClick={toggleModal} className="btn-modal">
          Show project
        </button>
  
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
                <div className="project">

                    <ImageComponent width='30%' src='/images/placeholder.png' alt='project' />
                    <div className='detail'>
                        <h4>{value.childToParent["projectn"]}</h4>
                        <h3>{value.childToParent["title"]}</h3>
                        <h5>{value.childToParent["category"]}</h5>
                    </div>
                </div>
              <button className="close-modal" onClick={toggleModal}>
                CLOSE
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
