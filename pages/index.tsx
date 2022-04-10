import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useMoralis } from "react-moralis";

import NavBar from "../components/NavBar"

const Home: NextPage = () => {
  const { 
    authenticate, 
    isAuthenticated, 
    user,
  } = useMoralis();
  if (isAuthenticated) {
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
  }
  else {
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
}

export default Home
