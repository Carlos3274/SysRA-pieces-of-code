import * as yup from 'yup'

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
  lancheDaNoite: refeicaoValidation
})
