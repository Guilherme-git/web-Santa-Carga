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
  CardText
} from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import api from './../../../api'

const opcaoTipo = [
  { value: 'Delivery', label: 'Delivery' },
  { value: 'Presencial', label: 'Presencial' }
]

const VerticalForm = () => {
  const [nome, setNome] = useState()
  const [email, setEmail] = useState()
  const [cidade, setCidade] = useState()
  const [endereco, setEndereco] = useState()
  const [contato, setContato] = useState()
  const [usuario, setUsuario] = useState()
  const [senha, setSenha] = useState()
  const [alert, setAlert] = useState()
  const [alertText, setAlertText] = useState()
  const [alertColor, setAlertColor] = useState()
  const [tipo, setTipo] = useState("Selecione")
  const [categorias, setCategorias] = useState([])
  const [minhaCategoria, setMinhaCategoria] = useState("Selecione")

  useEffect(() => {
    const dados = async () => {
      const response = await api.get('/admin/categoria/listar')
      setCategorias(response.data)
    }
    dados()

  }, [])

  const salvar = () => {
    setAlert(false)
    if (tipo === "Selecione" || minhaCategoria === "Selecione") {
      setAlertColor('warning')
      setAlertText("Selecione um tipo e uma categoria")
      setAlert(true)
    } else {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${endereco},${cidade}&key=AIzaSyAANriQibdTVRzVbwzrZTxUuP7aEh9kFdc`)
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
              const response = await api.post('/admin/afiliado/cadastrar', {
                nome,
                email,
                cidade,
                endereco,
                contato,
                usuario,
                senha,
                latitude: resultado.results[0].geometry.location.lat,
                longitude: resultado.results[0].geometry.location.lng,
                tipo,
                categoria: minhaCategoria
              })
              console.log(response.data)
              if (response.data.message === "Salvo com sucesso") {
                setAlertColor('success')
                setAlertText("Salvo com sucesso")
                setAlert(true)
              }
              if (response.data.message === "Email já cadastrado, tente outro") {
                setAlertColor('warning')
                setAlertText(response.data.message)
                setAlert(true)
              }
            }
          }
        })
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
        <CardHeader>
          <CardTitle tag='h4'>Cadastrar afiliado</CardTitle>
        </CardHeader>

        <CardBody>
          <Form>
            <Row>
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
              <Col sm='12'>
                <FormGroup>
                  <Label for='senha'>Senha</Label>
                  <Input value={senha}
                    onChange={e => setSenha(e.target.value)} type='password' name='senha' id='senha' placeholder='Senha' />
                </FormGroup>
              </Col>

              <Col className='mb-1' md='12' sm='12'>
                <Label>Tipo</Label>
                <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  defaultValue={opcaoTipo[0]}
                  options={opcaoTipo}
                  isClearable={false}
                  onChange={e => setTipo(e.value)}
                />
              </Col>

              <Col className='mb-1' md='12' sm='12'>
                <Label>Categoria</Label>
                <select class="custom-select" onChange={e => setMinhaCategoria(e.target.value)}>
                  <option>Selecione</option>
                  {categorias.map((cat) => <option value={cat.id}>{cat.nome}</option>)}
                </select>
              </Col>

              <Col sm='12'>
                <FormGroup className='d-flex mb-0'>
                  <Button.Ripple className='mr-1' color='primary' onClick={salvar}>
                    Cadastrar
                  </Button.Ripple>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  )
}
export default VerticalForm