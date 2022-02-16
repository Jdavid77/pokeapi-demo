import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import "../styles/Card.css"


export default function(props) {
    
    return (
        <>
        <div className="outside" onClick={() => {
            props.setProps(single => ({...props.info}));
            props.setOpen(true)
            }}>
            <img className="image" src={props.info.image}/>
            <div className="info">
                <p>Name : {props.info.name[0].toUpperCase() + props.info.name.substring(1)}</p>
                <p>Height : {props.info.height}</p>
                <p>Weight: {props.info.weight}</p>
            </div>
        </div>
      </>
    )
}