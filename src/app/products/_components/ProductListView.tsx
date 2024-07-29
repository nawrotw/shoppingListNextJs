'use client'

import { Header } from "@/components/composite/Header";
import { ViewContent } from "@/components/composite/ViewContent";
import { HeaderActionBar } from "@/components/composite/HeaderActionBar";
import { Product } from "@/db/schema";
import { useState } from "react";
import { ProductRow } from "@/app/products/_components/ProductRow";

export default function ProductListView({ products }: { products: Product[] }) {


  const [searchTerm, setSearchTerm] = useState('');
  const filtered = products.filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (<>
    <Header title='Products' right={{ icon: 'plus', href: 'products/new' }}>
      <HeaderActionBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
    </Header>
    <ViewContent>
      {filtered.map((product) => (
        <ProductRow key={product.id} href={`/products/${product.id}/edit`} {...product}/>
      ))}
    </ViewContent>
  </>);
}
