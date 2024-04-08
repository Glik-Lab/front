import crypto from 'crypto'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Resend } from 'resend'
import { api } from '../services/api'
import jwtInterceptor from '../services/interceptors'
import styles from '../styles/Assinar.module.css'

import '../lib/i18n'

interface SendEmailProps {
  onEmailSent: (signatarios: string[]) => void
  contrato: any
  token: string
  disabled?: boolean
}

export default function SendEmailComponent({
  onEmailSent,
  disabled = false,
}: SendEmailProps): JSX.Element {
  const [emails, setEmails] = useState<string[]>([''])
  const [code, setCode] = useState('')
  const [emailEnviadoCount, setEmailEnviadoCount] = useState('')
  const [token, setToken] = useState('')
  const [contract1, setContract1] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const { t } = useTranslation()

  const router = useRouter()

  const resend = new Resend('re_SFvY9DJx_CbKwdvH1whpQsrbZgW1qDte1')

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setToken(token || '')
    const sessaoSavedCodeId = localStorage.getItem('idContractSign')
    setContract1(sessaoSavedCodeId)
  }, [])

  useEffect(() => {
    jwtInterceptor
      .get(`/users/me/`)
      .then((response) => {
        setEmail(response.data.email)
        setName(response.data.username)
      })
      .catch((error) => {
        console.log('Ocorreu um erro ao obter os dados:', error)
      })
  }, [])

  console.log('email', email)
  useEffect(() => {
    const emailCode = crypto.randomBytes(10).toString('hex')
    setCode(emailCode)
  }, [])

  //pegar o id do contrato vindo da url
  const regex = /assinatura\/(\d+)/
  const match = router.asPath.match(regex)
  const urlId = match && match[1]

  const regexPdfId = /&(\d+)/
  const matchPdfId = router.asPath.match(regexPdfId)
  const pdfId = matchPdfId && matchPdfId[1]

  const regexCrtId = /\?(\d+)/
  const matchCrtId = router.asPath.match(regexCrtId)
  const crtId = matchCrtId && matchCrtId[1]
  const regexValor = /\?\d+\?(\d*\.?\d+)/
 const matchValor = router.asPath.match(regexValor)
 const valor = matchValor && matchValor[1]
  const nextUrl = process.env.NEXT_URL
  console.log('env', process.env.NEXT_URL)
  const url = `https://traxt.io/contracts/new/assinatura/${urlId}&${pdfId}?${crtId}?${valor}code=${code}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (emails.some((email) => email === '')) {
      alert(`${t('fill-in-the-email-field')}`)
    } else {
      try {
        const currentUserEmail = email
        const filteredEmails = emails.filter(
          (email) => email !== currentUserEmail
        )

        if (filteredEmails.length === 0) {
          toast.error(
            `${t('send-an-email-to-your-own-email')}`
          )
          return
        }

        const brazilianDate = format(
          new Date(new Date().toISOString()),
          'dd/MM/yyyy HH:mm'
        )

        const data = {
          from: 'no-reply@traxt.io',
          to: filteredEmails,
          subject: `${t('document-signature')}`,
          html: `<table width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <table width="670" cellpadding="0" cellspacing="0" border="0" align="center" style="border: solid #34363a 1px; box-sizing: border-box;">
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <a href="https://traxt.io" target="_blank" rel="noopener noreferrer">
                            <img src="https://api.traxt.io/uploads/Logo_Header_91eb5e1f15.png" alt="Web" width="100%" style="display: block;" />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #fff; padding: 110px 32px 48px 32px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="color: #34363a; text-align: center; font-size: 16px; font-weight: 700; line-height: 70px; display: block;">
                          ${name} ${t('document-to-sign')}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #687075; font-size: 12px; font-weight: 700; line-height: 30px;">
                          ${t('document-name-contract')} ${urlId}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #687075; font-family: Montserrat; font-size: 15px; font-weight: 400; line-height: 70px;">
                          ${t('access-and-sign-sent-document')}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #687075; font-size: 12px; font-weight: 700; line-height: 18px;">
                          ${t('signers')}:
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <ul style="color: #687075; font-size: 12px; font-weight: 700; line-height: 18px;">
                            ${filteredEmails.map((email, index) => `<li key=${index}>${email}</li>`).join('')}
                            <li>${email}</li>
                          </ul>
                        </td>
                      </tr>
        
                    </table>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="text-align: center; align:center; justify-content:center;">
         
          <tr style="align:center; justify-content:center; text-align:center;" >
            <td>
              <a href="${url}" style="text-decoration: none; display: inline-block; width: 150px;">
                <div style="width: 170px; height: 40px; border-radius: 4px; background-color: #ffff; border: 1px solid #34363a; color: #34363a; font-size: 16px; font-weight: 400; line-height: 40px; text-align: center; align:center; justify-content: center;">
                  ${t('sign-the-document')}
                </div>
              </a>
            </td>
          </tr>
        
          <tr style="align:center; justify-content:center; text-align:center;">
            <td>
              <p style="margin-left:20px; color: #AAACB2; font-size: 12px; font-family: Montserrat; font-weight: 400;  margin-top: 10px;">
                ${t('operation-carried-out-in')} ${brazilianDate}
              </p>
              <p style="margin-left:20px; color: #AAACB2; font-size: 12px; font-family: Montserrat; font-weight: 400;">
                E-mail: no-reply@traxt.io
              </p>
            </td>
          </tr>
          <tr align="center">
            <td>
              <img src="https://api.traxt.io/uploads/Divider_fe2bad186f.png" alt="divisoria" width="100%" style="display: block;" />
            </td>
          </tr>
          <tr align="center">
            <td>
              <p style="color: #687075; font-size: 14px; line-height: 21px; text-align: center; padding: 20px;">
                ${t('doubts-contact-us')}
                <br />
                <a href="mailto:ajuda@brickto.com" style="color: #687075; font-size: 14px; font-weight: 700; text-decoration-line: underline;">ajuda@brickto.com</a>
              </p>
            </td>
          </tr>
        </table>
        
        <p style="margin: 5%; color: #687075; font-size: 14px; font-style: italic; line-height: 24px; text-align: left; margin-bottom: 5px;">
          ${t('thank-you')},<br />
          ${t('team-traxt')}
        </p>
        </td>
        </tr>
        <tr>
          <td style="height:110px; background-color: #F2F4F7; padding: 0 0 24px; text-align: center;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="color: #687075; font-size: 14px; line-height: 21px; padding:10px;">
                  2023 - Traxt - ${t('all-rights-reserved')}
                </td>
              </tr>
              <tr>
                <td style="text-align: center; margin-top:20px;">
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-right: 10px;">
                    <img src="https://api.traxt.io/uploads/logo_facebook_2_450fd29f2d.png" alt="Facebook" style="width: 18px; height: 18px;" />
                  </a>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-right: 10px;">
                    <img src="https://api.traxt.io/uploads/logo_linkedin_2_94650ad73d.png" alt="LinkedIn" style="width: 18px; height: 18px;" />
                  </a>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-right: 10px;">
                    <img src="https://api.traxt.io/uploads/logo_instagram_2_d33f623474.png" alt="Instagram" style="width: 18px; height: 18px;" />
                  </a>
                  <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-right: 10px;">
                    <img src="https://api.traxt.io/uploads/logo_youtube_6f07299bbd.png" alt="YouTube" style="width: 18px; height: 18px;" />
                  </a>
                  <a href="https://traxt.io" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
                    <img src="https://api.traxt.io/uploads/logo_site_e8c584b35b.png" alt="Web" style="width: 18px; height: 18px;" />
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
         `,
        }
        const response = await api.post('/email', data)

        // resend.sendEmail({
        //   from:'no-reply@traxt.io',
        //   to:filteredEmails,
        //   subject:'assinatura Documento',
        //   //@ts-ignore
        //   react:<Email firstName="John" product="myapp" />,
        // })

        const numEmailsEnviados = filteredEmails.length
        console.log('emailEnviados', numEmailsEnviados)
        // setEmailEnviadoCount(numEmailsEnviados)
        // console.log("emailCount", emailEnviadoCount)

        onEmailSent(filteredEmails)

        console.log('emailCount1', emailEnviadoCount)
        toast.success('Email enviado com sucesso.')

        //atualiza o contrato com data e codigo da sessao que foi enviado para o signatario
        const saveCodeResponse = await jwtInterceptor.put(
          `/contrato-assinados/${urlId}`,
          {
            data: {
              data: new Date().toISOString(),
              code: code,
              emailEnviados: numEmailsEnviados + 1,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleChange = (index: number, value: string) => {
    const updatedEmails = [...emails]
    updatedEmails[index] = value
    setEmails(updatedEmails)
  }

  const addEmail = () => {
    setEmails([...emails, ''])
  }

  const removeEmail = (index: number) => {
    const updatedEmails = [...emails]
    updatedEmails.splice(index, 1)
    setEmails(updatedEmails)
  }

  return (
    <>
      <div className={styles.signatories}>
        <span>{t('signatories')}</span>
        <button onClick={addEmail}>+</button>
      </div>

      <form onSubmit={handleSubmit} method="POST">
        {emails.map((email, index) => {
          return (
            <div className={styles.signatoriesContainer} key={index}>
              <div className={styles.signatoryField}>
                <label htmlFor={`email-${index}`} className={styles.inputEmail}>
                  {t('signer-email')} {index + 1} <span>*</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder="Informe o e-mail do signatário"
                  type="email"
                  id={`email-${index}`}
                  name={`email-${index}`}
                />
                <button type="button" onClick={() => removeEmail(index)}>
                  -
                </button>
              </div>
            </div>
          )
        })}
        <div className={styles.sendEmails}>
          <button
            disabled={disabled}
            type="submit"
            className={styles.sendEmailsButton}
          >
            {t('send-emails')}
          </button>
        </div>
      </form>
    </>
  )
}
