
import { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

const UserDropdown = () => {
  const [usuario, setUsuario] = useState([])
  const [tipo, setTipo] = useState()
  const [login, setLogin] = useState(false)

  useEffect(() => {

    const dados = async () => {
      if (localStorage.getItem("usuario") === null) {
        setLogin(true)
      } else {
        setTipo(JSON.parse(localStorage.getItem('tipo')))
        setUsuario(JSON.parse(localStorage.getItem("usuario")))

      }
    }

    dados()
  }, [])

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      {login && <Redirect to="/login" />}
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold'>{usuario.nome}</span>
          <span className='user-status'>{usuario.usuario}</span>
        </div>
      </DropdownToggle>

      {tipo === "admin" &&
        <DropdownMenu right>
          <DropdownItem tag={Link} to='/login' onClick={e => setLogin(true)}>
            <Power size={14} className='mr-75' />
            <span className='align-middle'>Sair</span>
          </DropdownItem>
        </DropdownMenu>
      }

      {tipo === "afiliado" &&
        <DropdownMenu right>
          <DropdownItem tag={Link} to='/afiliado/perfil'>
            <User size={14} className='mr-75' />
            <span className='align-middle'>Perfil</span>
          </DropdownItem>
          <DropdownItem tag={Link} to='/login' onClick={e => setLogin(true)}>
            <Power size={14} className='mr-75' />
            <span className='align-middle'>Sair</span>
          </DropdownItem>
        </DropdownMenu>
      }


    </UncontrolledDropdown>
  )
}

export default UserDropdown
