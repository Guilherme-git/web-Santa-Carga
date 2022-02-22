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
  const [nome, setNome] = useState()
  const [alert, setAlert] = useState()
  const [alertText, setAlertText] = useState()
  const [alertColor, setAlertColor] = useState()

  const salvar = async () => {
    const response = await api.post('/admin/categoria/cadastrar', {
      nome
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
          <CardTitle tag='h4'>Cadastrar categoria</CardTitle>
        </CardHeader>

        <CardBody>
          <Form>
            <Row>
              <Col sm='12'>
                <FormGroup>
                  <Label for='nameVertical'>Nome</Label>
                  <Input value={nome}
                    onChange={e => setNome(e.target.value)}
                    type='text' name='name' id='nameVertical' placeholder='Nome da categoria' />
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