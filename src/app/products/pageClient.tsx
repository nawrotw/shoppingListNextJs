'use client'

import { Header } from "@/components/composite/Header";
import { ViewContent } from "@/components/composite/ViewContent";
import { HeaderActionBar } from "@/components/HeaderActionBar";
import { Product } from "@prisma/client";
import { useState } from "react";

export default function ProductListClientPage({ products }: { products: Product[] }) {


  const [searchTerm, setSearchTerm] = useState('');
  const filtered = products.filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (<>
    <Header title='Products' right={{ icon: 'plus' }}>
      <HeaderActionBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
    </Header>
    <ViewContent>
      {filtered.map((item) => (
        <div key={item.id}>{item.name}, unit: {item.unit}</div>
      ))}
    </ViewContent>
  </>);
}
