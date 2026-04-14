import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './index';
import { PacienteProvider } from '../../../contexts/PacienteContext';

// Helper: envolve o componente no Provider real
function renderWithProvider(ui) {
  return render(<PacienteProvider>{ui}</PacienteProvider>);
}

describe('LoginForm', () => {
  it('deve renderizar os campos de carteirinha e senha', () => {
    renderWithProvider(<LoginForm />);

    expect(screen.getByPlaceholderText('Digite sua carteirinha')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument();
  });

  it('deve renderizar o botão "Entrar"', () => {
    renderWithProvider(<LoginForm />);
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('deve atualizar os campos ao digitar', async () => {
    const user = userEvent.setup();
    renderWithProvider(<LoginForm />);

    const campoCarteirinha = screen.getByPlaceholderText('Digite sua carteirinha');
    await user.type(campoCarteirinha, '0089234000012');

    expect(campoCarteirinha).toHaveValue('0089234000012');
  });

  it('não deve exibir mensagem de erro no estado inicial', () => {
    renderWithProvider(<LoginForm />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});