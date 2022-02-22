import React, { useEffect, useState } from 'react'
import { MoreVertical, Delete, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Col, FormGroup, Label, Input, Row, Card, CardHeader, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom'
import api from './../../../api'
import moment from 'moment'

const Home = () => {
  const [resgates, setResgates] = useState([])

  useEffect(() => {
    const dados = async () => {
      const response = await api.get(`/admin/cupom-resgate/listar`)
      setResgates(response.data)
    }
    dados()
  }, [])

  return (
    <div>

      <Button.Ripple color='success' className='btn-sm-block mb-2' href="http://localhost/Conte-tecnologia/santa-carga/api/public/api/admin/cupom-resgate/pdf" target="blank">
        PDF
      </Button.Ripple>

      <Table className='table-hover-animation' responsive>
        <thead>
          <tr>
            <th>Afiliado</th>
            <th>Cliente</th>
            <th>Cliente/CPF</th>
            <th>Cupom</th>
            <th>Data resgate</th>

          </tr>
        </thead>
        <tbody>
          {resgates.map((res) => <>
            <tr key={res.id}>
              <td><span className='align-middle font-weight-bold'>{res.afiliado[0].nome}</span></td>
              <td><span className='align-middle font-weight-bold'>{res.cliente[0].nome}</span></td>
              <td><span className='align-middle font-weight-bold'>{res.cliente[0].cpf}</span></td>
              <td><span className='align-middle font-weight-bold'>{res.cupom[0].nome}</span></td>
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
