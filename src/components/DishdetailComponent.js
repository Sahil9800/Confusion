import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
class Dishdetail extends Component {
            renderDish(dish) {
                if(dish != null) {
                    return(
                        <div className="col-12 col-md-5 m-1">
                        <Card>
                           <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                           <CardBody>
                              <CardTitle>{this.props.dish.name}</CardTitle>
                              <CardText>{this.props.dish.description}</CardText>
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

            renderComments(comments) {
                if(comments!= null) {
                    const commentListItem = comments.map((komment) => {
                        return(
                            <li key={komment.id}>
                                <p>{komment.comment}</p>
                                <p>-- {komment.author},
                                {komment.date}</p>
                            </li>
                        );
                    });
                    return(
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <ul className="list-unstyled">
                                {commentListItem}
                            </ul>
                        </div>
                    );
                }
                else{
                    return(
                        <div></div>
                    );
                }
            }
        
            render() {
              if(this.props.dish!= null){
                return(
                   <div className='container'>
                       <div className= 'row'>
                           {this.renderDish(this.props.dish)}
                           {this.renderComments(this.props.dish.comments)}
                       </div>
                   </div>
                );
              }
              else {
                  return(<div></div>);
              }
            }



}
export default Dishdetail;