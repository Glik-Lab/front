/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineRight } from 'react-icons/ai';
import Footer from '../components/Footer';
import Navbar from '../components/NavBarLogado';
import { api } from '../services/api';
import styles from '../styles/Card.module.css';
import styles1 from '../styles/Contrato.module.css';

// Definição da interface Campaign
interface Campaign {
 imageUrl: string;
 title: string;
 price: number;
 description: string;
 totalRaised: number;
}

const SuccessPage: React.FC = () => {
 // Uso da interface Campaign para tipar o estado campaign
 const [campaign, setCampaign] = useState<Campaign | null>(null);
 const { t } = useTranslation();

 useEffect(() => {
    const campaignId = localStorage.getItem('campaignId');
    if (campaignId) {
      getCampaignDetails(campaignId).then(setCampaign);
    }
 }, []);

 const getCampaignDetails = async (campaignId: string): Promise<Campaign | null> => {
    try {
      const response = await api.get(`campaigns/${campaignId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes da campanha:', error);
      return null;
    }
 };

 return (
    <>
      <Navbar />
      <div className={styles1.newDocumentContainer}>
        <Link href="/">{t('home-page')}</Link>
        <div className={styles.icon}>
          <AiOutlineRight />
        </div>
        <Link href="/login">{t('my-documents')}</Link>
        <div className={styles.icon}>
          <AiOutlineRight />
        </div>
      </div>
      <div className={styles1.background}>
        <h1>Campanha Criada com Sucesso</h1>
        <div>
          {campaign && (
            <div className={styles.div}>
              <div className={styles.card}>
                <Image src={campaign.imageUrl} width={200} height={200} alt={campaign.title} className={styles.image} />
                <h2 className={styles.cardTitle}>{campaign.title}</h2>
                <p className={styles.price}>Price: ${campaign.price}</p>
                <p className={styles.description}>{campaign.description}</p>
                <p className={styles.raised}>Total Raised: ${campaign.totalRaised}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
 );
};

export default SuccessPage;
