import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';


    function RenderComments({dish}) {
        if (dish != null){
            return(
                    <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <ul className="list-unstyled">
                                {dish.comments.map((dish) => {
                                return(
                                <li key={dish.id}>
                                    <p>{dish.comment}</p>
                                        <div>
                                            <p>--{dish.author}</p>
                                            {` , `}
                                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(dish.date)))}
                                        </div> 
                                </li>
                                );
                                })}
                            </ul>
                    </div>
            );
        }else
            return(
                <div></div>
            );
    }


    function RenderDish({dish}) {
        if (dish != null)
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

    const  DishDetail = (props) => {

        const dish = props.dish;
        if (dish!= null){
            return (
                <div className="container">
                    <div className="row">
                        <RenderDish dish={dish} />
                        <RenderComments dish={dish} />
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