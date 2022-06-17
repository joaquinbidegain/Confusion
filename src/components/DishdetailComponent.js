import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors,  } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl'
import { FadeTransform, Fade, Stagger } from 'react-animation-components';




const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
      super(props);
      this.state = {
        isModalOpen: false
      };
      this.CommentModal = this.CommentModal.bind(this);
    }

    CommentModal(){
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.CommentModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    


    render(){
        return(
            <React.Fragment>
                <Button outline onClick={this.CommentModal}>
                    <span className='fa fa-pencil fa-lg'></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.CommentModal}>
                    <ModalHeader toggle={this.CommentModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" id="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Col className='mb-2' md={10}>
                                <Label htmlFor='author'> Your Name </Label>
                                <br></br>
                                <Control.text  model=".author" type="text" id="author" name="author" 
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}/>
                                <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                />
                            </Col>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={2}>Comment</Label>
                            <Col md={10}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                            </Col>
                        </Row>
                        <Button type="submit" value="submit" className="bg-primary" >Submit</Button>
                    </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}



    function RenderComments({comments, postComment, dishId}){
        if (comments != null){
            return(
                    <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <ul className="list-unstyled">
                                <Stagger in>
                                    {comments.map((dish) => {
                                    return(
                                        <Fade in>
                                            <li key={dish.id}>
                                                <p>{dish.comment}</p>
                                                    <div>
                                                        <p>--{dish.author}</p>
                                                        {` , `}
                                                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(dish.date)))}
                                                    </div> 
                                            </li>
                                        </Fade>
                                    );
                                    })}
                                </Stagger>
                                </ul>
                            <CommentForm dishId={dishId} postComment={postComment} />
                    </div>
            );
        }else{       
            return(
                <div></div>
            );
        }
    }


    function RenderDish({dish}) {
        if (dish != null){
            return(
                <div className="col-12 col-md-5 m-1">
                      <FadeTransform in 
                transformProps = {{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                        <Card>
                            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>                  
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
            );
        }
    }

    const  DishDetail = (props) => {
        if(props.isLoading){
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            );
        }else if(props.errMess){
            return(
                <div className='container'>
                    <div className='row'>
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        const dish = props.dish;
        if (dish!= null){
            return (
                <div className="container">
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/menu'>Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                {props.dish.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>{props.dish.name}</h3>
                            <hr></hr>
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} postComment ={props.postComment} dishId={props.dish.id}/>
                    </div>
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }

    
export default DishDetail;