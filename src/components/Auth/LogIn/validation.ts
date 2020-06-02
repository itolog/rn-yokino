import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Слишком коротко!')
    .max(50, 'Слишком длинно!')
    .required('Заполните'),
  password: Yup.string().required('Заполните'),
});

export default SignupSchema;
