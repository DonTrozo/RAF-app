import React from 'react';
import { ProductEntry } from './src/ProductEntry';
import { ModeShell } from './src/screens/ModeShell';

export default function App() {
  return (
    <ProductEntry>
      <ModeShell />
    </ProductEntry>
  );
}
