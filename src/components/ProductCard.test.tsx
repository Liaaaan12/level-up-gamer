import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductCard from './ProductCard';
import { CartContext } from '../context/cartContext';
import type { Product } from '../types';
import { BrowserRouter } from 'react-router-dom';

// Producto de prueba
const mockProduct: Product = {
  codigo: "TEST001",
  categoria: "Juegos de Prueba",
  nombre: "Juego de Test",
  precio: "$99.990 CLP",
  descripcion: "Esta es una descripción de prueba.",
  imagen: "test.jpg"
};

// Mock del hook useCart
const mockAddItem = vi.fn();
const mockCartContext = {
  items: [],
  addItem: mockAddItem,
  removeItem: vi.fn(),
  updateQuantity: vi.fn(),
  clear: vi.fn(),
  totalCount: () => 0,
  totalPrice: () => 0,
};

// Wrapper que provee el contexto y el Router
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <CartContext.Provider value={mockCartContext}>
        {ui}
      </CartContext.Provider>
    </BrowserRouter>
  );
};

describe('ProductCard', () => {

  beforeEach(() => {
    // Limpiamos los mocks antes de cada prueba
    vi.clearAllMocks();
  });

  // Requisito: Pruebas de renderizado y Props
  it('debería renderizar la información del producto correctamente (Props)', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    // Verifica que el nombre, precio y descripción estén en el documento
    expect(screen.getByText("Juego de Test")).toBeInTheDocument();
    expect(screen.getByText("$99.990 CLP")).toBeInTheDocument();
    expect(screen.getByText("Esta es una descripción de prueba.")).toBeInTheDocument();
    expect(screen.getByText("TEST001")).toBeInTheDocument();
  });

  // Requisito: Pruebas de Estado (state)
  it('debería actualizar el estado de la cantidad al cambiar el input', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    const qtyInput = screen.getByLabelText('Cantidad') as HTMLInputElement;
    
    // Verifica el estado inicial
    expect(qtyInput.value).toBe('1');

    // Simula el cambio de estado del usuario
    fireEvent.change(qtyInput, { target: { value: '3' } });

    // Verifica el nuevo estado
    expect(qtyInput.value).toBe('3');
  });

  // Requisito: Pruebas de Eventos
  it('debería llamar a addItem del CartContext al hacer clic en "Agregar"', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole('button', { name: 'Agregar' });
    const qtyInput = screen.getByLabelText('Cantidad') as HTMLInputElement;

    // Cambiamos la cantidad a 2
    fireEvent.change(qtyInput, { target: { value: '2' } });

    // Simula el evento de clic
    fireEvent.click(addButton);

    // Verifica que el mock fue llamado
    expect(mockAddItem).toHaveBeenCalledOnce();
    // Verifica que fue llamado con el producto y la cantidad correcta (2)
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct, 2);
  });

  // Prueba de renderizado condicional (basado en estado 'added')
  it('debería cambiar el texto del botón a "Añadido ✓" después del clic', () => {
    vi.useFakeTimers(); // Usamos timers falsos para controlar el setTimeout
    
    renderWithProviders(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole('button', { name: 'Agregar' });
    
    // Clic en el botón
    fireEvent.click(addButton);

    // El texto debe cambiar
    expect(screen.getByRole('button', { name: 'Añadido ✓' })).toBeInTheDocument();

    // Avanzamos el timer (en ProductCard es de 1400ms)
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // El texto debe volver a "Agregar"
    expect(screen.getByRole('button', { name: 'Agregar' })).toBeInTheDocument();

    vi.useRealTimers(); // Restauramos timers reales
  });

  // Requisito: Pruebas de renderizado condicional (basado en estado 'fav')
  it('debería cambiar el ícono de favorito (renderizado condicional)', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    
    const favButton = screen.getByTitle('Agregar a favoritos');

    // Estado inicial (no favorito)
    expect(favButton.textContent).toBe('♡');
    
    // Clic para hacerlo favorito
    fireEvent.click(favButton);

    // Estado cambia (favorito)
    expect(favButton.textContent).toBe('♥');
    expect(screen.getByTitle('Quitar de favoritos')).toBeInTheDocument();
  });
});