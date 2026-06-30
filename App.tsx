import React from 'react';
import { ProductEntry } from './src/ProductEntry';
import { ClaimantPortal } from './src/screens/ClaimantPortal';

export default function App() {
  return (
    <ProductEntry>
      <ClaimantPortal />
    </ProductEntry>
  );
}
