import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Index from '../pages';

describe(`Index`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  describe(`Test of user behavior`, () => {
    test(`the button to open modal of add product should be in the document`, () => {
      render(<Index />);

      expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();
    });

    test(`should have a element with testid "close-button"`, async () => {
      render(<Index />);

      const openModalButton = screen.getByRole(`button`, {
        name: `Adicionar um Produto`,
      });

      expect(openModalButton).toBeInTheDocument();

      userEvent.click(openModalButton);

      expect(await screen.findByTestId(`close-button`)).toBeInTheDocument();
    });

    test(`when the user click in button to open modal should have three inputs with placeholders "Nome do Produto", "Preço do Produto" and "Quantidade do Produto"`, async () => {
      render(<Index />);

      const openModalButton = screen.getByRole(`button`, {
        name: `Adicionar um Produto`,
      });

      expect(openModalButton).toBeInTheDocument();

      userEvent.click(openModalButton);

      expect(
        await screen.findByPlaceholderText(`Nome do Produto`),
      ).toBeInTheDocument();

      expect(
        await screen.findByPlaceholderText(`Preço do Produto`),
      ).toBeInTheDocument();

      expect(
        await screen.findByPlaceholderText(`Quantidade do Produto`),
      ).toBeInTheDocument();
    });

    test(`the user should can add products to list`, async () => {
      render(<Index />);

      const openModalButton = screen.getByRole(`button`, {
        name: `Adicionar um Produto`,
      });

      expect(openModalButton).toBeInTheDocument();

      userEvent.click(openModalButton);

      expect(
        await screen.findByPlaceholderText(`Nome do Produto`),
      ).toBeInTheDocument();

      expect(
        await screen.findByPlaceholderText(`Preço do Produto`),
      ).toBeInTheDocument();

      expect(
        await screen.findByPlaceholderText(`Quantidade do Produto`),
      ).toBeInTheDocument();

      await waitFor(() =>
        userEvent.type(
          screen.getByPlaceholderText(`Nome do Produto`),
          `feijão puro`,
        ),
      );

      await waitFor(() =>
        userEvent.type(screen.getByPlaceholderText(`Preço do Produto`), `10`),
      );

      await waitFor(() =>
        userEvent.type(
          screen.getByPlaceholderText(`Quantidade do Produto`),
          `1`,
        ),
      );

      const addProductButton = screen.getByRole(`button`, {
        name: `Adicionar`,
      });

      expect(addProductButton).toBeInTheDocument();

      await waitFor(() => userEvent.click(addProductButton));

      expect(screen.getByPlaceholderText(`Nome do Produto`)).toHaveTextContent(
        ``,
      );

      expect(screen.getByPlaceholderText(`Preço do Produto`)).toHaveTextContent(
        ``,
      );

      expect(
        screen.getByPlaceholderText(`Quantidade do Produto`),
      ).toHaveTextContent(``);
    });

    test(`when the user save products, the products should render in the list`, async () => {
      render(<Index />);

      const openModalButton = screen.getByRole(`button`, {
        name: `Adicionar um Produto`,
      });

      expect(openModalButton).toBeInTheDocument();

      userEvent.click(openModalButton);

      expect(
        await screen.findByPlaceholderText(`Nome do Produto`),
      ).toBeInTheDocument();

      expect(
        await screen.findByPlaceholderText(`Preço do Produto`),
      ).toBeInTheDocument();

      expect(
        await screen.findByPlaceholderText(`Quantidade do Produto`),
      ).toBeInTheDocument();

      const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
      const priceProductInput = screen.getByPlaceholderText(`Preço do Produto`);
      const quantityProductInput = screen.getByPlaceholderText(
        `Quantidade do Produto`,
      );

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

      await waitFor(() => userEvent.click(screen.getByTestId(`close-button`)));

      const products = await screen.findAllByTestId(`products`);

      expect(products.length).toEqual(2);

      products.forEach((product) => {
        expect(product).toBeInTheDocument();
      });
    });

    test(`with products in list, if the user search by product should return only the serched product`, async () => {
      render(<Index />);

      expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();

      userEvent.click(
        screen.getByRole(`button`, { name: `Adicionar um Produto` }),
      );

      expect(
        await screen.findByPlaceholderText(`Nome do Produto`),
      ).toBeInTheDocument();

      expect(
        await screen.findByPlaceholderText(`Preço do Produto`),
      ).toBeInTheDocument();

      expect(
        await screen.findByPlaceholderText(`Quantidade do Produto`),
      ).toBeInTheDocument();

      const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
      const priceProductInput = screen.getByPlaceholderText(`Preço do Produto`);
      const quantityProductInput = screen.getByPlaceholderText(
        `Quantidade do Produto`,
      );

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

      await waitFor(() => userEvent.click(screen.getByTestId(`close-button`)));

      const searchInput = screen.getByPlaceholderText(
        `Pesquise um produto na lista`,
      );

      expect(searchInput).toBeInTheDocument();

      await waitFor(() => userEvent.type(searchInput, `feijão puro`));

      expect(screen.getByText(`feijão puro`)).toBeInTheDocument();

      expect(screen.queryByText(`arroz`)).not.toBeInTheDocument();
    });

    test(`after searching for a product, the user can use back-button to back to the original list of products`, async () => {
      render(<Index />);

      expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();

      userEvent.click(
        screen.getByRole(`button`, { name: `Adicionar um Produto` }),
      );

      expect(
        await screen.findByPlaceholderText(`Nome do Produto`),
      ).toBeInTheDocument();

      expect(
        await screen.findByPlaceholderText(`Preço do Produto`),
      ).toBeInTheDocument();

      expect(
        await screen.findByPlaceholderText(`Quantidade do Produto`),
      ).toBeInTheDocument();

      const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
      const priceProductInput = screen.getByPlaceholderText(`Preço do Produto`);
      const quantityProductInput = screen.getByPlaceholderText(
        `Quantidade do Produto`,
      );

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

      await waitFor(() => userEvent.click(screen.getByTestId(`close-button`)));

      const searchInput = screen.getByPlaceholderText(
        `Pesquise um produto na lista`,
      );

      expect(searchInput).toBeInTheDocument();

      await waitFor(() => userEvent.type(searchInput, `feijão puro`));

      expect(screen.getByText(`feijão puro`)).toBeInTheDocument();

      expect(screen.queryByText(`arroz`)).not.toBeInTheDocument();

      const backButton = screen.getByTestId(`back-button`);

      expect(backButton).toBeInTheDocument();

      await waitFor(() => userEvent.click(backButton));

      expect(screen.getByText(`feijão puro`)).toBeInTheDocument();

      expect(screen.getByText(`arroz`)).toBeInTheDocument();
    });

    test(`after searching for a product, and the user use back-button to back to the original list of products the search input should be empty`, async () => {
      render(<Index />);

      expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();

      userEvent.click(
        screen.getByRole(`button`, { name: `Adicionar um Produto` }),
      );

      expect(
        await screen.findByPlaceholderText(`Nome do Produto`),
      ).toBeInTheDocument();

      expect(
        await screen.findByPlaceholderText(`Preço do Produto`),
      ).toBeInTheDocument();

      expect(
        await screen.findByPlaceholderText(`Quantidade do Produto`),
      ).toBeInTheDocument();

      const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
      const priceProductInput = screen.getByPlaceholderText(`Preço do Produto`);
      const quantityProductInput = screen.getByPlaceholderText(
        `Quantidade do Produto`,
      );

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

      await waitFor(() => userEvent.click(screen.getByTestId(`close-button`)));

      const searchInput = screen.getByPlaceholderText(
        `Pesquise um produto na lista`,
      );

      expect(searchInput).toBeInTheDocument();

      await waitFor(() => userEvent.type(searchInput, `feijão puro`));

      expect(screen.getByText(`feijão puro`)).toBeInTheDocument();

      expect(screen.queryByText(`arroz`)).not.toBeInTheDocument();

      const backButton = screen.getByTestId(`back-button`);

      expect(backButton).toBeInTheDocument();

      await waitFor(() => userEvent.click(backButton));

      expect(screen.getByText(`feijão puro`)).toBeInTheDocument();

      expect(screen.getByText(`arroz`)).toBeInTheDocument();

      expect(searchInput).toHaveTextContent(``);
    });

    test(`after searching for a product, the user can delete a specific product in the filtered list`, async () => {
      render(<Index />);

      expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();

      userEvent.click(
        screen.getByRole(`button`, { name: `Adicionar um Produto` }),
      );

      expect(
        await screen.findByPlaceholderText(`Nome do Produto`),
      ).toBeInTheDocument();

      expect(
        await screen.findByPlaceholderText(`Preço do Produto`),
      ).toBeInTheDocument();

      expect(
        await screen.findByPlaceholderText(`Quantidade do Produto`),
      ).toBeInTheDocument();

      const nameProductInput = screen.getByPlaceholderText(`Nome do Produto`);
      const priceProductInput = screen.getByPlaceholderText(`Preço do Produto`);
      const quantityProductInput = screen.getByPlaceholderText(
        `Quantidade do Produto`,
      );

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

      await waitFor(() => userEvent.click(screen.getByTestId(`close-button`)));

      const searchInput = screen.getByPlaceholderText(
        `Pesquise um produto na lista`,
      );

      expect(searchInput).toBeInTheDocument();

      await waitFor(() => userEvent.type(searchInput, `feijão puro`));

      expect(screen.getByText(`feijão puro`)).toBeInTheDocument();

      expect(screen.queryByText(`arroz`)).not.toBeInTheDocument();

      await waitFor(() =>
        userEvent.click(screen.getByTestId(`delete-product`)),
      );

      expect(screen.getByText(`arroz`)).toBeInTheDocument();

      expect(screen.queryByText(`feijão puro`)).not.toBeInTheDocument();

      expect(searchInput).toHaveTextContent(``);
    });
  });
});
