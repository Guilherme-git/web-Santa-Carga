import React, { useEffect, useState } from 'react'
import { MoreVertical, Delete, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Col, FormGroup, Label, Input, Row, Card, CardHeader, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom'
import api from './../../../api'
import moment from 'moment'

const Home = () => {
  const [pesquisar, setPesquisar] = useState("")
  const [resgates, setResgates] = useState([])
  const [id, setId] = useState()

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    setId(usuario.id)

    const dados = async () => {
      const response = await api.get(`/afiliado/cupom-resgate/meus-resgate?afiliado=${usuario.id}`)
      setResgates(response.data)
    }
    dados()
  }, [])

  return (
    <div>

      <Button.Ripple tag={Link} to='/afiliado/cupons-resgatados/cadastrar' color='primary' className='btn-sm-block mb-2'>
        Novo resgate
      </Button.Ripple>

      <Table className='table-hover-animation' responsive>
        <thead>
          <tr>
            <th>Cupom</th>
            <th>Cliente</th>
            <th>Cliente/CPF</th>
            <th>Data resgate</th>

          </tr>
        </thead>
        <tbody>
          {resgates.map((res) => <>
            <tr key={res.id}>
              <td><span className='align-middle font-weight-bold'>{res.cupom[0].nome}</span></td>
              <td><span className='align-middle font-weight-bold'>{res.cliente[0].nome}</span></td>
              <td><span className='align-middle font-weight-bold'>{res.cliente[0].cpf}</span></td>
              <td><span className='align-middle font-weight-bold'>{moment(res.data_resgate).format('DD/MM/YYYY')}</span></td>
            </tr>
          </>
          )}
        </tbody>
      </Table>


    </div>
  )
}

export default Home
