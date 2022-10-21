import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddProductModal from '..';

describe(`AddProductModal`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  const mockProps = {
    handleProducts: jest.fn(),
  };

  describe(`when the component is called, should have`, () => {
    test(`button to open modal of add product with the text "Adicionar um Produto"`, () => {
      render(<AddProductModal {...mockProps} />);

      expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();
    });

    test(`when the button to open modal is clicked, the modal should be rendered and have a text "Adicione um Produto"`, async () => {
      render(<AddProductModal {...mockProps} />);

      expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();

      userEvent.click(screen.getByText(`Adicionar um Produto`));

      expect(
        await screen.findByText(`Adicione um Produto`),
      ).toBeInTheDocument();
    });

    test(`when the modal is open should have a input with the placeholder text "Nome do Produto"`, async () => {
      render(<AddProductModal {...mockProps} />);

      expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();

      userEvent.click(screen.getByText(`Adicionar um Produto`));

      expect(
        await screen.findByPlaceholderText(`Nome do Produto`),
      ).toBeInTheDocument();
    });

    test(`when the modal is open should have a input checkbox with the label text "Esse produto é vendido por KG?"`, async () => {
      render(<AddProductModal {...mockProps} />);

      expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();

      userEvent.click(screen.getByText(`Adicionar um Produto`));

      expect(
        await screen.findByLabelText(`Esse produto é vendido por KG?`),
      ).toBeInTheDocument();
    });

    test(`when the modal is open should have a input with the placeholder text "Preço do Produto"`, async () => {
      render(<AddProductModal {...mockProps} />);

      expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();

      userEvent.click(screen.getByText(`Adicionar um Produto`));

      expect(
        await screen.findByPlaceholderText(`Preço do Produto`),
      ).toBeInTheDocument();
    });

    test(`when the modal is open should have a input with the placeholder text "Quantidade do Produto"`, async () => {
      render(<AddProductModal {...mockProps} />);

      expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();

      userEvent.click(screen.getByText(`Adicionar um Produto`));

      expect(
        await screen.findByPlaceholderText(`Quantidade do Produto`),
      ).toBeInTheDocument();
    });

    describe(`with the modal open, if the user clicks on input checkbox`, () => {
      test(`the input with placeholder "Preço do Produto" should be "Preço do Produto por KG"`, async () => {
        render(<AddProductModal {...mockProps} />);

        expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();

        userEvent.click(screen.getByText(`Adicionar um Produto`));

        expect(
          await screen.findByLabelText(`Esse produto é vendido por KG?`),
        ).toBeInTheDocument();

        userEvent.click(
          screen.getByLabelText(`Esse produto é vendido por KG?`),
        );

        await waitFor(() =>
          expect(
            screen.queryByPlaceholderText(`Preço do Produto`),
          ).not.toBeInTheDocument(),
        );

        expect(
          await screen.findByPlaceholderText(`Preço do Produto por KG`),
        ).toBeInTheDocument();
      });

      test(`the input with placeholder "Quantidade do Produto" should be "Quantidade do Produto por KG"`, async () => {
        render(<AddProductModal {...mockProps} />);

        expect(screen.getByText(`Adicionar um Produto`)).toBeInTheDocument();

        userEvent.click(screen.getByText(`Adicionar um Produto`));

        expect(
          await screen.findByLabelText(`Esse produto é vendido por KG?`),
        ).toBeInTheDocument();

        userEvent.click(
          screen.getByLabelText(`Esse produto é vendido por KG?`),
        );

        await waitFor(() =>
          expect(
            screen.queryByPlaceholderText(`Quantidade do Produto`),
          ).not.toBeInTheDocument(),
        );

        expect(
          await screen.findByPlaceholderText(`Quantidade do Produto por KG`),
        ).toBeInTheDocument();
      });
    });
  });
});
