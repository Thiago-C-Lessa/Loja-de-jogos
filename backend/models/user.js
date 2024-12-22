const mongoose  = require('mongoose');
const Schema = mongoose.Schema;


// Função para validar CPF
function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');
  
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }
  
    // Verifica se todos os números são iguais (exemplo: 111.111.111.11)
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
  
    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digito1 = 11 - (soma % 11);
    if (digito1 === 10 || digito1 === 11) digito1 = 0;
  
    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let digito2 = 11 - (soma % 11);
    if (digito2 === 10 || digito2 === 11) digito2 = 0;
  
    // Verifica se os dígitos calculados são iguais aos fornecidos
    return cpf.charAt(9) == digito1 && cpf.charAt(10) == digito2;
  }
  
  // Definir o schema do usuário com validação de CPF
  const userSchema = new Schema({
    id: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    cpf: { 
      type: String, 
      required: true, 
      unique: true, 
      minlength: 11, 
      maxlength: 11,
      validate: {
        validator: function(v) {
          return validarCPF(v);  // Chama a função de validação
        },
        message: props => `${props.value} não é um CPF válido!`
      }
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      validate: {
        validator: function(v) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);  // Validação de e-mail
        },
        message: props => `${props.value} não é um e-mail válido!`
      }
    },
    senha: { type: String, required: true }
  }, {
    timestamps: true,  // Adiciona createdAt e updatedAt automaticamente
  });
  


const User = mongoose.model('User',userSchema);
module.exports = User;