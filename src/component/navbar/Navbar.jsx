import React, { useState } from 'react';
import { MenuIcon, FavouriteOn, CancelIcon } from '../image/WIMicons';
import './Navbar.css';
import Modal from '../Modal/Modal';

const firmName = <div className=""
    style={{ marginTop: 'auto', marginLeft: '1.5rem' }}>
    <span style={{ fontSize: 'xx-large', textColor: 'white' }}>WIM projects</span>
</div>;

function Button({ onClick, children }) {
    return (
      <button onClick={e => {
        e.stopPropagation();
        onClick();
      }}>
        {children}
      </button>
    );
  }

  const ShowFavourites = () => {
    let persistent = window.localStorage.getItem('projects_favourite')
    if (!persistent) {
        return <div>No Favourites found</div>
    } else {
        persistent = JSON.parse(persistent)
    }
    return (
        <>
            {
                persistent.map((value, idx) => (
                    < div key={value.id} style={{ margin: '0 0 20px 0' }}>
                        <FavouriteOn />
                        <span style={{ margin: '1rem' }}>{value.title}</span>
                        <Modal childToParent={value}/>
                    </div >
                ))
            }
        </>
    );
};

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="nav">
                <div className="nav-pointer"
                    onClick={() => setOpen(!open)}
                >
                    {open?<CancelIcon />:<MenuIcon />}
                </div>
                {firmName}
            </nav>
            <nav className="nav-mobile">
                <div>
                    <div className="favourite-scroll" style={{ display: open ? "block" : "none" }} >
                        <img src='/images/like.png' className="like-icon" alt='like-icon' />
                        <div className="favourite">
                            <span>Favourites</span>
                            <span>The list of your preferred PROJECTS</span>
                        </div>
                        <hr />
                        <div>
                            <ShowFavourites />
                        </div>
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Navbar;
