import styles from './styles.module.css';

export default function AboutUs() {
  return (
    <div className={styles.homePageContentAboutUs}>
      <h2 className={styles.homePageAboutUsTitle}>Quem Somos</h2>
      <p className={styles.homePageAboutUsParagraph}>
        Somos um grupo de devs apaixonados por tecnologia e nosso principal
        foco, é, por meio desse produto, entregar valor aos nossos clientes.
        Trabalhamos sempre pensando no cliente em primeiro lugar. Todas as
        funcionalidades desenvolvidas nesse app foi pensando na fácil
        usabilidade da aplicação, pensando em deixar o app mais fluido e
        intuitivo para pessoas sem muita experiencia com esse mundo incrível de
        facilidades que a tecnologia nos proporciona.
      </p>
      <h3 className={styles.homePageAboutUsSubTitle}>
        Nos encontre nas redes sociais
      </h3>
      <div className={styles.homePageSocialMediaContainer}>
        <p className={styles.homePageAboutUsSocialMediaParagraph}>
          <a
            href="https://www.linkedin.com/in/claudiocassimiro/"
            target="_blank"
            rel="noreferrer"
          >
            Claudio Cassimiro
          </a>
        </p>
        <p className={styles.homePageAboutUsSocialMediaParagraph}>
          <a
            href="https://www.linkedin.com/in/arthur-lemos-aa3327239/"
            target="_blank"
            rel="noreferrer"
          >
            Arthur Lemos
          </a>
        </p>
        <p className={styles.homePageAboutUsSocialMediaParagraph}>
          <a
            href="https://www.linkedin.com/in/vitor-hugo-dino/"
            target="_blank"
            rel="noreferrer"
          >
            Vitor Hugo
          </a>
        </p>
      </div>
    </div>
  );
}
