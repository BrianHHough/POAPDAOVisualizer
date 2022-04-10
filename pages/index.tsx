import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useMoralis } from "react-moralis";
import useSWR from 'swr';
import NavBar from "../components/NavBar"
import LinearProgress from '@mui/material/LinearProgress';
import React, {useState} from "react";

// Imagery
import Logo_POAPDAOVisualizer from "../assets/logo-POAP-NFT-Visualizer.png"
import Logo_Covalent from "../assets/logo-covalent.webp"

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Home({data: any}: any) {
  const { 
    authenticate, 
    isAuthenticated, 
    user,
  } = useMoralis();

  const [activePage, setActivePage] = useState(1);

  const userAddress = user?.get("ethAddress");
  const chainID = 1;
  const cryptoCoins = `https://api.covalenthq.com/v1/${ chainID }/address/${ userAddress }/portfolio_v2/?key=${
    process.env.NEXT_PUBLIC_COVALENT_API_KEY
  }`
  const { data: coins, error } = useSWR(cryptoCoins, fetcher);


  const userAddress2 = "0xb0419291B62b2D31e12CDe1572280dC328CBb831";
  const userNFTs = `https://api.covalenthq.com/v1/${ chainID }/address/${ userAddress }/transactions_v2/?key=${
    process.env.NEXT_PUBLIC_COVALENT_API_KEY
  }`
  const { data: nfts } = useSWR(userNFTs, fetcher);
  {console.log(nfts)}
  
  
  
  // Return States

  if (!coins) return (
    <div 
      style={{fill: "background: linear-gradient(45deg, #5d00ff94, #e5aec8a3 )", backgroundColor: "background: linear-gradient(45deg, #5d00ff94, #e5aec8a3 )", color: "black", height: "100vh"}}>
      <div style={{fill: "background: linear-gradient(45deg, #5d00ff94, #e5aec8a3 )", backgroundColor: "background: linear-gradient(45deg, #5d00ff94, #e5aec8a3 )",fontSize: "200pt", width: "100vw"}}>
        <LinearProgress color="success" />
      </div>
      <h1 style={{color: "white"}}>Loading Your Web3 Footprint...</h1>
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

        <div className="DashboardSelectItemCon">
        <div className="DashboardSelectItem" onClick={() => setActivePage(1)}>
          <h2>My Cryptocurrencies</h2>
          <div className="PoweredByCon">
          <h4>Powered by: </h4> 
          <div className="Logo">
            <Image src={Logo_Covalent}  alt="Covalent"/>
          </div>
        </div>
        </div>

        <div className="DashboardSelectItem" onClick={() => setActivePage(2)}>
          <h2>My NFTs</h2>
          <div className="PoweredByCon">
          <h4>Powered by: </h4> 
          <div className="Logo">
            <Image src={Logo_Covalent}  alt="Covalent"/>
          </div>
        </div>
        </div>
        </div>

        {activePage === 1 ?
        <>
        <div style={{display: "flex"}}>
        {coins.data.items.map((coin: any) => (
          <div 
            key={coins.id}
            className="CoinItem"
          >
            <div className="CoinItemLogo">
              <Image 
                src={coin.logo_url} 
                // src={coins.data.items.logo_url} 
                alt="CryptoCurrency logo"
                width="50px"
                height="50px"
              />
            </div>
            
            <h2 className="CoinItemTitle">{"$"}{coin.contract_ticker_symbol}</h2>
            <h4 className="CoinItemTitle">{coin.contract_name}</h4>
            {coin.contract_ticker_symbol === "ETH" ?
            <>
            <h1 
            className="CoinItemHoldingsEth" style={{fontSize: "30pt"}}>{(coin.holdings[0].close.balance.substring(0,4)*0.000001)}
            </h1>
            <h2 className="CoinItemHoldingsUSD">{"$"}{JSON.stringify(coin.holdings[0].close.quote).substring(0,5)}</h2>
            </>
            : 
            null
            }
            {coin.contract_ticker_symbol === "HEX" ?
            <>
            <h1 
            className="CoinItemHoldings">{(coin.holdings[0].close.balance.substring(0,4)*0.1)}
            </h1>
            <h2 className="CoinItemHoldingsUSD">{"$"}{JSON.stringify(coin.holdings[0].close.quote).substring(0,5)}</h2>
            </>
            : 
            null
            }

            {coin.contract_ticker_symbol === "DAI" ?
            <>
            <h1 
            className="CoinItemHoldings">{(coin.holdings[0].close.balance.substring(0,4)*0.001)}
            </h1>
            <h2 className="CoinItemHoldingsUSD">{"$"}{JSON.stringify(coin.holdings[0].close.quote).substring(0,5)}</h2>
            </>
            : 
            null
            }

            {coin.contract_ticker_symbol === "SAI" ?
            <>
            <h1 
            className="CoinItemHoldings">{(coin.holdings[0].close.balance.substring(0,4)*0.001)}
            </h1>
            <h2 className="CoinItemHoldingsUSD">{"$"}{JSON.stringify(coin.holdings[0].close.quote).substring(0,5)}</h2>
            </>
            : 
            null
            }

            {/* <h1 className="CoinItemHoldings">{(coin.holdings[0].close.balance.substring(0,4) * 0.00000000000000000103)}</h1> */}
          </div>
        ))}
        </div>
        </>
        : 
        null
        }

        {activePage === 2 ?
        <>
        <div style={{display: "flex"}}>
        {coins.data.items.map((coin: any) => (
          <div 
            key={coins.id}
            className="CoinItem"
          >
            <div className="CoinItemLogo">
              <Image 
                src={coin.logo_url} 
                // src={coins.data.items.logo_url} 
                alt="CryptoCurrency logo"
                width="50px"
                height="50px"
              />
            </div>
            
            <h2 className="CoinItemTitle">{"$"}{coin.contract_ticker_symbol}</h2>
            <h4 className="CoinItemTitle">{coin.contract_name}</h4>
            {coin.contract_ticker_symbol === "ETH" ?
            <>
            <h1 
            className="CoinItemHoldingsEth" style={{fontSize: "30pt"}}>{(coin.holdings[0].close.balance.substring(0,4)*0.000001)}
            </h1>
            <h2 className="CoinItemHoldingsUSD">{"$"}{JSON.stringify(coin.holdings[0].close.quote).substring(0,5)}</h2>
            </>
            : 
            null
            }
            {coin.contract_ticker_symbol === "HEX" ?
            <>
            <h1 
            className="CoinItemHoldings">{(coin.holdings[0].close.balance.substring(0,4)*0.1)}
            </h1>
            <h2 className="CoinItemHoldingsUSD">{"$"}{JSON.stringify(coin.holdings[0].close.quote).substring(0,5)}</h2>
            </>
            : 
            null
            }

            {coin.contract_ticker_symbol === "DAI" ?
            <>
            <h1 
            className="CoinItemHoldings">{(coin.holdings[0].close.balance.substring(0,4)*0.001)}
            </h1>
            <h2 className="CoinItemHoldingsUSD">{"$"}{JSON.stringify(coin.holdings[0].close.quote).substring(0,5)}</h2>
            </>
            : 
            null
            }

            {coin.contract_ticker_symbol === "SAI" ?
            <>
            <h1 
            className="CoinItemHoldings">{(coin.holdings[0].close.balance.substring(0,4)*0.001)}
            </h1>
            <h2 className="CoinItemHoldingsUSD">{"$"}{JSON.stringify(coin.holdings[0].close.quote).substring(0,5)}</h2>
            </>
            : 
            null
            }

            {/* <h1 className="CoinItemHoldings">{(coin.holdings[0].close.balance.substring(0,4) * 0.00000000000000000103)}</h1> */}
          </div>
        ))}
        </div>
        </>
        : 
        null
        }

        {console.log(coins)}
        {console.log(coins.data.items[0].logo_url)}


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
        <Image src={Logo_POAPDAOVisualizer} height="150px" width="150px" alt="My Hack" style={{borderRadius: "360px"}}></Image>
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


