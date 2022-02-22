import React, { useEffect, useState } from 'react'
import { MoreVertical, Delete, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Col, FormGroup, Label, Input, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import api from './../../../api'
import moment from 'moment'

const Home = () => {
  const [pesquisar, setPesquisar] = useState("")
  const [cupons, setCupons] = useState([])
  const [id, setId] = useState()

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    setId(usuario.id)

    const dados = async () => {
      const response = await api.get(`/afiliado/cupom/meus-cupons?afiliado=${usuario.id}`)
      setCupons(response.data)
    }
    dados()
  }, [])

  return (
    <div>
      <Button.Ripple tag={Link} to='/afiliado/cupons/cadastrar' color='primary' className='btn-sm-block mb-2'>
        Novo cupom
      </Button.Ripple>

      <Row>
        <Col sm='12'>
          <FormGroup>
            <Label for='nameVertical'>Pesquisar cupom</Label>
            <Input value={pesquisar} onChange={e => setPesquisar(e.target.value.toLowerCase())}
              type='text' placeholder='Pesquisar o cupom' />
          </FormGroup>
        </Col>
      </Row>

      <Table className='table-hover-animation' responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Desconto</th>
            <th>Data criação</th>
            <th>Data expiração</th>
          </tr>
        </thead>
        <tbody>
          {cupons.filter((cup) => {
            if (pesquisar === "") {
              return cup
            } else if (cup.nome.toLowerCase().includes(pesquisar)) {
              return cup
            }
          }).map((cup) => <>
            <tr key={cup.id}>
              <td><span className='align-middle font-weight-bold'>{cup.nome}</span></td>
              <td><span className='align-middle font-weight-bold'>{cup.desconto} %</span></td>
              <td><span className='align-middle font-weight-bold'>{moment(cup.data_criacao).format('DD/MM/YYYY')}</span></td>
              <td><span className='align-middle font-weight-bold'>{moment(cup.data_encerrar).format('DD/MM/YYYY')}</span></td>
            </tr>
          </>
          )}


        </tbody>
      </Table>
    </div>
  )
}

export default Home
