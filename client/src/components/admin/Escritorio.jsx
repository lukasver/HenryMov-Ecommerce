import React from 'react';
import './Escritorio.css';
import './Panel.css';
import { Link } from 'react-router-dom';

export default function Escritorio() {

    return (
        <div className="col-md-10 panel-right descktop">
            <Link className="link-admin" to={'/'}>
                <img id="logoDescktop" src="http://localhost:3000/static/media/logoHenry.52bea35a.png" className="d-inline-block align-top" alt="Volver a la Pagina Principal" />
            </Link>
        </div>
    )
}