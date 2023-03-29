import React, { useState } from 'react'
import DomainIcon from '@mui/icons-material/Domain';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import ReactPaginate from "react-paginate";
const ExchangeList = () => {
    const [exchangeData, setExchageData] = useState();
    const [limit, setLimit] = useState("10");
    const [searchData, setSearchData] = useState();
    const [pageCount, setpageCount] = useState();
    const [limitNumber, setLimitNumber] = useState(0);
    const getExchangeDetails = async () => {
        await axios.get(`http://localhost:8080/api/getExchange?page=1&size=${limit}`).then(resp => {
            let total = resp.data.count;
            setpageCount(total / +limit);
            setExchageData(resp.data.data);
        })
    }
    React.useEffect(() => {
        if (searchData) {
            axios.get(`http://localhost:8080/api/getExchange?page=1&size=${limit}&searchKey=${searchData}`).then(resp => {
                let total = resp.data.count;
                setpageCount(total / +limit);
                setExchageData(resp.data.data);
            })
        }
        else {
            getExchangeDetails();
        }
    }, [searchData]);
    const fetchComments = async (currentPage) => {
        let res;

        if (searchData) {
            res = await axios.get(
                `http://localhost:8080/api/getExchange?page=${currentPage}&size=${limit}&searchKey=${searchData}`
            );
        } else {
            res = await axios.get(
                `http://localhost:8080/api/getExchange?page=${currentPage}&size=${limit}`
            );
        }
        const data = res.data.data;
        setExchageData(data);
        const total = res.data.count;
        setpageCount(total / limit);
        let limitNum = +limit * +(currentPage - 1);
        if (currentPage === 0) {
            setLimitNumber(0);
        } else {
            setLimitNumber(limitNum);
        }

        return data;
    };
    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        const commentsFormServer = await fetchComments(currentPage);
    };


    // React.useEffect(() => {
    //     getExchangeDetails();
    // }, [0]);

    return (
        <div className=''>
            <div className='App'>
                <h2 style={{ color: "#0A0B0E" }}>Top crypto exchanges</h2>
                <h6>Compare all 190 top crypto exchanges. The list is ranked by trading volume</h6>
                <h3 className='text-primary mt-3 d-flex justify-content-center' style={{ borderBottom: "0.2rem solid primary" }}>Exchanges</h3>
                <hr style={{ marginTop: "-0.5rem" }}></hr>

            </div>
            <div className='p-2 d-flex justify-content-center my-input' style={{ border: "0.1rem solid 	#D3D3D3", height: "3rem", width: "20rem", }}>
                <DomainIcon style={{ color: "#808080" }} className='mx-3' />
                <input onChange={(e) => setSearchData(e.target.value)} className='form-control' placeholder='Find an exchange' style={{ border: "none" }} />
                <SearchIcon className='mx-3' />
            </div>
            <div className='d-flex justify-content-evenly'>
                <h6 style={{ color: "#383838" }}>Exchanges</h6>
                <h6 style={{ color: "#383838" }}>24H TRADE VOLUME</h6>
            </div>
            <hr></hr>
            <div className=''>


                {exchangeData?.map((ex, index) =>
                    <>

                        <div className='' style={{ marginLeft: "20rem !important" }}>
                            <div className='d-flex mt-4 mar' style={{ marginLeft: "10rem !important" }}>
                                <h6 className='mx-3'>{index + 1 + limitNumber}</h6>
                                {ex.icon.map(dt =>
                                    <img src={`${dt.url}`} />
                                )}

                                <h6 className='mx-3'>{ex.name}</h6>
                            </div>
                            <div className='mar1'><h6 className='mx-3 text-center' style={{ marginLeft: "10rem !important" }}> $ {ex.volume_1day_usd}</h6></div>

                            <hr></hr></div>

                    </>
                )}


            </div>
            <ReactPaginate
                // className='p-1'
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link active"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link active"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    )
}

export default ExchangeList