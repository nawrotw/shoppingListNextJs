'use client'

import { Header } from "@/components/composite/Header";
import db from "@/infrastructure/db/db";
import { ViewContent } from "@/components/composite/ViewContent";
import { Input } from "@/components/ui/input";
import { HeaderActionBar } from "@/components/HeaderActionBar";
import { ShoppingList } from "@prisma/client";
import { useState, useMemo } from "react";

export default function ListClientPage({ lists }: { lists: ShoppingList[] }) {


  const [searchTerm, setSearchTerm] = useState('');
  const filteredLists = lists.filter(({name}) => name.toLowerCase().includes(searchTerm.toLowerCase()));


  return (<>
    <Header
      title='Lists'
      left={{ icon: 'plus', href: '/new' }}
      right={{ text: 'Edit' }}
    >
      <HeaderActionBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
    </Header>
    <ViewContent>
      {filteredLists.map((item) => (
        <div key={item.id}>{item.name}, Products: {item.products.length}</div>
      ))}
    </ViewContent>
  </>);
}
