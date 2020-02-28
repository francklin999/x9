import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import {
    Navbar,
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
    Container,
    Col,
    Form,
    Card,
    CardImg,
    CardText,
    CardBody,
    // CardLink,
    CardTitle,
    Row,
    Spinner,
    CardSubtitle
} from 'reactstrap';
import { MdSearch ,MdStar} from 'react-icons/md'

class Home extends Component {
    state = {
        carregando: false,
        estrela: []
    }


    univers = async (evento) => {
        //nao deixa carregar a pagina 
        evento.preventDefault();

        this.setState({ carregando: true });

        //pegar  o valor do input
        const form = evento.target;
        const InputGroup = form.children[0];
        const input = InputGroup.children[0];
        //pegando o valor da nossa api com desestruturação
        // const {data : seguidores} = await axios(`https://api.github.com/users/${input.value}/followers`)
        // this.setState({seguidores});
        //sem desestruturação
        // const seguidores = await axios(`https://api.github.com/users/${input.value}/followers`)
        const ky = "eoa63Odtl5yKEOjF5bh9kyQunbgahg1Gl7A3mKCN";

        const estrela = await axios(`https://api.nasa.gov/planetary/apod?date=${input.value}&api_key=${ky}`);

        this.setState({ estrela: [estrela.data, ...this.state.estrela], carregando: false });

    }

    render() {
        return (
            <>

            <Navbar color="dark">
            <Container className="d-flex justify-content-center">
                        {/* inserindo imagem aleatoria */}
                            <img 
                            className='rounded-circle border border-white mr-3'
                            width='50'
                            src='https://www.thispersondoesnotexist.com/image' alt='Pessoa Aleatoria' />
                            <span className='text-white'>
                                Logado como
                                <Link className='text-white font-weight-bold ml-3' to='/'>
                                { this.props.match.params.usuario }
                                </Link>
                            </span>
                        
            </Container>
            </Navbar>
                <Navbar
                    color="dark"
                    fixed="bottom">
                    <Container className="d-flex justify-content-center">
                        <Col xs="12" md="6">
                            <Form onSubmit={this.univers}>
                                <InputGroup>
                                    <Input type="date" />
                                    <InputGroupAddon addonType="append">
                                        <Button color="danger">
                                            {this.state.carregando ? (<Spinner color="light" size='sm' />) : (<MdSearch size="20" />)}
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Container>
                </Navbar>
                {/* loading  */}

                {this.state.carregando ?
                    (<Container className='h-100 d-flex flex-column justify-content-center align-items-center'>
                        <Spinner color='dark' size='lg' />
                        <span> Carregando...</span>
                    </Container>
                    ) : (
                        <Container className="mt-4 mb-5">
                            <Row>
                                {this.state.estrela.map((estrela) => (
                                    <Col className='d-flex' xs='12' md='4'>
                                        <Card className="text-white mb-2" color="dark">
                                            <CardImg top width="100%" height="30%" src={estrela.url} alt={estrela.title} />
                                            <CardBody>
                                                <CardTitle className="h3 text-center"> {estrela.title}</CardTitle>
                                                <CardSubtitle className="text-center text-muted">{estrela.date.split("-").reverse().join("/")}</CardSubtitle>
                                                <CardText className="text-justify">{estrela.explanation}</CardText>
                                            </CardBody>
                                        </Card>

                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    )}

                {this.state.estrela.length === 0 && (
                    <Container className='h-100 d-flex flex-column justify-content-center align-items-center'>
                        <MdStar color='#000' size='150'/>
                        <h1>Escolha uma data . . .</h1>
                    </Container>
                )}


                {/* 
                {this.state.carregando &&
                    (<Container className='h-100 d-flex flex-column justify-content-center align-items-center'>
                        <Spinner color='dark' size='lg' />
                        <span>Carregando...</span>
                    </Container>
                    )} */}

            </>
        );
    }
}
export default Home;


// <> </> <- usar este no lugar da div 