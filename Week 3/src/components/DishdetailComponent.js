import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText,Breadcrumb, BreadcrumbItem ,Button,Modal, ModalHeader, ModalBody,Label,Col,Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            isModalOpen: false,
            rating: "",
            author: "",
            comment: ""
        }
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.toggleModal();
    }

    render(){
        return (
        <div>
           <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="name">Rating</Label>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                         </Row>
                         <Row className="form-group">
                            <Col>
                            <Label htmlFor="name">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                            </Col>
                            
                         </Row>
                         <Row className="form-group">
                            <Col>
                            <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model="..comment" id="comment" name="comment" rows="6"
                                        className="form-control"
                                        validators={{required}}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required'
                                        }}
                                    />
                            </Col>
                            
                         </Row>
                         <Row>
                            <Col>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </Col>
                         </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
        );
    }
}

    function RenderDish({dish}){
        return(
                <Card>
                    <CardImg   src={dish.image} alt={dish.name}/>
                    <CardTitle> {dish.name} </CardTitle>
                    <CardText>{dish.description}</CardText>
                </Card>
        );
        
    }
    function RenderComments({comments}){
        
        if(comments!=null){
            const com = comments.map((comment) => {
                return(     
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit"
                        }).format(new Date(Date.parse(comment.date)))}
                        </p>
                    </li>
                );
            });
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {com}
                    </ul>
                    <CommentForm></CommentForm>
                </div>

            );
        }else{
            return(<div></div>);
        }
    }

    const DishDetail = (props) => {
        if (props.dish!=null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        }else{
            return(<div></div>);
        }
    }


export default DishDetail;