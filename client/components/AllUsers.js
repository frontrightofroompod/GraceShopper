import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Card, Button, Row, Col} from 'react-bootstrap'
import {fetchUsers} from '../store/allUsers'
import {Link} from 'react-router-dom'

class AllUsers extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUsersFromServer()
  }

  render() {
    const {users} = this.props
    return (
      <div>
        <Container>
          <Row>
            {users
              ? users.map(user => (
                  <Col key={user.id}>
                    <Card>
                      <Row>
                        <Col xs={4}>
                          <Link to={`users/${user.id}`}>
                            <Card.Img
                              className="cardImg"
                              variant="top"
                              src={user.imgURL}
                            />
                          </Link>
                        </Col>
                        <Col xs={8}>
                          <Card.Body>
                            <Card.Title>
                              {user.firstName} {user.lastName}
                            </Card.Title>
                            <Card.Text>
                              {user.email}
                              <br />
                              {user.userType}
                            </Card.Text>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))
              : 'No users!'}
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

const mapDispatchToProps = dispatch => {
  return {
    fetchUsersFromServer: () => dispatch(fetchUsers())
  }
}

export const ConnectedAllUsers = connect(mapStateToProps, mapDispatchToProps)(
  AllUsers
)
