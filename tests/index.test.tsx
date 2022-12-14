import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Index from '../pages';
import { renderWithRedux } from '../utils/utilsTests';

describe(`Index`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
    window.localStorage.clear();
  });

  describe(`Test of user behavior`, () => {
    test(`the button to open modal of add product should be in the document`, () => {
      renderWithRedux(<Index />);

      expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();
    });

    test(`when the user clicks to open modal, should have a element with testid "close-button"`, async () => {
      renderWithRedux(<Index />);

      const openModalButton = screen.getByRole(`button`, {
        name: `Adicionar um Produto`,
      });

      expect(openModalButton).toBeInTheDocument();

      await waitFor(() => userEvent.click(openModalButton));

      expect(screen.getByTestId(`close-button`)).toBeInTheDocument();
    });

    describe(`empty state behavior`, () => {
      test(`if there is no product in the list, the empty state must be render`, async () => {
        renderWithRedux(<Index />);

        expect(screen.getByTestId(`empty-state`)).toBeInTheDocument();
      });

      test(`if there is a product in the list, empty state should not be render`, async () => {
        renderWithRedux(<Index />);

        const openModalButton = screen.getByRole(`button`, {
          name: `Adicionar um Produto`,
        });

        expect(openModalButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(openModalButton));

        expect(
          screen.getByPlaceholderText(`Nome do Produto`),
        ).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Preço`)).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Quantidade`)).toBeInTheDocument();

        const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
        const priceProductInput = screen.getByPlaceholderText(`Preço`);
        const quantityProductInput = screen.getByPlaceholderText(`Quantidade`);

        await waitFor(() => userEvent.type(nameProductInput, `feijão puro`));

        await waitFor(() => userEvent.type(priceProductInput, `10`));

        await waitFor(() => userEvent.type(quantityProductInput, `1`));

        const addProductButton = screen.getByRole(`button`, {
          name: `Adicionar`,
        });

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() =>
          userEvent.click(screen.getByTestId(`close-button`)),
        );

        expect(screen.queryByTestId(`empty-state`)).not.toBeInTheDocument();
      });

      test(`if there is no product in the list, the element with testid "content-info-about-app" must be render`, async () => {
        renderWithRedux(<Index />);

        expect(
          screen.getByTestId(`content-info-about-app`),
        ).toBeInTheDocument();
      });

      test(`if there is a product in the list, the element with testid "content-info-about-app" should not be render`, async () => {
        renderWithRedux(<Index />);

        const openModalButton = screen.getByRole(`button`, {
          name: `Adicionar um Produto`,
        });

        expect(openModalButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(openModalButton));

        expect(
          screen.getByPlaceholderText(`Nome do Produto`),
        ).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Preço`)).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Quantidade`)).toBeInTheDocument();

        const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
        const priceProductInput = screen.getByPlaceholderText(`Preço`);
        const quantityProductInput = screen.getByPlaceholderText(`Quantidade`);

        await waitFor(() => userEvent.type(nameProductInput, `feijão puro`));

        await waitFor(() => userEvent.type(priceProductInput, `10`));

        await waitFor(() => userEvent.type(quantityProductInput, `1`));

        const addProductButton = screen.getByRole(`button`, {
          name: `Adicionar`,
        });

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() =>
          userEvent.click(screen.getByTestId(`close-button`)),
        );

        expect(
          screen.queryByTestId(`content-info-about-app`),
        ).not.toBeInTheDocument();
      });
    });

    describe(`helpTags`, () => {
      test(`should have a element with testid "help-tags"`, async () => {
        renderWithRedux(<Index />);

        const openModalButton = screen.getByRole(`button`, {
          name: `Adicionar um Produto`,
        });

        expect(openModalButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(openModalButton));

        expect(await screen.findByTestId(`help-tags`)).toBeInTheDocument();
      });
    });

    describe(`save products behavior`, () => {
      test(`when the user click in button to open modal should have three inputs with placeholders "Nome do Produto", "Preço" and "Quantidade"`, async () => {
        renderWithRedux(<Index />);

        const openModalButton = screen.getByRole(`button`, {
          name: `Adicionar um Produto`,
        });

        expect(openModalButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(openModalButton));

        expect(
          screen.getByPlaceholderText(`Nome do Produto`),
        ).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Preço`)).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Quantidade`)).toBeInTheDocument();
      });

      test(`the user should can add products to list`, async () => {
        renderWithRedux(<Index />);

        const openModalButton = screen.getByRole(`button`, {
          name: `Adicionar um Produto`,
        });

        expect(openModalButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(openModalButton));

        expect(
          screen.getByPlaceholderText(`Nome do Produto`),
        ).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Preço`)).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Quantidade`)).toBeInTheDocument();

        await waitFor(() =>
          userEvent.type(
            screen.getByPlaceholderText(`Nome do Produto`),
            `feijão puro`,
          ),
        );

        await waitFor(() =>
          userEvent.type(screen.getByPlaceholderText(`Preço`), `10`),
        );

        await waitFor(() =>
          userEvent.type(screen.getByPlaceholderText(`Quantidade`), `1`),
        );

        const addProductButton = screen.getByRole(`button`, {
          name: `Adicionar`,
        });

        expect(addProductButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(addProductButton));

        expect(
          screen.getByPlaceholderText(`Nome do Produto`),
        ).toHaveTextContent(``);

        expect(screen.getByPlaceholderText(`Preço`)).toHaveTextContent(``);

        expect(screen.getByPlaceholderText(`Quantidade`)).toHaveTextContent(``);
      });

      test(`when the user save products, the products should renderWithRedux in the list`, async () => {
        renderWithRedux(<Index />);

        const openModalButton = screen.getByRole(`button`, {
          name: `Adicionar um Produto`,
        });

        expect(openModalButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(openModalButton));

        expect(
          screen.getByPlaceholderText(`Nome do Produto`),
        ).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Preço`)).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Quantidade`)).toBeInTheDocument();

        const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
        const priceProductInput = screen.getByPlaceholderText(`Preço`);
        const quantityProductInput = screen.getByPlaceholderText(`Quantidade`);

        await waitFor(() => userEvent.type(nameProductInput, `feijão puro`));

        await waitFor(() => userEvent.type(priceProductInput, `10`));

        await waitFor(() => userEvent.type(quantityProductInput, `1`));

        const addProductButton = screen.getByRole(`button`, {
          name: `Adicionar`,
        });

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() => userEvent.type(nameProductInput, `arroz`));

        await waitFor(() => userEvent.type(priceProductInput, `7`));

        await waitFor(() => userEvent.type(quantityProductInput, `2`));

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() =>
          userEvent.click(screen.getByTestId(`close-button`)),
        );

        const products = await screen.findAllByTestId(`products`);

        expect(products.length).toEqual(2);

        products.forEach((product) => {
          expect(product).toBeInTheDocument();
        });
      });

      test(`when the user save products, the footer with total of products and total price should be in the document`, async () => {
        renderWithRedux(<Index />);

        const openModalButton = screen.getByRole(`button`, {
          name: `Adicionar um Produto`,
        });

        expect(openModalButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(openModalButton));

        expect(
          screen.getByPlaceholderText(`Nome do Produto`),
        ).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Preço`)).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Quantidade`)).toBeInTheDocument();

        const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
        const priceProductInput = screen.getByPlaceholderText(`Preço`);
        const quantityProductInput = screen.getByPlaceholderText(`Quantidade`);

        await waitFor(() => userEvent.type(nameProductInput, `feijão puro`));

        await waitFor(() => userEvent.type(priceProductInput, `10`));

        await waitFor(() => userEvent.type(quantityProductInput, `1`));

        const addProductButton = screen.getByRole(`button`, {
          name: `Adicionar`,
        });

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() => userEvent.type(nameProductInput, `arroz`));

        await waitFor(() => userEvent.type(priceProductInput, `7`));

        await waitFor(() => userEvent.type(quantityProductInput, `2`));

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() =>
          userEvent.click(screen.getByTestId(`close-button`)),
        );

        const products = await screen.findAllByTestId(`products`);

        expect(products.length).toEqual(2);

        products.forEach((product) => {
          expect(product).toBeInTheDocument();
        });

        expect(screen.getByTestId(`footer`)).toBeInTheDocument();

        expect(screen.getByTestId(`total-products`)).toHaveTextContent(
          `Total de produtos: 3`,
        );

        expect(screen.getByTestId(`total-price`)).toHaveTextContent(
          `Total: R$ 24,00`,
        );
      });

      test(`when the user save products, and after remove a product, the values in footer should be updated`, async () => {
        renderWithRedux(<Index />);

        const openModalButton = screen.getByRole(`button`, {
          name: `Adicionar um Produto`,
        });

        expect(openModalButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(openModalButton));

        expect(
          screen.getByPlaceholderText(`Nome do Produto`),
        ).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Preço`)).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Quantidade`)).toBeInTheDocument();

        const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
        const priceProductInput = screen.getByPlaceholderText(`Preço`);
        const quantityProductInput = screen.getByPlaceholderText(`Quantidade`);

        await waitFor(() => userEvent.type(nameProductInput, `feijão puro`));

        await waitFor(() => userEvent.type(priceProductInput, `10`));

        await waitFor(() => userEvent.type(quantityProductInput, `1`));

        const addProductButton = screen.getByRole(`button`, {
          name: `Adicionar`,
        });

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() => userEvent.type(nameProductInput, `arroz`));

        await waitFor(() => userEvent.type(priceProductInput, `7`));

        await waitFor(() => userEvent.type(quantityProductInput, `2`));

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() =>
          userEvent.click(screen.getByTestId(`close-button`)),
        );

        const products = await screen.findAllByTestId(`products`);

        expect(products.length).toEqual(2);

        products.forEach((product) => {
          expect(product).toBeInTheDocument();
        });

        expect(screen.getByTestId(`footer`)).toBeInTheDocument();

        expect(screen.getByTestId(`total-products`)).toHaveTextContent(
          `Total de produtos: 3`,
        );

        expect(screen.getByTestId(`total-price`)).toHaveTextContent(
          `Total: R$ 24,00`,
        );

        await waitFor(() =>
          userEvent.click(screen.getAllByTestId(`delete-product`)[0]),
        );

        expect(screen.getByTestId(`total-products`)).toHaveTextContent(
          `Total de produtos: 2`,
        );

        expect(screen.getByTestId(`total-price`)).toHaveTextContent(
          `Total: R$ 14,00`,
        );
      });

      test(`when the user save products, should have an button on footer with testId equal to "clearlist-button-open-modal-button"`, async () => {
        renderWithRedux(<Index />);

        const openModalButton = screen.getByRole(`button`, {
          name: `Adicionar um Produto`,
        });

        expect(openModalButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(openModalButton));

        expect(
          screen.getByPlaceholderText(`Nome do Produto`),
        ).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Preço`)).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Quantidade`)).toBeInTheDocument();

        const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
        const priceProductInput = screen.getByPlaceholderText(`Preço`);
        const quantityProductInput = screen.getByPlaceholderText(`Quantidade`);

        await waitFor(() => userEvent.type(nameProductInput, `feijão puro`));

        await waitFor(() => userEvent.type(priceProductInput, `10`));

        await waitFor(() => userEvent.type(quantityProductInput, `1`));

        const addProductButton = screen.getByRole(`button`, {
          name: `Adicionar`,
        });

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() => userEvent.type(nameProductInput, `arroz`));

        await waitFor(() => userEvent.type(priceProductInput, `7`));

        await waitFor(() => userEvent.type(quantityProductInput, `2`));

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() =>
          userEvent.click(screen.getByTestId(`close-button`)),
        );

        const products = await screen.findAllByTestId(`products`);

        expect(products.length).toEqual(2);

        products.forEach((product) => {
          expect(product).toBeInTheDocument();
        });

        expect(screen.getByTestId(`footer`)).toBeInTheDocument();

        expect(
          screen.getByTestId(`clearlist-button-open-modal-button`),
        ).toBeInTheDocument();
      });

      test(`when the user save products, and clicks on button to clear list, should have an element with testId equal to "pop-up-to-clear-list"`, async () => {
        renderWithRedux(<Index />);

        const openModalButton = screen.getByRole(`button`, {
          name: `Adicionar um Produto`,
        });

        expect(openModalButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(openModalButton));

        expect(
          screen.getByPlaceholderText(`Nome do Produto`),
        ).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Preço`)).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Quantidade`)).toBeInTheDocument();

        const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
        const priceProductInput = screen.getByPlaceholderText(`Preço`);
        const quantityProductInput = screen.getByPlaceholderText(`Quantidade`);

        await waitFor(() => userEvent.type(nameProductInput, `feijão puro`));

        await waitFor(() => userEvent.type(priceProductInput, `10`));

        await waitFor(() => userEvent.type(quantityProductInput, `1`));

        const addProductButton = screen.getByRole(`button`, {
          name: `Adicionar`,
        });

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() => userEvent.type(nameProductInput, `arroz`));

        await waitFor(() => userEvent.type(priceProductInput, `7`));

        await waitFor(() => userEvent.type(quantityProductInput, `2`));

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() =>
          userEvent.click(screen.getByTestId(`close-button`)),
        );

        const products = await screen.findAllByTestId(`products`);

        expect(products.length).toEqual(2);

        products.forEach((product) => {
          expect(product).toBeInTheDocument();
        });

        expect(screen.getByTestId(`footer`)).toBeInTheDocument();

        const clearListButton = screen.getByTestId(
          `clearlist-button-open-modal-button`,
        );

        expect(clearListButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(clearListButton));

        expect(screen.getByTestId(`pop-up-to-clear-list`)).toBeInTheDocument();
      });

      test(`when the user save products, and clicks on button to clear list, should have to buttons on pop-up with testIds equals "yes-button" and "no-button"`, async () => {
        renderWithRedux(<Index />);

        const openModalButton = screen.getByRole(`button`, {
          name: `Adicionar um Produto`,
        });

        expect(openModalButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(openModalButton));

        expect(
          screen.getByPlaceholderText(`Nome do Produto`),
        ).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Preço`)).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Quantidade`)).toBeInTheDocument();

        const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
        const priceProductInput = screen.getByPlaceholderText(`Preço`);
        const quantityProductInput = screen.getByPlaceholderText(`Quantidade`);

        await waitFor(() => userEvent.type(nameProductInput, `feijão puro`));

        await waitFor(() => userEvent.type(priceProductInput, `10`));

        await waitFor(() => userEvent.type(quantityProductInput, `1`));

        const addProductButton = screen.getByRole(`button`, {
          name: `Adicionar`,
        });

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() => userEvent.type(nameProductInput, `arroz`));

        await waitFor(() => userEvent.type(priceProductInput, `7`));

        await waitFor(() => userEvent.type(quantityProductInput, `2`));

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() =>
          userEvent.click(screen.getByTestId(`close-button`)),
        );

        const products = await screen.findAllByTestId(`products`);

        expect(products.length).toEqual(2);

        products.forEach((product) => {
          expect(product).toBeInTheDocument();
        });

        expect(screen.getByTestId(`footer`)).toBeInTheDocument();

        const clearListButton = screen.getByTestId(
          `clearlist-button-open-modal-button`,
        );

        expect(clearListButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(clearListButton));

        expect(screen.getByTestId(`pop-up-to-clear-list`)).toBeInTheDocument();

        expect(screen.getByTestId(`yes-button`)).toBeInTheDocument();

        expect(screen.getByTestId(`no-button`)).toBeInTheDocument();
      });

      test(`when the user save products, and clicks on button to clear list, and clicks on "yes-button" the list should be cleaned`, async () => {
        renderWithRedux(<Index />);

        const openModalButton = screen.getByRole(`button`, {
          name: `Adicionar um Produto`,
        });

        expect(openModalButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(openModalButton));

        expect(
          screen.getByPlaceholderText(`Nome do Produto`),
        ).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Preço`)).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Quantidade`)).toBeInTheDocument();

        const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
        const priceProductInput = screen.getByPlaceholderText(`Preço`);
        const quantityProductInput = screen.getByPlaceholderText(`Quantidade`);

        await waitFor(() => userEvent.type(nameProductInput, `feijão puro`));

        await waitFor(() => userEvent.type(priceProductInput, `10`));

        await waitFor(() => userEvent.type(quantityProductInput, `1`));

        const addProductButton = screen.getByRole(`button`, {
          name: `Adicionar`,
        });

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() => userEvent.type(nameProductInput, `arroz`));

        await waitFor(() => userEvent.type(priceProductInput, `7`));

        await waitFor(() => userEvent.type(quantityProductInput, `2`));

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() =>
          userEvent.click(screen.getByTestId(`close-button`)),
        );

        const products = await screen.findAllByTestId(`products`);

        expect(products.length).toEqual(2);

        products.forEach((product) => {
          expect(product).toBeInTheDocument();
        });

        expect(screen.getByTestId(`footer`)).toBeInTheDocument();

        const clearListButton = screen.getByTestId(
          `clearlist-button-open-modal-button`,
        );

        expect(clearListButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(clearListButton));

        expect(screen.getByTestId(`pop-up-to-clear-list`)).toBeInTheDocument();

        const yesButton = screen.getByTestId(`yes-button`);

        expect(yesButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(yesButton));

        const listOfProducts = screen.queryAllByTestId(`products`);

        expect(listOfProducts.length).toEqual(0);
      });

      test(`when the user save products, and clicks on button to clear list, and clicks on "no-button" the list should keeping the products`, async () => {
        renderWithRedux(<Index />);

        const openModalButton = screen.getByRole(`button`, {
          name: `Adicionar um Produto`,
        });

        expect(openModalButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(openModalButton));

        expect(
          screen.getByPlaceholderText(`Nome do Produto`),
        ).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Preço`)).toBeInTheDocument();

        expect(screen.getByPlaceholderText(`Quantidade`)).toBeInTheDocument();

        const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
        const priceProductInput = screen.getByPlaceholderText(`Preço`);
        const quantityProductInput = screen.getByPlaceholderText(`Quantidade`);

        await waitFor(() => userEvent.type(nameProductInput, `feijão puro`));

        await waitFor(() => userEvent.type(priceProductInput, `10`));

        await waitFor(() => userEvent.type(quantityProductInput, `1`));

        const addProductButton = screen.getByRole(`button`, {
          name: `Adicionar`,
        });

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() => userEvent.type(nameProductInput, `arroz`));

        await waitFor(() => userEvent.type(priceProductInput, `7`));

        await waitFor(() => userEvent.type(quantityProductInput, `2`));

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() =>
          userEvent.click(screen.getByTestId(`close-button`)),
        );

        const products = await screen.findAllByTestId(`products`);

        expect(products.length).toEqual(2);

        products.forEach((product) => {
          expect(product).toBeInTheDocument();
        });

        expect(screen.getByTestId(`footer`)).toBeInTheDocument();

        const clearListButton = screen.getByTestId(
          `clearlist-button-open-modal-button`,
        );

        expect(clearListButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(clearListButton));

        expect(screen.getByTestId(`pop-up-to-clear-list`)).toBeInTheDocument();

        const noButton = screen.getByTestId(`no-button`);

        expect(noButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(noButton));

        const listOfProducts = screen.queryAllByTestId(`products`);

        expect(listOfProducts.length).toEqual(2);
      });
    });

    describe(`search for a product behavior`, () => {
      test(`without products in list, if the user search by a product, should return NotFound component`, async () => {
        renderWithRedux(<Index />);

        const searchInput = screen.getByPlaceholderText(
          `Pesquise um produto no carrinho`,
        );

        expect(searchInput).toBeInTheDocument();

        await waitFor(() => userEvent.type(searchInput, `feijão puro`));

        expect(screen.getByTestId(`not-found-component`)).toBeInTheDocument();

        expect(
          screen.queryByText(`Este item ainda não está em sua lista`),
        ).toBeInTheDocument();
      });

      test(`with products in list, if the user search by a product, should return only the serched product`, async () => {
        renderWithRedux(<Index />);

        expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();

        userEvent.click(
          screen.getByRole(`button`, { name: `Adicionar um Produto` }),
        );

        expect(
          await screen.findByPlaceholderText(`Nome do Produto`),
        ).toBeInTheDocument();

        expect(await screen.findByPlaceholderText(`Preço`)).toBeInTheDocument();

        expect(
          await screen.findByPlaceholderText(`Quantidade`),
        ).toBeInTheDocument();

        const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
        const priceProductInput = screen.getByPlaceholderText(`Preço`);
        const quantityProductInput = screen.getByPlaceholderText(`Quantidade`);

        await waitFor(() => userEvent.type(nameProductInput, `feijão puro`));

        await waitFor(() => userEvent.type(priceProductInput, `10`));

        await waitFor(() => userEvent.type(quantityProductInput, `1`));

        const addProductButton = screen.getByRole(`button`, {
          name: `Adicionar`,
        });

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() => userEvent.type(nameProductInput, `arroz`));

        await waitFor(() => userEvent.type(priceProductInput, `7`));

        await waitFor(() => userEvent.type(quantityProductInput, `2`));

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() =>
          userEvent.click(screen.getByTestId(`close-button`)),
        );

        const searchInput = screen.getByPlaceholderText(
          `Pesquise um produto no carrinho`,
        );

        expect(searchInput).toBeInTheDocument();

        await waitFor(() => userEvent.type(searchInput, `feijão puro`));

        expect(screen.getByText(`1 - feijão puro`)).toBeInTheDocument();

        expect(screen.queryByText(`2 - arroz`)).not.toBeInTheDocument();
      });

      test(`after searching for a product, the user can use back-button to back to the original list of products`, async () => {
        renderWithRedux(<Index />);

        expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();

        userEvent.click(
          screen.getByRole(`button`, { name: `Adicionar um Produto` }),
        );

        expect(
          await screen.findByPlaceholderText(`Nome do Produto`),
        ).toBeInTheDocument();

        expect(await screen.findByPlaceholderText(`Preço`)).toBeInTheDocument();

        expect(
          await screen.findByPlaceholderText(`Quantidade`),
        ).toBeInTheDocument();

        const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
        const priceProductInput = screen.getByPlaceholderText(`Preço`);
        const quantityProductInput = screen.getByPlaceholderText(`Quantidade`);

        await waitFor(() => userEvent.type(nameProductInput, `feijão puro`));

        await waitFor(() => userEvent.type(priceProductInput, `10`));

        await waitFor(() => userEvent.type(quantityProductInput, `1`));

        const addProductButton = screen.getByRole(`button`, {
          name: `Adicionar`,
        });

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() => userEvent.type(nameProductInput, `arroz`));

        await waitFor(() => userEvent.type(priceProductInput, `7`));

        await waitFor(() => userEvent.type(quantityProductInput, `2`));

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() =>
          userEvent.click(screen.getByTestId(`close-button`)),
        );

        const searchInput = screen.getByPlaceholderText(
          `Pesquise um produto no carrinho`,
        );

        expect(searchInput).toBeInTheDocument();

        await waitFor(() => userEvent.type(searchInput, `feijão puro`));

        expect(screen.getByText(`1 - feijão puro`)).toBeInTheDocument();

        expect(screen.queryByText(`2 - arroz`)).not.toBeInTheDocument();

        const backButton = screen.getByTestId(`back-button`);

        expect(backButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(backButton));

        expect(screen.getByText(`1 - feijão puro`)).toBeInTheDocument();

        expect(screen.getByText(`2 - arroz`)).toBeInTheDocument();
      });

      test(`after searching for a product, and the user use back-button to back to the original list of products the search input should be empty`, async () => {
        renderWithRedux(<Index />);

        expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();

        userEvent.click(
          screen.getByRole(`button`, { name: `Adicionar um Produto` }),
        );

        expect(
          await screen.findByPlaceholderText(`Nome do Produto`),
        ).toBeInTheDocument();

        expect(await screen.findByPlaceholderText(`Preço`)).toBeInTheDocument();

        expect(
          await screen.findByPlaceholderText(`Quantidade`),
        ).toBeInTheDocument();

        const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
        const priceProductInput = screen.getByPlaceholderText(`Preço`);
        const quantityProductInput = screen.getByPlaceholderText(`Quantidade`);

        await waitFor(() => userEvent.type(nameProductInput, `feijão puro`));

        await waitFor(() => userEvent.type(priceProductInput, `10`));

        await waitFor(() => userEvent.type(quantityProductInput, `1`));

        const addProductButton = screen.getByRole(`button`, {
          name: `Adicionar`,
        });

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() => userEvent.type(nameProductInput, `arroz`));

        await waitFor(() => userEvent.type(priceProductInput, `7`));

        await waitFor(() => userEvent.type(quantityProductInput, `2`));

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() =>
          userEvent.click(screen.getByTestId(`close-button`)),
        );

        const searchInput = screen.getByPlaceholderText(
          `Pesquise um produto no carrinho`,
        );

        expect(searchInput).toBeInTheDocument();

        await waitFor(() => userEvent.type(searchInput, `feijão puro`));

        expect(screen.getByText(`1 - feijão puro`)).toBeInTheDocument();

        expect(screen.queryByText(`2 - arroz`)).not.toBeInTheDocument();

        const backButton = screen.getByTestId(`back-button`);

        expect(backButton).toBeInTheDocument();

        await waitFor(() => userEvent.click(backButton));

        expect(screen.getByText(`1 - feijão puro`)).toBeInTheDocument();

        expect(screen.getByText(`2 - arroz`)).toBeInTheDocument();

        expect(searchInput).toHaveTextContent(``);
      });

      test(`after searching for a product, the user can delete a specific product in the filtered list`, async () => {
        renderWithRedux(<Index />);

        expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();

        userEvent.click(
          screen.getByRole(`button`, { name: `Adicionar um Produto` }),
        );

        expect(
          await screen.findByPlaceholderText(`Nome do Produto`),
        ).toBeInTheDocument();

        expect(await screen.findByPlaceholderText(`Preço`)).toBeInTheDocument();

        expect(
          await screen.findByPlaceholderText(`Quantidade`),
        ).toBeInTheDocument();

        const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
        const priceProductInput = screen.getByPlaceholderText(`Preço`);
        const quantityProductInput = screen.getByPlaceholderText(`Quantidade`);

        await waitFor(() => userEvent.type(nameProductInput, `feijão puro`));

        await waitFor(() => userEvent.type(priceProductInput, `10`));

        await waitFor(() => userEvent.type(quantityProductInput, `1`));

        const addProductButton = screen.getByRole(`button`, {
          name: `Adicionar`,
        });

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() => userEvent.type(nameProductInput, `arroz`));

        await waitFor(() => userEvent.type(priceProductInput, `7`));

        await waitFor(() => userEvent.type(quantityProductInput, `2`));

        await waitFor(() => userEvent.click(addProductButton));

        await waitFor(() =>
          userEvent.click(screen.getByTestId(`close-button`)),
        );

        const searchInput = screen.getByPlaceholderText(
          `Pesquise um produto no carrinho`,
        );

        expect(searchInput).toBeInTheDocument();

        await waitFor(() => userEvent.type(searchInput, `feijão puro`));

        expect(screen.getByText(`1 - feijão puro`)).toBeInTheDocument();

        expect(screen.queryByText(`2 - arroz`)).not.toBeInTheDocument();

        await waitFor(() =>
          userEvent.click(screen.getByTestId(`delete-product`)),
        );

        expect(screen.getByText(`2 - arroz`)).toBeInTheDocument();

        expect(screen.queryByText(`1 - feijão puro`)).not.toBeInTheDocument();

        expect(searchInput).toHaveTextContent(``);
      });
    });
  });
});
