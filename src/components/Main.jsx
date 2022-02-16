import React, { useEffect, useState } from "react";
import "../styles/Main.css"
import Card from "./Card";
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';





export default function () {

    const [array, setArray] = useState([]);
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);
    const [single, setSingle] = useState({});
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const types = require("../types.json")


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "30vw",
        height: "50vh",
        backgroundImage: "url('https://wallup.net/wp-content/uploads/2017/11/17/301412-Pokemon-748x421.jpg')",
        backgroundSize: "cover",
        border: '2px solid #000',
        borderRadius: "20px",
        boxShadow: 24,
        p: 4,
        display: "border-box"
    };



    const data = async () => {
        try {
            const info = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
                .then(res => res.json())
                .then(function (response) {
                    response.results.forEach(element => {
                        fetchPokemon(element)
                    });
                }
                )
            setLoader(true);
        } catch (e) {
            console.log(e);
        }
    }


    const fetchPokemon = async (pokemon) => {
        //console.log(pokemon.url);
        const info = await fetch(pokemon.url)
            .then(res => res.json())
            .then(res => {
                pokemon = {
                    name: res.name,
                    height: res.height,
                    weight: res.weight,
                    image: res.sprites.front_default,
                    stats: [...res.stats],
                    types: [...res.types],
                    abilities: [...res.abilities]
                }
                //console.log(pokemon);
                setArray((previous) => {
                    //console.log(res)
                    return [...previous, pokemon]
                });
            })
    }

    useEffect(() => {
        data();
    }, [])



    return (
        <>
            <div className="header">
                <h1>POKEAPI DEMO</h1>
            </div>
            <Container maxWidth="xxl">
                {loader ? (
                    <>
                        <div className="teste">
                            {array.map((elem, i) => {
                                return <Card key={i} info={elem} setOpen={setOpen} setProps={setSingle} />
                            })}
                        </div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className="modal">
                                <div className="row">
                                    <div className="photo">
                                        <img src={single.image} />
                                        <h3>Abilities: </h3>
                                        <div className="abilities">
                                            <ul>
                                                {single.abilities?.map(elem => {
                                                    return <li>{elem.ability.name}</li>
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="stats">
                                        <h1>{single.name}</h1>
                                        <h3>Types:</h3>
                                        <div className="types">
                                            {single.types?.map((elem, i) => {
                                                return <p key={i} style={{
                                                    backgroundColor: types.hasOwnProperty(elem.type.name) ? types[elem.type.name] : "white",
                                                    color: "white",
                                                    padding: "10px",
                                                    border: "groove 2px rgba(255, 255, 255,0.5)",
                                                    borderRadius: "10px",
                                                    textAlign: "center",
                                                    textShadow: "2px 2px black"
                                                }}>{elem.type.name}</p>
                                            })}
                                        </div>
                                        <h3>Stats:</h3>
                                        <div className="individual_stats">
                                            <ul>
                                                {single.stats?.map((elem, i) => {
                                                    return <li key={i} className="font">{elem.stat.name} : {elem.base_stat}</li>
                                                })}
                                            </ul>

                                        </div>

                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </>
                ) :
                    (
                        <div className="loader">
                            <img className="logo" src="https://media4.giphy.com/media/cVi6vx0zQKVzcptKyo/giphy.gif?cid=ecf05e47jr0o90m2w02pjrtzbja163weevsyq36xcy5vls45&rid=giphy.gif&ct=s" />
                        </div>
                    )}
            </Container>
        </>
    )
}