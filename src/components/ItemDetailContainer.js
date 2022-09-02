import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import asyncGetData from "../helpers/helpdb.js";
import { useParams } from 'react-router-dom';
import ItemDetail from "./ItemDetail.js";
import Loader from "./Loader.js";
import Message from "./Message.js";

const ItemDetailContainer = () => {
    const [item, setItem] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { idItem } = useParams();

    /* console.log(`use params ${idItem}`); */

    useEffect(() => {
        setLoading(true);
        
        asyncGetData.then((resultado) => {
            const nuevaLista = resultado.find(item => {
                console.log(item.nombre);
                return item.nombre === "Celeste"
            });
            // console.log('nuevaLista',nuevaLista)
            setItem(nuevaLista);
            console.log(item.id);
            setLoading(false);
        });
        
    }, []);

    return (
        <>
            <Box w="100%" my={5}>
                <Heading>Item ItemDetailContainer</Heading>
                <ItemDetail item={item}></ItemDetail>
                {loading && <Loader></Loader>}
                {error && <Message msg={`Error : ${error.status}:${error.statusText}`}
                    bgColor="#dc3545"></Message>}
            </Box>
        </>);
}

export default ItemDetailContainer;