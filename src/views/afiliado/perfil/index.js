import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    FormGroup,
    Row,
    Col,
    Input,
    Form,
    Button,
    Label,
    Alert,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    Badge,
    CardText
} from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import api from './../../../api'
import { useParams } from 'react-router-dom'
import { AlignJustify, Rss, Info, Image, Users, Edit } from 'react-feather'

const opcaoTipo = [
    { value: 'Delivery', label: 'Delivery' },
    { value: 'Presencial', label: 'Presencial' }
]

const VerticalForm = () => {
    const params = useParams()
    const [id, setId] = useState()
    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [cidade, setCidade] = useState()
    const [endereco, setEndereco] = useState()
    const [contato, setContato] = useState()
    const [usuario, setUsuario] = useState()
    const [tipo, setTipo] = useState("Selecione")
    const [foto, setFoto] = useState()
    const [minhafoto, setMinhaFoto] = useState()
    const [sobre, setSobre] = useState()

    const [horarios, setHorarios] = useState([])
    const [horarioInicio, setHorarioInicio] = useState()
    const [horarioFim, setHorarioFim] = useState()
    const [diaSemana, setDiaSemana] = useState("Selecione...")

    const [categoria, setCategoria] = useState([])
    const [categorias, setCategorias] = useState([])
    const [minhaCategoria, setMinhaCategoria] = useState("Selecione...")

    const [alert, setAlert] = useState()
    const [alertText, setAlertText] = useState()
    const [alertColor, setAlertColor] = useState()

    const [mostrarInformacoes, setMostrarInformacoes] = useState(true)
    const [mostrarTipo, setMostrarTipo] = useState(false)
    const [mostrarHorarios, setMostrarHorarios] = useState(false)
    const [mostrarCategorias, setMostrarCategorias] = useState(false)

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario'))

        const dados = async () => {
            const responseHorarios = await api.get(`/afiliado/horario/mostrar?id=${usuario.id}`)
            setHorarios(responseHorarios.data)

            const response = await api.get('/afiliado/categoria/listar')
            setCategorias(response.data)

            setId(usuario.id)
            setNome(usuario.nome)
            setEmail(usuario.email)
            setCidade(usuario.cidade)
            setEndereco(usuario.endereco)
            setContato(usuario.contato)
            setUsuario(usuario.usuario)
            setSobre(usuario.sobre)
            setMinhaFoto(usuario.foto)
            setTipo(usuario.tipo)
            setCategoria(usuario.categoria[0])

        }

        dados()

    }, [])

    const salvarInformacoes = () => {

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&key=AIzaSyAANriQibdTVRzVbwzrZTxUuP7aEh9kFdc`)
            .then(resultado => resultado.json())
            .then(async resultado => {
                if (resultado.status === "REQUEST_DENIED") {
                    setAlert(true)
                    setAlertText('O Administrador deve configurar sua conta google')
                    setAlertColor("danger")
                } else {
                    if (resultado.status === "ZERO_RESULTS") {
                    setAlert(true)
                    setAlertText('Não conseguimos localizar o estabelecimento, informe um endereço mais completo')
                    setAlertColor("danger")
                } else {
                    const dados = new FormData()
                    dados.append('id', id)
                    dados.append('nome', nome)
                    dados.append('email', email)
                    dados.append('cidade', cidade)
                    dados.append('endereco', endereco)
                    dados.append('contato', contato)
                    dados.append('usuario', usuario)
                    dados.append('foto', foto)
                    dados.append('sobre', sobre)
                    dados.append('latitude', resultado.results[0].geometry.location.lat)
                    dados.append('longitude', resultado.results[0].geometry.location.lng)

                    const response = await api.post('/afiliado/salvar-informacoes-perfil', dados)

                    if (response.data.message === "Editado com sucesso") {
                        localStorage.setItem("usuario", JSON.stringify(response.data.usuario))
                        setAlertColor('success')
                        setAlertText("Editado com sucesso")
                        setAlert(true)
                    }
                }
                }
            })
    }

    const salvarTipo = async (t) => {
        const response = await api.post('/afiliado/salvar-tipo-perfil', {
            id,
            tipo: t
        })

        if (response.data.message === 'Editado com sucesso') {
            localStorage.setItem('usuario', JSON.stringify(response.data.usuario))
            setAlert(true)
            setAlertText('Editado com sucesso')
            setAlertColor('success')
            setTipo(t)
        }
    }

    const salvarHorario = async () => {
        setAlert(false)
        if (!horarioInicio || !horarioFim || diaSemana === "Selecione...") {
            setAlert(true)
            setAlertText('Preencha todas as informações')
            setAlertColor('danger')
        } else {
            const response = await api.post('/afiliado/horario/cadastrar', {
                semana: diaSemana,
                horario_inicio: horarioInicio,
                horario_fim: horarioFim,
                id
            })

            if (response.data.message === 'Salvo com sucesso') {
                setAlert(true)
                setAlertText('Salvo com sucesso')
                setAlertColor('success')
                setHorarios(response.data.horarios)
            }
        }
    }

    const remover = async (h) => {
        const response = await api.get(`/afiliado/horario/remover?id=${h}&afiliado=${id}`)
        setHorarios(response.data)
    }

    const salvarCategoria = async () => {
        setAlert(false)
        if (minhaCategoria === "Selecione...") {
            setAlert(true)
            setAlertText('Escolha uma categoria')
            setAlertColor('danger')
        } else {
            const response = await api.post('/afiliado/salvar-categoria-perfil', {
                id,
                categoria: minhaCategoria
            })

            if (response.data.message === "Salvo com sucesso") {
                localStorage.setItem('usuario', JSON.stringify(response.data.usuario))
                setAlert(true)
                setAlertText('Salvo com sucesso')
                setAlertColor('success')
                setCategoria(response.data.usuario.categoria[0])
            }
        }
    }

    return (
        <>
            {alert &&
                <Alert color={alertColor}>
                    <div className='alert-body'>
                        {alertText}
                    </div>
                </Alert>
            }

            <Card>
                <Col sm="12" style={{ marginTop: 10, marginBottom: 10 }}>
                    <Collapse isOpen={true} navbar>
                        <div className='profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0'>
                            <Nav className='mb-0' pills>
                                <NavItem>
                                    {mostrarInformacoes ? <NavLink className='font-weight-bold' active
                                        onClick={() => (setMostrarInformacoes(true), setMostrarTipo(false), setMostrarHorarios(false), setMostrarCategorias(false), setAlert(false))}>
                                        <span className='d-none d-md-block'>Informações</span>
                                        <Rss className='d-block d-md-none' size={14} />

                                    </NavLink> : <NavLink className='font-weight-bold'
                                        onClick={() => (setMostrarInformacoes(true), setMostrarTipo(false), setMostrarHorarios(false), setMostrarCategorias(false), setAlert(false))}>
                                        <span className='d-none d-md-block'>Informações</span>
                                        <Rss className='d-block d-md-none' size={14} />
                                    </NavLink>}
                                </NavItem>

                                <NavItem>
                                    {mostrarTipo ? <NavLink className='font-weight-bold' active
                                        onClick={() => (setMostrarInformacoes(false), setMostrarTipo(true), setMostrarHorarios(false), setMostrarCategorias(false), setAlert(false))}>
                                        <span className='d-none d-md-block'>Tipo</span>
                                        <Info className='d-block d-md-none' size={14} />
                                    </NavLink> : <NavLink className='font-weight-bold'
                                        onClick={() => (setMostrarInformacoes(false), setMostrarTipo(true), setMostrarHorarios(false), setMostrarCategorias(false), setAlert(false))}>
                                        <span className='d-none d-md-block'>Tipo</span>
                                        <Info className='d-block d-md-none' size={14} />
                                    </NavLink>}
                                </NavItem>

                                <NavItem>
                                    {mostrarHorarios ? <NavLink className='font-weight-bold' active
                                        onClick={() => (setMostrarInformacoes(false), setMostrarTipo(false), setMostrarHorarios(true), setMostrarCategorias(false), setAlert(false))}>
                                        <span className='d-none d-md-block'>Horários</span>
                                        <Info className='d-block d-md-none' size={14} />
                                    </NavLink> : <NavLink className='font-weight-bold'
                                        onClick={() => (setMostrarInformacoes(false), setMostrarTipo(false), setMostrarHorarios(true), setMostrarCategorias(false), setAlert(false))}>
                                        <span className='d-none d-md-block'>Horários</span>
                                        <Info className='d-block d-md-none' size={14} />
                                    </NavLink>}
                                </NavItem>

                                <NavItem>
                                    {mostrarCategorias ? <NavLink className='font-weight-bold' active
                                        onClick={() => (setMostrarInformacoes(false), setMostrarTipo(false), setMostrarHorarios(false), setMostrarCategorias(true), setAlert(false))}>
                                        <span className='d-none d-md-block'>Categorias</span>
                                        <Image className='d-block d-md-none' size={14} />
                                    </NavLink> : <NavLink className='font-weight-bold'
                                        onClick={() => (setMostrarInformacoes(false), setMostrarTipo(false), setMostrarHorarios(false), setMostrarCategorias(true), setAlert(false))}>
                                        <span className='d-none d-md-block'>Categorias</span>
                                        <Image className='d-block d-md-none' size={14} />
                                    </NavLink>}

                                </NavItem>
                            </Nav>
                        </div>
                    </Collapse>
                </Col>
            </Card>

            {mostrarInformacoes && <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Minhas informações</CardTitle>
                </CardHeader>

                <CardBody>
                    <Form>
                        {minhafoto && <div className='profile-img'>
                            {/* <img className='rounded img-fluid' style={{ width: 100, height: 100, marginBottom: 10 }} src={`http://localhost/Conte-tecnologia/santa-carga/api/public/storage/${minhafoto}`} alt='Card image' /> */}
                            <img className='rounded img-fluid' style={{ width: 100, height: 100, marginBottom: 10 }} src={`https://santacarga.contetecnologia.com.br/api/public/storage/${minhafoto}`} alt='Card image' />
                        </div>}

                        <Row>
                            <Col sm='12'>
                                <FormGroup>
                                    <Label for='foto'>Adicionar/alterar foto perfil</Label>
                                    <Input onChange={e => setFoto(e.target.files[0])}
                                        type='file' name='foto' id='foto' />
                                </FormGroup>
                            </Col>
                            <Col sm='12'>
                                <FormGroup>
                                    <Label for='nameVertical'>Nome/Razão Social</Label>
                                    <Input value={nome}
                                        onChange={e => setNome(e.target.value)}
                                        type='text' name='name' id='nameVertical' placeholder='Nome/Razão Social' />
                                </FormGroup>
                            </Col>
                            <Col sm='12'>
                                <FormGroup>
                                    <Label for='EmailVertical'>Email</Label>
                                    <Input value={email}
                                        onChange={e => setEmail(e.target.value)} type='email' name='Email' id='EmailVertical' placeholder='Email' />
                                </FormGroup>
                            </Col>
                            <Col sm='12'>
                                <FormGroup>
                                    <Label for='cidade'>Cidade</Label>
                                    <Input value={cidade}
                                        onChange={e => setCidade(e.target.value)} type='text' name='mobile' id='cidade' placeholder='Cidade' />
                                </FormGroup>
                            </Col>
                            <Col sm='12'>
                                <FormGroup>
                                    <Label for='mobileVertical'>Endereço</Label>
                                    <Input value={endereco}
                                        onChange={e => setEndereco(e.target.value)} type='text' name='mobile' id='mobileVertical' placeholder='Endereço' />
                                </FormGroup>
                            </Col>
                            <Col sm='12'>
                                <FormGroup>
                                    <Label for='passwordVertical'>Contato responsável</Label>
                                    <Input value={contato}
                                        onChange={e => setContato(e.target.value)} type='text' name='password' id='passwordVertical' placeholder='Contato responsável' />
                                </FormGroup>
                            </Col>
                            <Col sm='12'>
                                <FormGroup>
                                    <Label for='usuario'>Usuário</Label>
                                    <Input value={usuario}
                                        onChange={e => setUsuario(e.target.value)} type='text' name='usuario' id='usuario' placeholder='Usuário' />
                                </FormGroup>
                            </Col>

                            <Col sm="12">
                                <FormGroup>
                                    <Label for="add-comment">Sobre a empresa</Label>
                                    <Input value={sobre} onChange={e => setSobre(e.target.value)}
                                        id="add-comment" type='textarea' rows='10' placeholder='Sobre a empresa' />
                                </FormGroup>
                            </Col>

                            <Col sm='12'>
                                <FormGroup className='d-flex mb-0'>
                                    <Button.Ripple className='mr-1' color='primary' onClick={salvarInformacoes}>
                                        Editar
                                    </Button.Ripple>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>}

            {mostrarTipo && <>
                <Card>
                    <CardHeader>
                        <CardTitle tag='h4'>Meu tipo</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <Row>
                            <Col sm="2">
                                <FormGroup>
                                    <Label for='nameVertical'> <Badge color='light-success'>Atual - {tipo}</Badge></Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle tag='h4'>Trocar tipo</CardTitle>
                    </CardHeader>

                    <CardBody>
                        {tipo === "Delivery" ? <Row>
                            <Col sm="2">
                                <FormGroup>
                                    <Label for='nameVertical'>Presencial</Label>
                                </FormGroup>
                            </Col>
                            <Col sm="10">
                                <FormGroup>
                                    <Label for='nameVertical' onClick={() => salvarTipo('Presencial')}><Badge color='light-success' >Adicionar</Badge></Label>
                                </FormGroup>
                            </Col>
                        </Row> : <Row>
                            <Col sm="2">
                                <FormGroup>
                                    <Label for='nameVertical'>Delivery</Label>
                                </FormGroup>
                            </Col>
                            <Col sm="10">
                                <FormGroup>
                                    <Label for='nameVertical' onClick={() => salvarTipo('Delivery')}><Badge color='light-success'>Adicionar</Badge></Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        }


                    </CardBody>
                </Card>
            </>}

            {mostrarHorarios && <>
                <Card>
                    <CardHeader>
                        <CardTitle tag='h4'>Meus horários</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <Row>
                            {horarios.map((hora) => <Col md='6' xl="4">
                                <Card className='bg-transparent border-primary shadow-none'>
                                    <CardBody>
                                        <CardTitle tag='h4'>{hora.semana}</CardTitle>
                                        <Row style={{ marginBottom: 10 }}>
                                            <Col sm="6">
                                                <CardText><Badge color='light-info'> Horário início: {hora.horario_inicio}h</Badge></CardText>
                                            </Col>
                                            <Col sm="6">
                                                <CardText><Badge color='light-info'> Horário fim: {hora.horario_fim}h</Badge></CardText>
                                            </Col>
                                        </Row>


                                        <Button.Ripple color='danger' outline onClick={() => remover(hora.id)}>
                                            Remover
                                        </Button.Ripple>

                                    </CardBody>
                                </Card>
                            </Col>
                            )}

                        </Row>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle tag='h4'>Adicionar novo horário</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for='nameVertical'>Dia da semana</Label>
                                <select value={diaSemana} onChange={e => setDiaSemana(e.target.value)} class="custom-select">
                                    <option>Selecione...</option>
                                    <option>Domingo</option>
                                    <option>Segunda-feira</option>
                                    <option>Terça-feira</option>
                                    <option>Quarta-feira</option>
                                    <option>Quinta-feira</option>
                                    <option>Sexta-feira</option>
                                    <option>Sabado</option>
                                </select>
                            </FormGroup>

                            <Row>
                                <Col sm="6">
                                    <FormGroup>
                                        <Label for="add-comment">Horário início</Label>
                                        <Input value={horarioInicio} onChange={e => setHorarioInicio(e.target.value)}
                                            id="add-comment" type='time' placeholder='Horário início' />
                                    </FormGroup>
                                </Col>

                                <Col sm="6">
                                    <FormGroup>
                                        <Label for="add-comment">Horário fim</Label>
                                        <Input value={horarioFim} onChange={e => setHorarioFim(e.target.value)}
                                            id="add-comment" type='time' placeholder='Horário fim' />
                                    </FormGroup>
                                </Col>
                            </Row>


                            <FormGroup className='d-flex mb-0'>
                                <Button.Ripple className='mr-1' color='primary' onClick={salvarHorario}>
                                    Salvar
                                </Button.Ripple>
                            </FormGroup>

                        </Form>
                    </CardBody>
                </Card>
            </>}

            {mostrarCategorias && <>
                <Card>
                    <CardHeader>
                        <CardTitle tag='h4'>Minha categoria</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <Row>
                            <Col sm="2">
                                <FormGroup>
                                    <Label for='nameVertical'> <Badge color='light-success'>Atual - {categoria.nome}</Badge></Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle tag='h4'>Cadastrar categoria</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <FormGroup>
                            <Label for='categoria'>Categorias</Label>
                            <select value={minhaCategoria} onChange={e => setMinhaCategoria(e.target.value)} class="custom-select">
                                <option>Selecione...</option>
                                {categorias.map((cat) => <option value={cat.id}>{cat.nome}</option>)}
                            </select>
                        </FormGroup>

                        <FormGroup className='d-flex mb-0'>
                            <Button.Ripple className='mr-1' color='primary' onClick={salvarCategoria}>
                                Salvar
                            </Button.Ripple>
                        </FormGroup>
                    </CardBody>
                </Card>
            </>}

        </>
    )
}
export default VerticalForm