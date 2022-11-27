import * as yup from 'yup'

const isNotEmpty = (input: number | undefined): boolean => {
  if (input !== undefined) {
    return input > 0
  } else {
    return false
  }
}

const tipoCursoPessoaValidationError = (name: string) => {
  return new yup.ValidationError(
    'Selecione Tipo de Usuário, Curso ou Pessoa.',
    'null',
    ${name},
    'required'
  )
}

const refeicaoValidation = yup.object().shape({
  ativo: yup.object(),
  valorDesconto: yup.string().when('ativo', {
    is: (ativo: { value: boolean | undefined }) => ativo.value === true,
    then: yup.string().required('O campo é obrigatório')
  })
})

export const AssociacaoValidationSchema = yup.object({
  nome: yup
    .string()
    .required('O campo é obrigatório')
    .max(80, 'O campo atingiu o limite máximo de 80 caracteres'),
  descricao: yup
    .string()
    .required('O campo é obrigatório')
    .max(255, 'O campo atingiu o limite máximo de 255 caracteres'),
  inicio: yup.string().nullable(),
  fim: yup
    .string()
    .nullable()
    .when('inicio', {
      is: (inicio: string | undefined) => inicio !== undefined,
      then: yup.string().nullable().required('O campo é obrigatório')
    }),

  almoco: refeicaoValidation,
  janta: refeicaoValidation,
  cafeDaManha: refeicaoValidation,
  lancheDaManha: refeicaoValidation,
  lancheDaTarde: refeicaoValidation,
  lancheDaNoite: refeicaoValidation,

  tipo: yup.array().nullable(),
  curso: yup.array().nullable(),
  pessoa: yup.array().nullable()
})
// .test('back', function _(value) {
//   const correctInput = !!(
//     isNotEmpty(value.tipo?.length) ||
//     isNotEmpty(value.curso?.length) ||
//     isNotEmpty(value.pessoa?.length)
//   )
//   if (!correctInput) {
//     return new yup.ValidationError([
//       tipoCursoPessoaValidationError('tipo'),
//       tipoCursoPessoaValidationError('curso'),
//       tipoCursoPessoaValidationError('pessoa')
//     ])
//   }
//   return true
// })
