import React from 'react';
import {
    Row, Col, InputGroup, Input, Button, Form,
    ListGroupItem, Container, Modal, ModalHeader, ModalBody, ModalFooter,

} from 'reactstrap';
import GetUsers from './GetQuestions';
import createQuestion from './CreateQuestion';



class Feed extends React.Component {
    
    state = {
        title: '',
        body: '',
        hasMoreItems: true,
        modal: false,
        dropdownOpen: false,
        query: '',

    }


    setQuestion = (e) => {

        this.setState({
            [e.target.name]: e.target.value

        })
    }
    submitQuestion = (e) => {
        const data = {
            title: this.state.title,
            body: this.state.body
        }
        createQuestion(data)
    }

    setViews = (questionid, ) => {
    }

    toggleModal = (e) => {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleInput = (e) => {
            this.setState({query: e.target.value});
    }


    
    


  render() {
    return (
        <div>
        <Container>


            <Row>
                <Col sm='12' md='8' className='' id='list'>
                    <Row className='mb-1'>
                        <h1 className='h6 mr-auto text-muted'>All Questions</h1>


                        <div>
                            <Button onClick={this.toggleModal} className='ml-auto btn-sm' outline color="secondary">Ask Question</Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggleModal}>Ask Question</ModalHeader>
                                <ModalBody>
                                    <ListGroupItem>
                                        Make sure your question hasn't been asked already
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Keep your question short and to the point
                                        </ListGroupItem>
                                    <ListGroupItem>
                                        Double-check grammar and spelling
                                    </ListGroupItem>

                                    <Form>
                                        <InputGroup className='my-2 mt-3'>
                                            <Input placeholder="Start your question with 'What', 'How, 'Why', etc."
                                                name='title' value={this.state.title} onChange={this.setQuestion} />
                                            <br/>
                                            <textarea placeholder='Test' name='body' value={this.state.body} onChange={this.setQuestion}></textarea>

                                        </InputGroup>


                                    </Form>


                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={this.submitQuestion} outline color="success">Ask</Button>{''}
                                    <Button onClick={this.toggleModal} outline color="danger">Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                        <div className='mx-auto container-fluid my-1'>
                            <Form onSubmit={this.callSearch}>
                                <Input className='text-center'
                                    name='searchInput'
                                    placeholder='Search questions..'
                                    value={this.state.searchInput}
                                    onChange={this.handleInput}

                                />
                            </Form>
                        </div>
                    </Row>
                    <GetUsers query={this.state.query}/>
                </Col>
            </Row>
        </Container>



    </div >
)
}
  
  }
  
  
export default Feed;