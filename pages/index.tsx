import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useMoralis } from "react-moralis";
import useSWR from 'swr';
import NavBar from "../components/NavBar"
import LinearProgress from '@mui/material/LinearProgress';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Home({data: any}: any) {
  const { 
    authenticate, 
    isAuthenticated, 
    user,
  } = useMoralis();
  const userAddress = user?.get("ethAddress");
  const chainID = 1;
  const covalentUserData = `https://api.covalenthq.com/v1/${ chainID }/address/${ userAddress }/portfolio_v2/?key=${
    process.env.NEXT_PUBLIC_COVALENT_API_KEY
  }`
  const { data, error } = useSWR(covalentUserData, fetcher);
  {console.log(data)}
  // Return States

  if (!data) return (
    <div 
      style={{fill: "background: linear-gradient(45deg, #5d00ff94, #e5aec8a3 )", backgroundColor: "background: linear-gradient(45deg, #5d00ff94, #e5aec8a3 )", color: "black", height: "100vh"}}>
      <div style={{color: "white", fontSize: "200pt", width: "100vw"}}>
        <LinearProgress />
      </div>
      <h1 style={{color: "white"}}>Loading Your Web3 Footprint...</h1>
        {console.log(data)}
    </div>)
  if (isAuthenticated)
  return (
    <div className={styles.container}>
      <Head>
        <title>POAPDAOVisualizer</title>
        <meta name="description" content="Visualizer of a DAO's POAPs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <NavBar/>
        <h1>
          See my web3 dao footprint
        </h1>


        <p className={styles.description}>
          
        </p>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/brianhhough"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by{' '}
          <span style={{marginLeft: "4px", fontWeight: "700"}}>
            brianhuff.eth
          </span>
        </a>
      </footer>
    </div>
    )
  if (!isAuthenticated)
    return (
      <div className={styles.container}>
      <Head>
        <title>POAPDAOVisualizer</title>
        <meta name="description" content="Visualizer of a DAO's POAPs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to POAP DAO Visualizer
        </h1>

        <p className={styles.description}>
          
          <code className={styles.code}>Visualize your web3 contributor footprint</code>
        </p>
        <button className="ConnectButton" onClick={() => authenticate({signingMessage:"Welcome to POAP DAO Visualizer! Sign in with your Metamask wallet with a gas-less, free transaction to get started."})}>Connect</button>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/brianhhough"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by{' '}
          <span style={{marginLeft: "4px", fontWeight: "700"}}>
            brianhuff.eth
          </span>
        </a>
      </footer>
    </div>

    )
}


