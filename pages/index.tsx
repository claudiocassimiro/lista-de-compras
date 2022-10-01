import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Header from './components/Header'
import SearchByProduct from './components/SearchByProduct'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.homePageContent}>
        <SearchByProduct />
      </div>
    </div>
  )
}

export default Home
