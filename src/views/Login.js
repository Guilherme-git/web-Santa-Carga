import React, { useEffect, useState } from 'react'
import { useSkin } from '@hooks/useSkin'
import { Link, Redirect } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button, Alert } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import api from '../api'

const Login = () => {
  const [skin, setSkin] = useSkin()
  const [usuario, setUsuario] = useState()
  const [senha, setSenha] = useState()
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState()
  const [alertColor, setAlertColor] = useState()

  useEffect(() => {
    localStorage.removeItem('usuario')
    localStorage.removeItem('tipo')
  }, [])

  const login = async () => {
    setAlert(false)

    if (!usuario || !senha) {
      setAlert(true)
      setAlertText("Informe o usuário e senha")
      setAlertColor('danger')
    } else {
      const response = await api.post('/login', {
        usuario,
        senha
      })
      if (response.data.message === "Você não está cadastrado") {
        setAlert(true)
        setAlertText(response.data.message)
        setAlertColor('danger')
      }
      if (response.data.message === "ok") {
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario))
        localStorage.setItem("tipo", JSON.stringify(response.data.tipo))

        if (response.data.tipo === "admin") {
          window.location.href = "/admin/home"
        }
        if (response.data.tipo === "afiliado") {
          window.location.href = "/afiliado/home"
        }
      }
    }
  }

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/'>

        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Bem-vindo
            </CardTitle>
            <CardText className='mb-2'>Faça o login para acessar o sistema</CardText>
            <Form className='auth-login-form mt-2'>
              {alert &&
                <Alert color={alertColor}>
                  <div className='alert-body'>
                    {alertText}
                  </div>
                </Alert>
              }
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Usuário
                </Label>
                <Input value={usuario} onChange={e => setUsuario(e.target.value)}
                  type='email' id='login-email' placeholder='Informe seu usuário' autoFocus />
              </FormGroup>

              <FormGroup>
                <Label className='form-label' for='login-password'>
                  Senha
                </Label>
                <InputPasswordToggle value={senha} onChange={e => setSenha(e.target.value)}
                  className='input-group-merge' id='login-password' />
              </FormGroup>

              <Button.Ripple onClick={login} color='primary' block>
                Entrar
              </Button.Ripple>

            </Form>

            {/* 
            <p className='text-center mt-2'>
              <span className='mr-25'>É novo na plataforma ?</span>
              <Link to='/'>
                <span>Crie sua conta</span>
              </Link>
            </p>
*/}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
