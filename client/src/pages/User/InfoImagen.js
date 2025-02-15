﻿import React from "react";
import {Link, Redirect} from 'react-router-dom'
import axios from "axios";

//Antd
import 'antd/lib/notification/style/css'
import {notification} from 'antd'
import {SmileOutlined} from '@ant-design/icons'

export default class infoImagen extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            image: '',
            imageDelete: false,
        }
        this.handleDelete=this.handleDelete.bind(this)
    }
    loadImage() {
        axios.get(`http://localhost:4000/image/${this.props.match.params.id}`, {
            params:{
                id: this.props.match.params.id
            }
        }).then((response) => {
            this.setState({
                image: response.data
            })
        }).catch((error) => {
            console.log(error);
        })
    }
    componentDidMount() {
        this.loadImage()
    }
    
    handleDelete(e){
        e.preventDefault();
        axios.get(`http://localhost:4000/image/${this.props.match.params.id}/delete`, {
            params:{
                id: this.props.match.params.id,
            }
        }).then(async (response) => {
            notification.open({
                icon: <SmileOutlined rotate={180} />,
                message: 'Éxito',
                description: 'La imagen fue eliminada correctamente'
            })
            await this.setState({
                imageDelete: response.data
            })
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }
  
    render() {
        
        return(
            <div className="p-5">
                <div className="card" style={{width: "18rem"}}>
                    <img src={this.state.image.path} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{this.state.image.title}</h5>
                            <a onClick={this.handleDelete} className="btn btn-danger">Delete</a>
                        </div>
                    {
                        this.state.imageDelete? <Redirect to={'/'}/>:null
                    }
                </div>
            </div>
        )
    }
}