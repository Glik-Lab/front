import Image from 'next/image'
import Link from 'next/link'

import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import router from 'next/router'
import { useTranslation } from 'react-i18next'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { toast } from 'react-toastify'
import LogoGlick from '../../assets/logo.png'
import Navbar from '../../components/NavBarLogado'
import { api } from '../../services/api'

import '../../lib/i18n'

type SignupProps = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const sendEmailConfirmation = async (email: string) => {
  try {
   
  } catch (error) {
    console.error(error)
    toast.error('Erro ao enviar e-mail de confirmação.')
  }
}

export default function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const [usuario, setUsuario] = useState({
    username: '',
    email: '',
    password: '',
  })

  const { t } = useTranslation()

  const { username, email, password } = usuario

  const SignupFormSchema = Yup.object().shape({
    username: Yup.string()
      .required(`${t('required-name')}`)
      .max(50, `${t('name-must-contain-at-least-50-characters')}`)
      .typeError(`${t('invalid-name')}`),
    email: Yup.string()
      .required(`${t('required-email')}`)
      .email(`${t('please-provide-a-valid-email')}`),
    // cpf: Yup.string()
    //     .required("CPF é obrigatório")
    //     .length(14, 'O CPF deve conter no mínimo 14 caracteres')
    //     .test('cpfValidator', 'CPF inválido', (value) => {
    //         if (CPF.isValid(value)) {
    //             const cpfFormatted = CPF.format(value)

    //             return cpfFormatted
    //         }
    //     }),
    password: Yup.string()
      .required(`${t('required-password')}`)
      .min(6, `${t('password-least-6-characters')}`)
      .max(15, `${t('password-cannot-exceed-15-characters')}`),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      `${t('passwords-do-not-match')}`
    ),
  })

  const changeOnFild = (e: { target: { name: any; value: any } }) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value })
    console.log(usuario)
  }

  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (username === '' || email === '') {
      alert('preencha todos os campos ')
    } else {
      try {
        await api.post('/auth/local/register', usuario)
        await sendEmailConfirmation(email)
        toast.success(
          `${t('registration-successfully-complete')}`
        )
        router.push('/signup/verify-email')
      } catch (error) {
        console.error(error)
        toast.error(`${t('error-when-trying-to-register')}`)
      }
    }
  }

  const {
    register,
    formState: { errors },
  } = useForm<SignupProps>({ resolver: yupResolver(SignupFormSchema) })

  console.log('errors', errors)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <div className="background-traxt">
          <Image
            src={LogoGlick}
            className="image-traxt"
            alt="Logo Traxt"
          />
        </div>
        <div className="signup-form">
          <h1>{t('create-your-account-on-the-platform')}</h1>
          <form onSubmit={submit}>
            <section>
              <div className="name">
                <label htmlFor="username">
                  {t('name')} <span>*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  aria-label="Nome Completo"
                  placeholder={`${t('enter-your-full-name')}`}
                  value={username}
                  {...register(`username`)}
                  onChange={(e) => changeOnFild(e)}
                />
              </div>
              {errors.username && (
                <span className="errorMessage">{errors.username.message}</span>
              )}
              <div className="email">
                <label htmlFor="email">
                  Email1 <span>*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  aria-label="meuemail@email.com"
                  placeholder={`${t('enter-your-email')}`}
                  value={email}
                  {...register(`email`)}
                  onChange={(e) => changeOnFild(e)}
                />
              </div>
              {errors.email && (
                <span className="errorMessage">{errors.email.message}</span>
              )}
              <div className="password">
                <label htmlFor="password">
                  {t('password')} <span>*</span>
                </label>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  aria-label="password"
                  placeholder={`${t('create-your-password')}`}
                  value={password}
                  {...register(`password`)}
                  onChange={(e) => changeOnFild(e)}
                />
                <span
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              {errors.password && (
                <span className="errorMessage">{errors.password.message}</span>
              )}
            </section>
            <br />
            <button className="button-signup" type="submit">
              {t('create-your-account')}
            </button>
            <div className="back">
              <Link href="/login">{t('return-to-login')}</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
