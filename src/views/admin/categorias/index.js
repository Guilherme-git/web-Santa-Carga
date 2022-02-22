import React, { useEffect, useState } from 'react'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Col, FormGroup, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import api from './../../../api'
import Row from 'reactstrap/lib/Row'

const SecondPage = () => {
  const [categorias, setCategorias] = useState([])
  const [pesquisar, setPesquisar] = useState("")

  useEffect(() => {
    const dados = async () => {
      const response = await api.get('/admin/categoria/listar')
      setCategorias(response.data)
    }

    dados()
  }, [])

  return (
    <>
      <Button.Ripple tag={Link} to='/admin/categorias/cadastrar' color='primary' className='btn-sm-block mb-2'>
        Nova categoria
      </Button.Ripple>

      <Row>
        <Col sm='12'>
          <FormGroup>
            <Label for='nameVertical'>Pesquisar categoria</Label>
            <Input value={pesquisar} onChange={e => setPesquisar(e.target.value.toLowerCase())}
              ype='text' placeholder='Pesquisar categoria' />
          </FormGroup>
        </Col>
      </Row>

      <Table className='table-hover-animation' responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categorias.filter((categoria) => {
            if (pesquisar === "") {
                return categoria
            } else if (categoria.nome.toLowerCase().includes(pesquisar)) {
              return categoria
            }
          }).map((categoria) => <>
            <tr key={categoria.id}>
              <td><span className='align-middle font-weight-bold'>{categoria.nome}</span></td>
              <td>
                <UncontrolledDropdown>
                  <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                    <MoreVertical size={15} />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={Link} to={`/admin/categorias/editar/${categoria.id}`}>
                      <Edit className='mr-50' size={15} /> <span className='align-middle'>Editar</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          </>)}


        </tbody>
      </Table>
    </>
  )
}

export default SecondPage