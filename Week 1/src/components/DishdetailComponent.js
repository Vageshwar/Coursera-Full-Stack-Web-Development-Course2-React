import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardText, CardBody } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    renderDish(dish){

        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg   src={dish.image} alt={dish.name}/>
                    <CardTitle >{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </Card>
            </div>
        );
        
    }
    renderComment(comments){
        
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
                </div>

            );
        }else{
            return(<div></div>);
        }
    }

    render() {
        const dish = this.props.dish;

        if (dish!=null){
            return(
            <div className="row">
                {this.renderDish(dish)}
                {this.renderComment(dish.comments)}
            </div>
                
            );
        }else{
            return(<div></div>);
        }
    }
}

export default DishDetail;