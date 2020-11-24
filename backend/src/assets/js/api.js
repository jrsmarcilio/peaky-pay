/* eslint no-unused-vars: 'error' */
/* eslint-disable no-undef */
const axios = require('axios');

formCadastro = (nome, email, cpf, password) => {
  const data = JSON.stringify({
    nome: `${nome}`,
    email: `${email}`,
    cpf: `${cpf}`,
    password: `${password}`,
  });

  const config = {
    method: 'post',
    url: 'api/users',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };

  axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
