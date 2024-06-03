import React, { useState } from 'react';
import { MenuIcon, FavouriteOn } from '../image/WIMicons';
import './Navbar.css';

const firmName = <div className=""
    style={{ marginTop: 'auto', marginLeft: '1.5rem' }}>
    <span style={{ fontSize: 'xx-large', textColor: 'white' }}>WIM projects</span>
</div>;

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
                    < div key={value.id} style={{ margin: 'auto' }}>
                        <FavouriteOn />
                        <span style={{ margin: '1rem' }}>{value.title}</span>
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
                <div
                    style={{ 'marginTop': 'auto' }}
                    onClick={() => setOpen(!open)}
                >
                    <MenuIcon />
                </div>
                {firmName}
            </nav>
            <nav className="nav-mobile">
                <div>
                    <div className="favourite-scroll" style={{ display: open ? "block" : "none" }} >
                        <img src='/images/like.png' className="mobile-logo" alt='mobile logo' />
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
