import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Button, Label, Col, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            isModalOpen: false
        }

        this.handleSubmit=this.handleSubmit.bind(this);
        this.toggleModal=this.toggleModal.bind(this);

    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });        
    } 
    render() {   
        return(
           <React.Fragment> 
                <div className="col-12 col-md-5 m-1">
                    <Button outline onClick={this.toggleModal} >
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                </div>

             <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader  toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group m-1">
                                <Label htmlFor="rating">Rating</Label> 
                                <Control.select model=".rating" name="rating" className="form-control" >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group m-1">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author" placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors className="text-danger" model=".author" show="touched" 
                                        messages={{
                                            required: "Required,",
                                            minLength: "Must be greater than 2 characters,",
                                            maxLength: "Must be 15 characters or less"
                                        }} 
                                    />                                
                            </Row>
                            <Row className="form-group m-1">
                                <Label htmlFor="comment" >Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6"
                                        className="form-control" />
                            </Row>                            
                            <Row className="form-group m-1">
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                            </Row>
                </LocalForm>                
                </ModalBody>
             </Modal>
            </React.Fragment>
    
           
        )   
}
}

    function RenderDish({dish}) {
                if(dish != null) {
                    return(
                        <div className="col-12 col-md-5 m-1">
                        <Card>
                           <CardImg width="100%" src={dish.image} alt={dish.name} />
                           <CardBody>
                              <CardTitle>{dish.name}</CardTitle>
                              <CardText>{dish.description}</CardText>
                           </CardBody>
                        </Card>
                        </div>
                    );
                }
                else{
                    return(
                        <div></div>
                    );
                }
            }

          function RenderComments({comments, addComment, dishId}) {
                if(comments!= null) {
                    const commentListItem = comments.map((komment) => {
                        return(
                            <div>
                            <li key={komment.id}>
                                <p>{komment.comment}</p>
                                <p>-- {komment.author},
                                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(komment.date)))}</p>
                            </li>
                            </div>
                        );
                    });
                    return(
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <ul className="list-unstyled">
                                {commentListItem}
                            </ul> 
                            <CommentForm dishId={dishId} addComment={addComment} />                           
                        </div>
                    );
                }
                else{
                    return(
                        <div></div>
                    );
                }
            }
        
            const Dishdetail = (props) => {
              if(props.dish!= null){
                return(
                 <div className='container'>
                   <div className="row">
                         <Breadcrumb>
                             <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                         </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                    </div>
                  </div>                       
                       <div className= 'row'>
                           <RenderDish dish= {props.dish} />
                           <RenderComments comments= {props.comments} addComment={props.addComment} dishId={props.dish.id} />
                       </div>
                   </div>
                );
              }
              else {
                  return(<div></div>);
              }
            }

export default Dishdetail;