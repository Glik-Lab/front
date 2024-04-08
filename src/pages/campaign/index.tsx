import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/NavBarLogado';
import { api } from '../../services/api';
import styles from '../../styles/Card.module.css';

interface Campaign {
 imageUrl: string;
 title: string;
 price: number;
 description: string;
 totalRaised: number;
 id: string; // Adicione o ID da campanha
 stripeId: string; // Adicione o stripeId da campanha
}

const Campaign: React.FC = () => {
 const [campaigns, setCampaigns] = useState<Campaign[]>([]);
 const [showModal, setShowModal] = useState(false);
 const [email, setEmail] = useState('');
 const [userName, setUserName] = useState ("")
 const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null);

 useEffect(() => {
  const name = localStorage.getItem('userName');
  if (name) {
    setUserName(name);
  }
}, []);
console.log(userName)
 useEffect(() => {
    api.get('campaigns')
      .then((response) => {
        setCampaigns(response.data);
        console.log('teste', campaigns)
      })
      .catch((error) => { });
 }, [campaigns]);


 const handleSubmit = () => {
  // URL de checkout do Stripe
  const checkoutUrl = "https://checkout.stripe.com/c/pay/cs_test_a1WHxkzfsCQMJQSibP0p0z9pkgI8g4ZmdTvTX44dRu0jC1KYgAMZa3Hou9#fidkdWxOYHwnPyd1blpxYHZxWjA0VTdtdzRXdTJKPUNAXV8wXF1vTH9ucnJfZmd0NnJjQTd0YG18dmwzM3ZTfGtgYUN1VFVzbm5vT1M8PTBoSUJ%2FQ2Z8bjRzY0c2dFJiX09BTEwyRmhPZ0JuNTVuc3BtNndCbicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl";
 
  // Redireciona o usuário para a URL de checkout
  window.location.href = checkoutUrl;
 };
 
//  const handleSubmit = async () => {
//   const donationData = {
//      campaignTitle: currentCampaign?.title,
//      campaignId: currentCampaign?.id,
//      productId: currentCampaign?.stripeId,
//      userId: localStorage.getItem('userId'),
//      campaignPrice: currentCampaign?.price,
//      userEmail: email,
//   };
 
//   try {
//     const response = await fetch('http://localhost:3002/payments', {
//  method: 'POST',
//  mode: 'cors',
//  headers: {
//     'Content-Type': 'application/json',
//  },
//  body: JSON.stringify(donationData),
// });

// if (!response.ok) {
//  throw new Error('Erro na requisição');
// }

// const data = await response.json();
// console.log('Doação realizada com sucesso:', data);
// const checkoutUrl = data.url; // Aqui está a correção

// // Aguarda 2 segundos antes de redirecionar
// setTimeout(() => {
//  if (checkoutUrl) {
//     window.location.href = checkoutUrl;
//  } else {
//     console.error('URL de checkout não encontrada na resposta');
//  }
// }, 2000);
 
//   } catch (error) {
//      console.error('Erro ao realizar a doação:', error);
//   }
//  };
 

 return (
    <>
      <Navbar />
      <h1>Lista todas as campanhas</h1>
      <div className="view-documents">
        <div className="cards-list">
          <div className={styles.div}>
            {campaigns.map((campaign, index) => (
              <div key={index} className={styles.card}>
                <Image src={campaign.imageUrl} width={200} height={200} alt={campaign.title} className={styles.image} />
                <h2 className={styles.cardTitle}>{campaign.title}</h2>
                <p className={styles.price}>Price: ${campaign.price}</p>
                <p className={styles.description}>{campaign.description}</p>
                <p className={styles.raised}>Total Raised: ${campaign.totalRaised}</p>
                <button onClick={handleSubmit}>Doar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
 );
};

export default Campaign;
