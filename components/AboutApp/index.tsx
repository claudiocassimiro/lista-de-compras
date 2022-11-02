import styles from './styles.module.css';

export default function AboutApp() {
  return (
    <div className={styles.homePageContentAboutApp}>
      <h2 className={styles.homePageAboutAppTitle}>Sobre o App</h2>
      <p className={styles.homePageAboutAppParagraph}>
        O App Meu Carrinho, foi desenvolvido na intenção de facilitar a sua ida
        ao mercado, nele você consegue adicionar todos os produtos que você está
        colocando no seu carrinho físico, além de adicionar a quantidade e o
        preço do produto, para não ter surpresas no final da compra, o
        diferencial vem agora, ao ativar as notificações, você recebera ofertas
        de nossos estabelecimentos parceiros na palma da sua mão, fazendo com
        que você economize dinheiro nas compras. É ou não é uma maravilha?
      </p>
    </div>
  );
}
