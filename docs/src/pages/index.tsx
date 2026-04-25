import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';


function HomepageHeader() {
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>Tukaze Documentation</span>
            <Heading as="h1" className={styles.heroTitle}>
              Bem Vindo  
            </Heading>
            <p className={styles.heroSubtitle}>
              Eu sou Lucas Tukaze e aqui estão documentados todos os meus projetos 
            </p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} to="/docs/Commit%20Crew/Ludarte%20Dashboard/ludarte">
                Explorar portfolio
              </Link>

            </div>

            <div className={styles.quickList}>
            </div>
          </div>

          <div className={styles.heroPanel}>
            <div className={styles.panelCard}>
              <p className={styles.panelLabel}>Projeto em destaque</p>
              <Heading as="h2" className={styles.panelTitle}>
                Ludarte Dashboard
              </Heading>


              <div className={styles.metrics}>
                <div className={styles.metric}>
                  <strong>4</strong>
                  <span>Areas documentadas</span>
                </div>
                <div className={styles.metric}>
                  <strong>Python</strong>
                  <span>Backend estruturado</span>
                </div>
                <div className={styles.metric}>
                  <strong>React</strong>
                  <span>Visual estilizado</span>
                </div>
              </div>
            </div>

            <div className={styles.noteCard}>
              <span className={styles.noteAccent} />
              <p>
                Foco em Desenvolvimento Backend e Estruturação de projetos 
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Tukaze Documentation"
      description="Portfolio de documentacao tecnica com foco em produto, arquitetura e clareza.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
