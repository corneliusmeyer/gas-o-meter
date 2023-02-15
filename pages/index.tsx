import type {GetServerSideProps, NextPage} from 'next'
import Page from "../components/Page";

const Home: NextPage = () => {
  return (
      <Page title="Überblick">
        <h1>Hallo</h1>
      </Page>
  )
}


export default Home;
