import React, { useEffect, useState } from 'react'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Col, FormGroup, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import api from './../../../api'
import Row from 'reactstrap/lib/Row'

const SecondPage = () => {
  const [afiliados, setAfiliados] = useState([])
  const [pesquisar, setPesquisar] = useState("")

  useEffect(() => {
    const dados = async () => {
      const response = await api.get('/admin/afiliado/listar')
      setAfiliados(response.data)
    }

    dados()
  }, [])

  return (
    <>
      <Button.Ripple tag={Link} to='/admin/afiliados/cadastrar' color='primary' className='btn-sm-block mb-2'>
        Novo afiliado
      </Button.Ripple>

      <Row>
        <Col sm='12'>
          <FormGroup>
            <Label for='nameVertical'>Pesquisar afiliado</Label>
            <Input value={pesquisar} onChange={e => setPesquisar(e.target.value.toLowerCase())}
              ype='text' placeholder='Pesquisar afiliado' />
          </FormGroup>
        </Col>
      </Row>

      <Table className='table-hover-animation' responsive>
        <thead>
          <tr>
            <th>Afiliado</th>
            <th>Email</th>
            <th>Contato</th>
            <th>Cidade</th>
            <th>Endereço</th>
            <th>Categoria</th>
            <th>Tipo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {afiliados.filter((afiliado) => {
            if (pesquisar === "") {
                return afiliado
            } else if (afiliado.nome.toLowerCase().includes(pesquisar)) {
              return afiliado
            }
          }).map((afiliado) => <>
            <tr key={afiliado.id}>
              <td><span className='align-middle font-weight-bold'>{afiliado.nome}</span></td>
              <td>{afiliado.email}</td>
              <td>{afiliado.contato}</td>
              <td>{afiliado.cidade}</td>
              <td>{afiliado.endereco}</td>
              <td>{afiliado.categoria.map((cat) => cat.nome)}</td>
              <td>{afiliado.tipo}</td>
              <td>
                <UncontrolledDropdown>
                  <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                    <MoreVertical size={15} />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={Link} to={`/admin/afiliados/editar/${afiliado.id}`}>
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
