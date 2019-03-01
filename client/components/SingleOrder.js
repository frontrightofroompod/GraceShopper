import React from 'react'
import {connect} from 'react-redux'
import {Card, Button, Container, Row, Col, Image} from 'react-bootstrap'
import {
  fetchSingleOrder,
  markOneOrderAsCompleted,
  markOneOrderAsProcessing
} from '../store/singleOrder'

class SingleOrder extends React.Component {
  componentDidMount() {
    const id = parseInt(this.props.match.params.orderId, 10)
    this.props.fetchSingleOrder(id)
  }
  render() {
    const {
      singleOrder,
      onMarkOneOrderAsProcessing,
      onMarkOneOrderAsCompleted
    } = this.props

    return (
      <div>
        <Container>
          <Row>
            <Col xs={12} sm={4}>
              <Card>
                <Card.Body>
                  <Card.Text>
                    ID: {singleOrder.id}
                    <br />
                    Status: {singleOrder.status}
                    <br />
                    Phone Number: {singleOrder.phoneNumber}
                    <br />
                    Street Address: {singleOrder.streetAddress}
                    <br />
                    Zip: {singleOrder.city}
                    <br />
                    Zip: {singleOrder.zipCode}
                    <br />
                    Phone Number: {singleOrder.phoneNumber}
                    <br />
                    State: {singleOrder.state}
                    <br />
                  </Card.Text>
                </Card.Body>
                <Button
                  onClick={() =>
                    onMarkOneOrderAsProcessing({
                      id: singleOrder.id,
                      status: 'processing'
                    })
                  }
                >
                  Mark as Processing
                </Button>
                <br />
                <Button
                  onClick={onMarkOneOrderAsCompleted({
                    id: singleOrder.id,
                    status: 'completed'
                  })}
                >
                  Mark as Completed
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleOrder: state.singleOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleOrder: id => dispatch(fetchSingleOrder(id)),
    onMarkOneOrderAsProcessing: order =>
      dispatch(markOneOrderAsProcessing(order)),
    onMarkOneOrderAsCompleted: order => dispatch(markOneOrderAsCompleted(order))
  }
}

export const ConnectedSingleOrder = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleOrder)
