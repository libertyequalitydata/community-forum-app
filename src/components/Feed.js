import React, {useContext} from 'react';
import {
    Row, Col, InputGroup, Form,
    ListGroupItem, Container

} from 'reactstrap';
import {UnorderedList,ListItem, Input, Textarea  , Spacer, Button, Modal, ModalOverlay, ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,useDisclosure} from '@chakra-ui/react'
import GetQuestions from './GetQuestions';
import createQuestion from './CreateQuestion';

import { AccountContext } from "./Account";


// class Feed extends React.Component {

    
    
//     state = {
//         title: '',
//         body: '',
//         hasMoreItems: true,
//         modal: false,
//         dropdownOpen: false,
//         query: '',

//     }


//     setQuestion = (e) => {

//         this.setState({
//             [e.target.name]: e.target.value

//         })
//     }
//     submitQuestion = (e) => {
        
//         const {getUser} = useContext(AccountContext);
//         // if (getUser() != null){
//         //     const data = {
//         //         title: this.state.title,
//         //         body: this.state.body,
//         //         accountID: getUser
//         //     }
//         //     createQuestion(data)
//         // } else {
//         //     console.log("Not logged in")
//         // }
//     }
    

//     setViews = (questionid, ) => {
//     }

//     toggleModal = (e) => {
//         this.setState({
//             modal: !this.state.modal
//         })
//     }

//     handleInput = (e) => {
//             this.setState({query: e.target.value});
//     }
    
//     render() {
//     return (
//         <div>
//         <Container>


//             <Row>
//                 <Col sm='12' md='8' className='' id='list'>
//                     <Row className='mb-1'>
//                         <h1 className='h6 mr-auto text-muted'>All Questions</h1>


//                         <div>
//                             <Button onClick={this.toggleModal} className='ml-auto btn-sm' outline color="secondary">Ask Question</Button>
//                             <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
//                                 <ModalHeader toggle={this.toggleModal}>Ask Question</ModalHeader>
//                                 <ModalBody>
//                                     <ListGroupItem>
//                                         Make sure your question hasn't been asked already
//                                     </ListGroupItem>
//                                     <ListGroupItem>
//                                         Keep your question short and to the point
//                                         </ListGroupItem>
//                                     <ListGroupItem>
//                                         Double-check grammar and spelling
//                                     </ListGroupItem>

//                                     <Form>
//                                         <InputGroup className='my-2 mt-3'>
//                                             <Input placeholder="Start your question with 'What', 'How, 'Why', etc."
//                                                 name='title' value={this.state.title} onChange={this.setQuestion} />
//                                             <br/>
//                                             <textarea placeholder='Test' name='body' value={this.state.body} onChange={this.setQuestion}></textarea>

//                                         </InputGroup>


//                                     </Form>


//                                 </ModalBody>
//                                 <ModalFooter>
//                                     <Button onClick={this.submitQuestion} outline color="success">Ask</Button>{''}
//                                     <Button onClick={this.toggleModal} outline color="danger">Cancel</Button>
//                                 </ModalFooter>
//                             </Modal>
//                         </div>
//                         <div className='mx-auto container-fluid my-1'>
//                             <Form onSubmit={this.callSearch}>
//                                 <Input className='text-center'
//                                     name='searchInput'
//                                     placeholder='Search questions..'
//                                     value={this.state.searchInput}
//                                     onChange={this.handleInput}

//                                 />
//                             </Form>
//                         </div>
//                     </Row>
//                     <GetUsers query={this.state.query}/>
//                 </Col>
//             </Row>
//         </Container>



//     </div >
// )
// }
  
//   }
  
const Feed = () => {
    // console.log("Feed Rendered");
    const [title, setTitle] = React.useState('');
    const [body, setBody] = React.useState('');
    const [hasMoreItems, setHasMoreItems] = React.useState(true);
    const [modal, setModal] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [created, setCreated] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const {getUser} = useContext(AccountContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = React.useState(false);

    
    const submitQuestion = async (e) => {
        setIsLoading(true)
        
        
        // const {getUser} = useContext(AccountContext);

        if (getUser() != null){
            
            console.log(getUser())
            const data = {
                title: title,
                body: body,
                accountID: getUser()
            }
            console.log(data)
            await createQuestion(data)
            setCreated(!created)
            setTitle("")
            setBody("")
        } else {
            console.log("Not logged in")
        }
        setIsLoading(false)
    }
    

    const setViews = (questionid, ) => {
    }

    const toggleModal = e => {
        setModal(!modal);
    }

    return (
        <div>
        <Container>


            <Row>
                <Col sm='12' md='8' className='' id='list'>
                    <Row className='mb-1'>
                        <h1 className='h6 mr-auto text-muted'>All Questions</h1>


                        <div>
                            <Button onClick={onOpen} className='ml-auto btn-sm' outline color="secondary">Ask Question</Button>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay/>
                                <ModalContent>
                                    <ModalHeader>Ask Question</ModalHeader>
                                    <ModalBody>
                                    <UnorderedList>
                                    <ListItem>
                                        Make sure your question hasn't been asked already
                                    </ListItem>
                                    <ListItem>
                                        Keep your question short and to the point
                                        </ListItem>
                                    <ListItem>
                                        Double-check grammar and spelling
                                    </ListItem>
                                    </UnorderedList>


                                    <Form>
                                        <InputGroup className='my-2 mt-3'>
                                            <Input placeholder="Start your question with 'What', 'How, 'Why', etc."
                                                name='title' value={title} onChange={(event)=> setTitle(event.target.value)}/>
                                            <br/>
                                            <Textarea placeholder='Test' name='body' value={body} onChange={(event)=> setBody(event.target.value)}></Textarea>

                                        </InputGroup>


                                    </Form>


                                </ModalBody>
                                
                                {/* <Flex> */}
                                <ModalFooter>
                                {/* <Spacer/> */}
                                    <Button onClick={(event) => submitQuestion(event)} colorScheme="green" isLoading={isLoading}>Ask</Button>{''}
                                    <Spacer/>
                                    <Button onClick={onClose} colorScheme="red" isDisabled={isLoading}>Cancel</Button>
                                    
                                </ModalFooter>
                                {/* </Flex> */}
                                </ModalContent>
                                
                            </Modal>
                        </div>
                        <div className='mx-auto container-fluid my-1'>
                            <Form >
                                <Input className='text-center'
                                    name='searchInput'
                                    placeholder='Search questions..'
                                    value={query}
                                    onChange={(event)=> setQuery(event.target.value)}

                                />
                            </Form>
                        </div>
                    </Row>
                    <GetQuestions query={query} createdQuestion={created}/>
                </Col>
            </Row>
        </Container>



    </div >
)
}

  
export default Feed;