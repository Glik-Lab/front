import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineRight } from 'react-icons/ai';
import Footer from '../../components/Footer';
import NavbarLogado from '../../components/NavBarLogado';
import { api } from '../../services/api';
import styles from '../../styles/Contrato.module.css';
import { logout } from '../../utils/common';

const CreateCampaign: React.FC = () => {
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const [price, setPrice] = useState('');
 const [userName, setUserName] = useState ("")
 const [file, setFile] = useState<File | null>(null);
 const { t } = useTranslation()

 useEffect(() => {
  const name = localStorage.getItem('userName');
  if (name) {
    setUserName(name);
  }
}, []);
 const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('userId', userName);
    formData.append('description', description);
    formData.append('price', price);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await api.post('campaigns', formData);
      console.log(response.data);
      localStorage.setItem('campaignId', response.data.id);
      router.push('/success')
    } catch (error) {
      console.error('Erro ao criar a campanha:', error);
      router.push('/error')
      
    }
 };

 return (
 <>
 
 // @ts-ignore
 <NavbarLogado onLogout={logout}/>
 <div className="documents-container">
 <div className={styles.newDocumentContainer}>
            <Link href="/">{t('home-page')}</Link>
            <div className={styles.icon}>
              <AiOutlineRight />
            </div>
            <Link href="/login">{t('my-documents')}</Link>
            <div className={styles.icon}>
              <AiOutlineRight />
            </div>
            <p className={styles.p}>{t('new-document')}</p>
          </div>
          <div className={styles.divField}>
    <form className={styles.form}onSubmit={handleSubmit}>
      <label>
        <p>Título:</p>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Descrição:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Preço:
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </label>
      <label>
        Arquivo:
        <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
      </label>
      <button type="submit">Criar Campanha</button>
    </form>
          </div>
 </div>
 <Footer />
 </>
 );
};

export default CreateCampaign;
