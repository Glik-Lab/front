/* eslint-disable react-hooks/exhaustive-deps */
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ImageGlick from '../assets/logo-glick/Glik 2.svg';
import NavbarLogado from '../components/NavBarLogado';
import RPC from "../components/solanaRPC";
import styles from '../styles/Card.module.css';
// Adapters
import { getDefaultExternalAdapters } from "@web3auth/default-solana-adapter"; // All default Solana Adapters
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Footer from '../components/Footer';
import '../lib/i18n';


import Link from 'next/link';
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { AiOutlineRight } from "react-icons/ai";
import Navbar from "../components/Navbar";
import '../lib/i18n';
import { api } from "../services/api";



interface Campaign {
  imageUrl: string;
  title: string;
  price: number;
  description: string;
  totalRaised: number;
  createdAt: string;
 }

 
export default function Signin() {

  
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const sortedCampaigns = campaigns.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


// Agora, 'sortedCampaigns' contém as campanhas ordenadas de mais recentes para mais antigas

  const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";

  const router = useRouter()

  const { t } = useTranslation()

  useEffect(() => {
   
      api.get('campaigns')
      .then((response) => {
        setCampaigns(response.data)
      })
      .catch((error) => { })
  }, [])

  

 

  const handleButtonClick = () => {
    const uniqueId = uuidv4(); // Gera um UUID único
    const campaignUrl = `/campaign/${uniqueId}`; // Usa o UUID como parte do caminho da URL
    router.push(campaignUrl); // Navega para a nova URL
   };


 



  const chainConfig = {
    chainId: "0x3",
    chainNamespace: CHAIN_NAMESPACES.SOLANA,
    rpcTarget: "https://api.testnet.solana.com",
    tickerName: "SOLANA",
    ticker: "SOL",
    decimals: 18,
    blockExplorerUrl: "https://explorer.solana.com/?cluster=testnet",
    logo: "https://images.toruswallet.io/sol.svg"
  };

  useEffect(() => {
    const init = async () => {
       if (typeof window !== 'undefined') { // Verifica se o código está sendo executado no lado do cliente
         try {
           const solanaPrivateKeyPrvoider = new SolanaPrivateKeyProvider({
             config: { chainConfig: chainConfig }
           });
   
           const web3auth = new Web3Auth({
             clientId,
             uiConfig: {
               appName: "Glick Lab",
               mode: "light",
               logoLight: "https://imgur.com/Z335kCQ",
               logoDark: "https://web3auth.io/images/web3authlogodark.png",
               defaultLanguage: "pt",
               loginGridCol: 3,
               primaryButton: "externalLogin",
               uxMode: "redirect",
             },
             web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
             privateKeyProvider: solanaPrivateKeyPrvoider
           });
   
           const adapters = await getDefaultExternalAdapters({
             options: {
               clientId,
               chainConfig,
             }
           });
           adapters.forEach((adapter) => {
             web3auth.configureAdapter(adapter);
           });
   
           setWeb3auth(web3auth);
   
           await web3auth.initModal();
           setProvider(web3auth.provider);
   
           if (web3auth.connected) {
             setLoggedIn(true);
           }
         } catch (error) {
           console.error(error);
         }
       }
    };
   
    init();
   }, []); // Certifique-se de que as dependências estão corretas aqui
   

  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();

    if (web3auth.connected) {
      setLoggedIn(true);
      const user = await web3auth.getUserInfo();
    if (user) {
      // Redireciona o usuário para a dashboard após o login bem-sucedido
      router.push('/dashboard'); // Substitua '/dashboard' pelo caminho correto da sua dashboard
    }
    }
    setProvider(web3authProvider);
  };

 

  const logout = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
      
    }
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    uiConsole(address);
    //@ts-ignore
    localStorage.setItem('userName', address);
    
  };
  useEffect(() => {
    getAccounts();
 }, []);


  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const loggedInView = (
    <>
    <NavbarLogado onLogout={logout}/>
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
        
           

          <div className="cards-list">
            <div className={styles.div}>
            
            {sortedCampaigns.map((campaign, index) => (
 <div key={index} className={styles.card}>
    <Image src={campaign.imageUrl} width={200} height={200} alt={campaign.title} className={styles.image} />
    <h2 className={styles.cardTitle}>{campaign.title}</h2>
    <p className={styles.price}>Price: ${campaign.price}</p>
    <p className={styles.description}>{campaign.description}</p>
    <p className={styles.raised}>Total Raised: ${campaign.totalRaised}</p>
 </div>
))}

        
              
            </div>
          </div>
        </div>
      </div>
     
        
    </>
  );

  const unloggedInView = (
    <>
     <Navbar/>
    
      <div className="login-container">
        <div className="background-glick">
          <div className="background-glick1">
          <Image src={ImageGlick} className="image-glick" alt="Logo Glick" />
          </div>
        </div>
        <div className="login-titulo">
        <h1>Glick Lab</h1>
        
        <div className="div-login">
        <button onClick={login} className="card1">
           Login
        </button>
        </div>
        </div>
        
       
      </div>
      <Footer />
    </>
  );


  return (
    <>
    <div className="view-documents">
      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
    </div>
    </>

  )
}