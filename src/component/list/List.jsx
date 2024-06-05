/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Suspense } from 'react';
import './List.css';


const LazyComponent = React.lazy(() =>
    import('../project/project'));

const List = ({ modifyChoices }) => {
    const [listItems, setListItems] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchData();
        window.addEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        if (
            Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
            isFetching
        )
            return;
        setIsFetching(true);
    };

    const fetchData = async () => {
        setTimeout(async () => {
            console.log('START FETCHING...');
            try {
                // const result = await fetch('http://localhost:8000/api/projects?page=' + page + '&limit=50', {
                const result = await fetch('/api/projects?page=' + page + '&limit=50', {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
                const data = await result.json();
                setPage(page + 1);
                setListItems(() => {
                    console.log('FETCH is completed!')
                    return [...listItems, ...data];
                });
            }
            catch (err) {
                console.error('FETCH is in ERROR!', err)
            }
        }, 1000);
    };

    useEffect(() => {
        if (!isFetching) {
            return;
        }
        fetchMoreListItems();
    }, [isFetching]);

    const fetchMoreListItems = () => {
        fetchData();
        console.log('FETCH another packet of PROJECTS page:', page)
        setIsFetching(false);
    };

    return (
        <>
            <div className='container' >
                {listItems.length > 0
                    && listItems.map((listItem) => (
                        <div className='card' key={listItem.id} >
                            <div className='hover:grow'>
                                <Suspense fallback={< img src='/images/placeholder.png' alt='project' />}>
                                    <LazyComponent project={listItem} modifyChoices={modifyChoices} />
                                </Suspense>
                            </div>
                        </div>
                    ))
                }
                { listItems.length === 0
                    && <div className="">
                        Fetching more PROJECTS...
                    </div>
                }
                {isFetching && <div><h1>Fetching more PROJECTS...</h1></div>}
            </div>
        </>
    );
};

export default List;