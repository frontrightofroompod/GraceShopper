import React, {Component} from 'react'
import Axios from 'axios'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {Container, Card, Button, Row, Col, Form} from 'react-bootstrap'
import {fetchBeers} from '../store/allbeers'
import {fetchCategories} from '../store/categories'

class AllBeers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSearch: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({currentSearch: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.fetchBeersFromServer(`tag=${this.state.currentSearch}`)
  }

  componentDidMount() {
    this.props.fetchBeersFromServer()
    this.props.fetchCategoriesFromServer()
  }

  render() {
    return (
      <div>
        <h4>Search by category:</h4>
        <form onSubmit={this.handleSubmit}>
          <select onChange={this.handleChange}>
            {this.props.categories ? (
              this.props.categories.map(category => (
                <option value={category.tag}> {category.tag}</option>
              ))
            ) : (
              <option value="none">No categories loaded</option>
            )}
          </select>
          <input type="submit" value="submit" />
        </form>
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
                      </Card.Body>
                    </Card>
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
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBeersFromServer: (search = '') => dispatch(fetchBeers(search)),
    fetchCategoriesFromServer: () => dispatch(fetchCategories())
  }
}

export const ConnectedAllBeers = connect(mapStateToProps, mapDispatchToProps)(
  AllBeers
)
