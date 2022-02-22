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

const VerticalForm = () => {
  const [id, setId] = useState()
  const [cpf, setCpf] = useState()
  const [cupons, setCupons] = useState([])
  const [meuCupom, setMeuCupom] = useState('Selecione...')

  const [alert, setAlert] = useState()
  const [alertText, setAlertText] = useState()
  const [alertColor, setAlertColor] = useState()

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    setId(usuario.id)

    const dados = async () => {
      const response = await api.get(`/afiliado/cupom/meus-cupons?afiliado=${usuario.id}`)
      setCupons(response.data)
    }

    dados()
  }, [])


  const salvar = async () => {
    setAlert(false)

    const response = await api.post('/afiliado/cupom-resgate/cadastrar', {
      cupom: meuCupom,
      cpf,
      afiliado: id
    })

    if (response.data.message === "Salvo com sucesso") {
      setAlertColor('success')
      setAlertText("Salvo com sucesso")
      setAlert(true)
    }
    if (response.data.message === "Esse cliente já utilizou esse cupom") {
      setAlertColor('danger')
      setAlertText("Esse cliente já utilizou esse cupom")
      setAlert(true)
    }
    if (response.data.message === "Cliente não cadastrado") {
      setAlertColor('danger')
      setAlertText("Cliente não cadastrado")
      setAlert(true)
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
          <CardTitle tag='h4'>Cadastrar resgate</CardTitle>
        </CardHeader>

        <CardBody>
          <Form>
            <Row>
              <Col sm='12'>
                <FormGroup>
                  <Label for='nameVertical'>Cupom</Label>
                  <select value={meuCupom} onChange={e => setMeuCupom(e.target.value)} class="custom-select">
                    <option>Selecione...</option>
                    {cupons.map((cup) => <option value={cup.id}>{cup.nome}</option>)}
                  </select>
                </FormGroup>
              </Col>

              <Col sm='12'>
                <FormGroup>
                  <Label for='cliente'>CPF/Cliente</Label>
                  <Input value={cpf}
                    onChange={e => setCpf(e.target.value)}
                    type='number' name='cliente' id='cliente' placeholder='Informe o CPF do cliente' />
                </FormGroup>
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