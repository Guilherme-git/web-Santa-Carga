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
  const [nome, setNome] = useState()
  const [desconto, setDesconto] = useState()
  const [dataEncerramento, setDataEncerramento] = useState()

  const [alert, setAlert] = useState()
  const [alertText, setAlertText] = useState()
  const [alertColor, setAlertColor] = useState()

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    setId(usuario.id)
  }, [])


  const salvar = async () => {
    setAlert(false)
    const response = await api.post('/afiliado/cupom/cadastrar', {
      nome,
      desconto,
      data_encerrar: dataEncerramento,
      afiliado: id
    })
   
    if (response.data.message === "Salvo com sucesso") {
      setAlertColor('success')
      setAlertText("Salvo com sucesso")
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
          <CardTitle tag='h4'>Cadastrar cupom</CardTitle>
        </CardHeader>

        <CardBody>
          <Form>
            <Row>
              <Col sm='12'>
                <FormGroup>
                  <Label for='nameVertical'>Nome</Label>
                  <Input value={nome}
                    onChange={e => setNome(e.target.value)}
                    type='text' name='name' id='nameVertical' placeholder='Nome do cupom' />
                </FormGroup>
              </Col>

              <Col sm='12'>
                <FormGroup>
                  <Label for='desconto'>Desconto (%)</Label>
                  <Input value={desconto}
                    onChange={e => setDesconto(e.target.value)}
                    type='number' name='desconto' id='desconto' placeholder='Porcentagem de desconto' />
                </FormGroup>
              </Col>

              <Col sm='12'>
                <FormGroup>
                  <Label for='encerramento'>Data encerramento</Label>
                  <Input value={dataEncerramento}
                    onChange={e => setDataEncerramento(e.target.value)}
                    type='date' name='encerramento' id='encerramento' placeholder='Data de encerramento' />
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