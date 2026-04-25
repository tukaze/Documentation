import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  kicker: string;
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    kicker: 'Clareza',
    title: 'Documentacao que explica decisoes, nao so telas.',
    description: (
      <>
        Cada pagina foi pensada para mostrar contexto, objetivo, stack,
        estrutura e fluxo tecnico.
      </>
    ),
  },
  {
    kicker: 'Portfolio',
    title: 'Projetos organizados como casos de estudo reais.',
    description: (
      <>
        O conteudo aqui foi desenvolvido tanto para fins academicos quanto comerciais
      </>
    ),
  },
  {
    kicker: 'Leitura',
    title: 'Visual Interativo para conhecer meus projetos.',
    description: (
      <>
        A interface foi desenvolvida com base no Docusaurus um software de codigo aberto.
      </>
    ),
  },
];

function FeatureCard({kicker, title, description}: FeatureItem) {
  return (
    <article className={styles.card}>
      <span className={styles.kicker}>{kicker}</span>
      <Heading as="h3" className={styles.title}>
        {title}
      </Heading>
      <p className={styles.description}>{description}</p>
    </article>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.wrapper}>
      <div className="container">
        <div className={styles.intro}>
          <span className={styles.sectionLabel}>Portifolio</span>
          <Heading as="h2" className={styles.sectionTitle}>
            Acervo de todos os meus projetos criados 
          </Heading>
          <p className={styles.sectionText}>
            A proposta do Tukaze Documentation e unir documentacao de tudo que foi criado e aplicado por mim
          </p>
        </div>

        <div className={styles.grid}>
          {FeatureList.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
