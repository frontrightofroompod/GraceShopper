import React, {Component} from 'react'
import Axios from 'axios'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {Container, Card, Button, Row, Col, Form} from 'react-bootstrap'
import {fetchBeers, removeBeerFromServer} from '../store/allbeers'
import {fetchCurrentUser} from '../store/currentUser'

class AllBeers extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchBeersFromServer()
    this.props.setUser()
  }

  render() {
    const {currentUser, deleteBeer, user} = this.props
    return (
      <div>
        <Container>
          <Row>
            {this.props.beers
              ? this.props.beers.map(beer => (
                  <Col key={beer.id} xs={12} sm={6} md={4} lg={3}>
                    <Card>
                      <Card.Img
                        className="thumbNail"
                        variant="top"
                        src={beer.imgURL}
                      />
                      <Card.Body>
                        <Card.Title>{beer.title}</Card.Title>
                        <Card.Text>
                          abv: {beer.abv + '%'}
                          <br />
                          ibu: {beer.ibu + '%'}
                        </Card.Text>
                        <Button variant="primary"> See Beer</Button>
                        {user && user.userType === 'admin' ? (
                          <Button
                            onClick={() => deleteBeer(beer.id)}
                            variant="danger"
                          >
                            {' '}
                            Delete
                          </Button>
                        ) : (
                          ''
                        )}
                      </Card.Body>
                    </Card>{' '}
                  </Col>
                ))
              : 'No Beers!'}
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    beers: state.beers,
    currentUser: state.currentUser,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBeersFromServer: () => dispatch(fetchBeers()),
    deleteBeer: id => dispatch(removeBeerFromServer(id)),
    setUser: () => dispatch(fetchCurrentUser())
  }
}

export const ConnectedAllBeers = connect(mapStateToProps, mapDispatchToProps)(
  AllBeers
)
