import React from 'react';
import Imagen from './Imagen';


const ListadoImagenes = ({list}) => {
    return (
        <div className="col-12 p-5 row">
            {
                list.map(item => <Imagen image={item} key={item.id}/>)
            }
        </div>
    )
}
 
export default ListadoImagenes;