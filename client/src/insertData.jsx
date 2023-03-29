import React from 'react'
import "./insertData.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const InsertData = () => {
    const history = useNavigate();
    const insertData = () => {

        axios.post(`http://localhost:8080/api/addExchange`).then(resp => {
            history("/exchangeList");
        }, err => {
            console.log(err)
        })
    }
    return (
        <div className=' bg-black' style={{ height: "100vh", overflow: "hidden" }}>
            <div className='row container'>
                <div className='col-6 tea h50'>
                    <h1 className='text'> Hi !</h1>
                    <h1 className='text'> Welcome To Crypto Exchange</h1>
                    <h1 className='textChai'>@Coin_Crypto_Exchange</h1>
                </div>
                <div className='col-6 position-relative' >

                    <button onClick={() => insertData()} className='glow-button btn-lg w-25 position-absolute top-50'>INSERT DATA</button>


                </div>
            </div>

            <div></div>
        </div>
    )
}

export default InsertData