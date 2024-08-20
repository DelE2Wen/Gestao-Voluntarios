import { CiLogout } from "react-icons/ci";
import useLogout from '../hooks/useLogout'

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <>
      {!loading ? (
        <button onClick={logout}>
          <CiLogout />
          Sair
        </button>
      ) : (
        <span>Carregando...</span>
      )}
    </>
  )
}

export default LogoutButton
