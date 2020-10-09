import React from 'react';
import './AddProduct.css'

export default function AddProduct() {
    return (
        <div className="container navbar-dark bg-secondary">
            <h2>Agregar producto</h2>
            <div className="row">
                <div className="col-sm-6">
                    <form method="POST" action="/product/">
                        <div className="form-group">
                            <label for="Name">Titulo</label>
                            <input type="text" id="Name" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label for="Name">Precio</label>
                            <input type="text" id="Email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label for="City">Cantidad</label>
                            <select id="City" className="form-control">
                                <option value="New Delhi">1</option>
                                <option value="Mumbai">2</option>
                                <option value="Mumbai">3</option>
                                <option value="Mumbai">4</option>
                                <option value="Mumbai">5</option>
                                <option value="Mumbai">6</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="Message">Descripcion</label>
                            <textarea id="Message" className="form-control" />
                        </div>
                       
                            <div class="file-field">
                                <a class="btn-floating peach-gradient mt-0 float-left">
                                    <i class="fas fa-paperclip" aria-hidden="true"></i>
                                    <input type="file" />
                                </a>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" placeholder="Upload your file" />
                                </div>
                            </div>
                       
                            <div class="file-field">
                                <a class="btn-floating blue-gradient mt-0 float-left">
                                    <i class="far fa-heart" aria-hidden="true"></i>
                                    <input type="file" />
                                </a>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" placeholder="Upload your file" />
                                </div>
                            </div>
                     
                            <div class="file-field">
                                <a class="btn-floating purple-gradient mt-0 float-left">
                                    <i class="fas fa-cloud-upload-alt" aria-hidden="true"></i>
                                    <input type="file" />
                                </a>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" placeholder="Upload your file" />
                                </div>
                            </div>
                       
                        <div className="form-group">
                            <br/>
                            <button className="btn btn-primary">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


