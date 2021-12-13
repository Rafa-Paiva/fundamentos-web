import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import './Navbar.css'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { UserState } from '../../../store/user/userReducer';
import { addName, addTipo, addToken } from '../../../store/user/actions';

function Navbar() {
    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    );
    const name = useSelector<UserState, UserState["names"]>(
        (state) => state.names
    );
    // adicione a const tipo
    const tipo = useSelector<UserState, UserState["tipos"]>(
        (state) => state.tipos
    );
    let history = useHistory();
    const dispatch = useDispatch();

    function goLogout() {
        dispatch(addToken(''));
        dispatch(addName(''));
        // adicione o dispatch para o tipo
        dispatch(addTipo(''));
        toast.info('Usuário deslogado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });
        history.push('/login')
    }
    // adicione a var cadastrarTema e o if para verificar se o usuário é admin
    var navbarComponent;
    var cadastrarTema
    if(tipo == 'Admin'){
        cadastrarTema =   <Link to="/formularioTema" className="text-decorator-none">
        <Box mx={1} className='cursor'>
            <Typography variant="h6" color="inherit">
                cadastrar tema
            </Typography>
        </Box>
    </Link>
    }
    // adicione a var cadastrarTema e o if para verificar se o usuário é admin
    if (token != "") {
        //  adicione um if que valida token e crie um navbarcomponent
        navbarComponent = <AppBar position="static">
            <Toolbar variant="dense">
                <Box className='cursor'>
                    <Typography variant="h5" color="inherit">
                        BlogPessoal {name}
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="start">
                    <Link to="/home" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                home
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/posts" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                postagens
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/temas" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                temas
                            </Typography>
                        </Box>
                    </Link>

                  {cadastrarTema}
                    {/* crie um cadastrar tema */}
                    <Box mx={1} className='cursor' onClick={goLogout}>
                        <Typography variant="h6" color="inherit">
                            logout
                        </Typography>
                    </Box>

                </Box>

            </Toolbar>
        </AppBar>
    }
    return (
        <>
            {navbarComponent}
        </>
    )
}
//adicione navbarComponent e o cadastrarTema no navbar
export default Navbar;