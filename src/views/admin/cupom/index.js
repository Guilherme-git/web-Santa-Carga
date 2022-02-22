import React, { useEffect, useState } from 'react'
import { MoreVertical, Delete, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Col, FormGroup, Label, Input, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import api from './../../../api'
import moment from 'moment'

const Home = () => {
  const [cupons, setCupons] = useState([])

  useEffect(() => {
    const dados = async () => {
      const response = await api.get(`/admin/cupom/listar`)
      setCupons(response.data)
    }
    dados()
  }, [])

  return (
    <div>
      <Button.Ripple color='success' className='btn-sm-block mb-2' href="http://localhost/Conte-tecnologia/santa-carga/api/public/api/admin/cupom/pdf" target="_blank">
        PDF
      </Button.Ripple>

      <Table className='table-hover-animation' responsive>
        <thead>
          <tr>
            <th>Afiliado</th>
            <th>Nome</th>
            <th>Desconto</th>
            <th>Data criação</th>
            <th>Data expiração</th>
          </tr>
        </thead>
        <tbody>
          {cupons.map((cup) => <>
            <tr key={cup.id}>
              <td><span className='align-middle font-weight-bold'>{cup.afiliado[0].nome}</span></td>
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
