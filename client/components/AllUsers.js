import React, {Component} from 'react'
import Axios from 'axios'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {Container, Card, Button, Row, Col, Form} from 'react-bootstrap'
import {fetchUsers} from '../store/allusers'

export class AllUsers extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUsersFromServer()
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            {this.props.users
              ? this.props.users.map(user => (
                  <Col key={user.id} xs={12} sm={6}>
                    <Card style={{width: '18rem'}}>
                      <Card.Img variant="top" src={user.imgURL} />
                      <Card.Body>
                        <Card.Title><Link to={`/users/${user.id}`}>{user.firstName} {user.lastName}
                        </Link></Card.Title><br/>
                        <Card.Text>{user.phoneNumber}</Card.Text><br/>
                        <Card.Text>{user.userType}</Card.Text><br/>
                        <Card.Text>{user.email}</Card.Text><br/>
                        <Card.Text>{user.googleId}</Card.Text><br/>
                      </Card.Body>
                    </Card>{' '}
                  </Col>
                ))
              : 'No Users!'}
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}
