import React from 'react';
import {
  Container, Row, Col, Badge,
} from 'reactstrap';
import Feed from './Feed';

class MainPage extends React.Component {
    
  state = {
    showFeed: true,
    showYellowPages: false,
    showNews: false,
  }
  feedSelected = (e) => {
    this.setState({
        showFeed: true,
        showYellowPages: false,
        showNews: false
    })
    console.log("FEED TEST");
}

showYellowPages = (e) => {
    this.setState({
        showFeed: false,
        showYellowPages: true,
        showNews: false
    })

    console.log("YP TEST");
    // this.props.stopQuestionFetchingOnMount();

}

showNews = (e) => {
    this.setState({
        showFeed: false,
        showYellowPages: false,
        showNews: true
    })
    // this.props.stopQuestionFetchingOnMount();
    console.log("NEWS TEST");
    
}
render() {
    // console.log("Main Page Render")
  return (
      <div>
          <Container>

              <Row>
                  <Col >

                      <h5 className='text-center'>
                          {this.state.showFeed ? (
                              <span className='mr-1'><Badge color="secondary" style={{ cursor: 'pointer' }} onClick={this.feedSelected}>Feed</Badge></span>

                          ) : (
                                  <span className='mr-1'><Badge color="light" style={{ cursor: 'pointer' }} onClick={this.feedSelected}>Feed</Badge></span>

                              )}
                          {this.state.showYellowPages ? (
                              <span className='mr-1'>  <Badge color="dark" style={{ cursor: 'pointer' }} onClick={this.showYellowPages}>Yellow Pages</Badge></span>

                          ) : (
                                  <span className='mr-1'>  <Badge color="light" style={{ cursor: 'pointer' }} onClick={this.showYellowPages}>Yellow Pages</Badge></span>

                              )}

                          {this.state.showNews ? (
                              <span className='mr-1'>  <Badge color="dark" style={{ cursor: 'pointer' }} onClick={this.showNews}>News</Badge></span>

                          ) : (
                                  <span className='mr-1'>  <Badge color="light" style={{ cursor: 'pointer' }} onClick={this.showNews}>News</Badge></span>

                              )}

                      </h5>

                  </Col>
              </Row>


 
              {/* {this.state.showFeed && ( */}
                  <Feed />


{/*


              {this.state.showYellowPages && (
                  <YellowPages />
              )}

              {this.state.showNews && (
                  <News />
              )} */}

          </Container>
      </div>

  )
}

}


  export default MainPage;
;