import React, { useState, useEffect } from 'react';
import MyCard from "./MyCard.js"
import {useSelector} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';


export default function CardsGrid(props) { 
  const [data, setData] = useState([]); 
  const [cargado, setCargado] = useState(1); // 0 = error, 1 = cargando, 2 = success
  const state = useSelector( state => state.filtrosAvanzados );  
  
  // const endPoint ="https://dev-oxigeno.cdmx.gob.mx/oxigeno/data";
  const endPoint = window.location.href + "data";

  useEffect(() => {
    setCargado(1)
    async function getData() {
      try {
        const dataPeticion = await axios.get(endPoint,{
          params:{
            tanqueVenta: state.tanqueVenta ? 1 : 0,
            tanqueRecarga: state.tanqueRecarga ? 1 : 0,
            tanqueRenta: state.tanqueRenta ? 1 : 0,
            concentradorVenta: state.concentradorVenta ? 1 : 0,
            concentradorRenta: state.concentradorRenta ? 1 : 0,
            pagoConTarjeta: state.tarjetaSwitch ? 1 : 0,
            aDomicilio: state.domicilioSwitch ? 1 : 0
          }
        });
        const dataBase= await dataPeticion.data;
        setData(dataBase);
        setCargado(2);
      } catch (error) {
        console.log(error)
        setCargado(0);
      }
    }
    getData();

  }, [state]);
  
  
  if( cargado === 2 ){
    return (
      <div className="tarjetas-container col-12 col-md-9" >
      { 
      data.length >0 ?
        data.map((distribuidor) =>
          <MyCard 
            key={`${distribuidor.id}`}
            distribuidor = {distribuidor}
          />
        ) :
        <div className="sinResultados">
          <div className="cajaSinResultados">
            No se encontraron resultados con estos filtros
          </div>
        </div>

      } 
      </div>
    );
  }else if( cargado === 1){
    return(
      <div className="tarjetas-container circularProgress col-12 col-md-9" >
        <CircularProgress className="circulo" size={100} />
      </div>
    )
  }else{
    return(
      <div className="tarjetas-container error col-12 col-md-9" >
        <div className="cajaError">
          Lo sentimos , hubo un error al cargar los datos (553)
        </div>
      </div>
    )
  }

}
