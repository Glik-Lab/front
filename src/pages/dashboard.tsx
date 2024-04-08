import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip from '@mui/material/Tooltip';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { AiOutlineRight } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import {
  BsFileEarmarkBreak,
  BsFileEarmarkCheck,
  BsFileEarmarkText,
  BsFileEarmarkX,
} from 'react-icons/bs';
import Navbar from '../components/NavBarLogado';
import { api } from '../services/api';
import jwtInterceptor from '../services/interceptors';
import styles from '../styles/Card.module.css';

import { useTranslation } from 'react-i18next';

import '../lib/i18n';

type Signer = {
  id: string
  username: string
}

export default function Dashboard() {
  const [data, setData] = useState<any>({ status: [] })
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [selectedValue, setSelectedValue] = useState('todos')
  const [selectedContract, setSelectedContract] = useState('novo')
  const [showDateRangePicker, setShowDateRangePicker] = useState(false)
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const [token, setToken] = useState('')
  const [popoverAnchor, setPopoverAnchor] = useState(null)

  const [popoverSigners, setPopoverSigners] = useState<Signer[]>([])

  const router = useRouter()
  const qs = require('qs')

  const query = qs.stringify(
    {
      populate: {
        contrato_assinados: {
          populate: [
            'usuario_ids',
            'contrato_id',
            'contrato.uid',
            'status',
            'owner',
          ],
        },
        contratos: {
          populate: ['file'],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  const { t } = useTranslation()

  useEffect(() => {
    jwtInterceptor
      .get(`/users/me/?${query}`)
      .then((response) => {
        setData(response.data)
        setSearchResult(response.data.contrato_assinados)
      })
      .catch((error) => { })
  }, [query])

  // const handleSearch = (event) => {
  const handleSearch = (event: any) => {
    const value = event.target.value
    setSearchTerm(value)
    const result = data.contrato_assinados.filter(
      (contrato: { data: string }) =>
        contrato.data.toLowerCase().includes(value.toLowerCase())
    )
    setSearchResult(result)
  }

  // const handleSelect = (event) => {
  const handleSelect = (event: any) => {
    const value = event.target.value
    setSelectedValue(value)
    setShowDateRangePicker(value === 'data')
    if (value === 'todos') {
      setSearchResult(data.contrato_assinados)
    } else {
      const result = data.contrato_assinados.filter(
        // (contrato) => contrato.status && contrato.status.status === value
        (contrato: any) => contrato.status && contrato.status.status === value
      )
      setSearchResult(result)
    }
  }

  const handleDateSelect: any = (ranges: any) => {
    setDateRange([ranges.selection])
  }

  const handleButtonClick = () => {
    router.push(`../contracts/new/1/`)
  }
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setToken(token || '')
  }, [])

  const handleLinkClick = async (contratoId: any) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const qs = require('qs')

    const query = qs.stringify(
      {
        populate: {
          pdf: {
            fields: ['url', 'id'],
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    )

    try {
      const response = await api.get(
        apiUrl + `/api/contrato-assinados/${contratoId}?${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const pdfList = response.data.data.attributes.pdf.data;
      const lastPdfUrl = pdfList[pdfList.length - 1]?.attributes.url;

      if (lastPdfUrl) {
        const a = document.createElement('a');
        a.href = apiUrl + lastPdfUrl;
        a.target = '_blank';
        a.download = 'contrato.pdf';
        a.click();
      } else {
        console.log('Nenhum PDF encontrado');
      }
    } catch (error) {
      console.error('Erro ao obter o contrato em PDF:', error);
    }
  }







  const handleContinueContract = async (contratoId: any) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const qs = require('qs')

    const query = qs.stringify(
      {
        populate: {
          pdf: {
            fields: ['id'],
          },
          contrato_id: {
            fields: ['id'],
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    )

    try {
      const response = await api.get(
        apiUrl + `/api/contrato-assinados/${contratoId}?${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log('API Response Data:', response.data)

      const idContractSign = response.data.data.id
      const idContract = response.data.data.attributes.contrato_id.data.id
      const idPdf = response.data.data.attributes.pdf.data[0].id

      console.log('idContractSign', idContractSign)
      console.log('idContract', idContract)
      console.log('idPdf', idPdf)

      const a = document.createElement('a')
      a.href = `https://traxt.io/contracts/new/assinatura/${idContractSign}&${idPdf}?${idContract}`
      a.target = '_blank'
      a.click()
    } catch (error) {
      console.error('Erro ao continuar o contrato em PDF:', error)
    }
  }

  if (!searchResult) {
    return <p>Carregando...</p>
  }

  const handlePopoverOpen = (
    event: MouseEvent<HTMLDivElement, MouseEvent>,
    signers: Signer[]
  ) => {
    //@ts-ignore
    setPopoverAnchor(event.currentTarget)
    setPopoverSigners(signers)
  }

  const handlePopoverClose = () => {
    setPopoverAnchor(null)
    setPopoverSigners([])
  }

  return (
    <>
      <Navbar />
      <div className="documents-container">
        <div className="my-documents-container">
          <div className="homepage-path">
            <Link className="" href="/">
              {t('home-page')}
            </Link>
            <div className="icon">
              <AiOutlineRight />
            </div>
            <p>Minhas campanhas</p>
          </div>

          <div className="create-new-document">
            <h1>Minhas Campanhas</h1>
            <button onClick={handleButtonClick}>
              <span>+</span> Nova Campanha
            </button>
          </div>
        </div>

        <div className="view-documents">
          {/* <h2 className={styles.username}>Bem vindo {data.username}</h2>
        <h3 className={styles.myContracts}>Meus contratos</h3> */}

          <div className="filters-visualization">
            <div className="search-filters">
              <div className="select-status">
                <label htmlFor="status">
                  Status <span>*</span>
                </label>
                <select
                  id="status"
                  value={selectedValue}
                  onChange={handleSelect}
                >
                  <option value="todos">{t('select-a-status')}</option>
                  <option value="Criado">{t('created')}</option>
                  <option value="Aguardando">{t('waiting')}</option>
                  <option value="Finalizado">{t('finished')}</option>
                  <option value="Cancelado">{t('canceled')}</option>
                </select>
              </div>

              {showDateRangePicker ? (
                <DateRangePicker
                  ranges={dateRange}
                  onChange={handleDateSelect}
                  // showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                />
              ) : (
                <div className="input-date">
                  <label htmlFor="date">
                    {t('period')} <span>*</span>
                  </label>
                  <input
                    id="date"
                    type="date"
                    // placeholder="Pesquisar por data"
                    value={searchTerm}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    onChange={handleSearch}
                  />

                </div>
              )}
            </div>
            {showDateRangePicker && (
              <div className={styles.dateRangePicker}>
                <DateRangePicker
                  ranges={dateRange}
                  onChange={handleDateSelect}
                  moveRangeOnFirstSelection={false}
                  months={2}
                />
              </div>
            )}
          </div>

          <div className="cards-list">
            <div className={styles.div}>
              {searchResult &&
                searchResult.map((contrato: any) => {
                  const status = contrato.status && contrato.status.status
                  const owners = contrato.owner

                  const signers = contrato.usuario_ids
                  const americanDate = contrato.data

                  // const isStatusCriado = status === 'Criado';
                  const isStatusCriado = status === `${t('created')}`;

                  const brazilianDate = format(
                    new Date(americanDate),
                    'dd/MM/yyyy'
                  )

                  return (
                    <li key={contrato.id} className={styles.card}>
                      <section>
                        <div>
                          <div className="title-and-options">
                            <h2 className={styles.cardTitle}>
                              Campanha {contrato.id}
                            </h2>
                            <Tooltip
                              title="Ver PDF"
                              onClick={() => handleLinkClick(contrato.id)}
                            >
                              <span className={styles.button}>
                                <BiDotsVerticalRounded />
                              </span>
                            </Tooltip>
                          </div>
                          <div className={styles.status}>
                            <span
                              className={
                                status === 'Criado'
                                  ? styles.statusCriado
                                  : status === 'Aguardando'
                                    ? styles.statusAguardando
                                    : status === 'Finalizado'
                                      ? styles.statusFinalizado
                                      : status === 'Cancelado'
                                        ? styles.statusCancelado
                                        : ''
                              }
                            >
                              {status === 'Criado' ? (
                                <Tooltip title="Clique para continuar e finalizar o contrato.">
                                  <span>
                                    <BsFileEarmarkText
                                      style={{ width: '16px', height: '16px' }}
                                    />
                                  </span>
                                </Tooltip>
                              ) : status === 'Aguardando' ? (
                                <Tooltip title="Faltam Pessoas assinar.">
                                  <span>
                                    <BsFileEarmarkBreak
                                      style={{ width: '16px', height: '16px' }}
                                    />
                                  </span>
                                </Tooltip>
                              ) : status === 'Finalizado' ? (
                                <Tooltip title="Documento ja assinado.">
                                  <span>
                                    <BsFileEarmarkCheck
                                      style={{ width: '16px', height: '16px' }}
                                    />
                                  </span>
                                </Tooltip>
                              ) : status === 'Cancelado' ? (
                                <BsFileEarmarkX
                                  style={{ width: '16px', height: '16px' }}
                                />
                              ) : (
                                ''
                              )}
                              {status}
                            </span>
                          </div>
                          <span className={styles.cardText}>
                            <p>
                              {t('owner')}:
                              {owners && (
                                <span
                                  className={styles.underline}
                                  key={owners.id}
                                >
                                  {owners.username}
                                </span>
                              )}
                            </p>
                            <div className={styles.signers_container}>
                              {t('signatures')}:
                              <AvatarGroup className={styles.avatar} max={4}>
                                {signers.slice(0, 3).map((signer: any) => (
                                  <Tooltip
                                    key={signer.id}
                                    title={signer.username}
                                  >
                                    <Avatar sx={{ bgcolor: '#34363A' }}>
                                      {signer.username.slice(0, 2)}
                                    </Avatar>
                                  </Tooltip>
                                ))}
                                {signers.length > 3 && (
                                  <Tooltip
                                    title={
                                      <div>
                                        {popoverSigners.map((signer) => (
                                          <div key={signer.id}>
                                            {signer.username}
                                          </div>
                                        ))}
                                      </div>
                                    }
                                    onClose={handlePopoverClose}
                                    open={Boolean(popoverAnchor)}
                                  >
                                    <Avatar

                                      onMouseEnter={(event) =>
                                        handlePopoverOpen(
                                          //@ts-ignore
                                          event,
                                          signers.slice(3)
                                        )
                                      }
                                      onMouseLeave={handlePopoverClose}
                                    >
                                      {`+${signers.length - 3}`}
                                    </Avatar>
                                  </Tooltip>
                                )}
                              </AvatarGroup>
                            </div>
                          </span>
                        </div>

                      </section>

                      <span className={styles.spanData}>
                        {isStatusCriado && (
                          <span
                            className={styles.buttonContinue}
                            onClick={() => handleContinueContract(contrato.id)}
                          >
                            {t('continue')}
                          </span>
                        )}
                        {t('created-in')} {brazilianDate}
                      </span>

                    </li>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
