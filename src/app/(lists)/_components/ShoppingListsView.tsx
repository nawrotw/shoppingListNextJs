'use client'

import { Header } from "@/components/composite/Header";
import { ViewContent } from "@/components/composite/ViewContent";
import { HeaderActionBar } from "@/components/HeaderActionBar";
import { ShoppingList } from "@prisma/client";
import { useState } from "react";
import { ShoppingListItem } from "@/app/(lists)/_components/ShoppingListItem";
import { PencilIcon, AlignJustifyIcon } from "lucide-react";
import Link from "next/link";

export default function ShoppingListsView({ lists }: { lists: ShoppingList[] }) {

  const [isEditMode, setIsEditMode] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredLists = lists.filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()));


  return (<>
    <Header
      title='Lists'
      left={{ icon: 'plus', href: '/new' }}
      right={{ text: !isEditMode ? 'Edit' : 'Done', onClick: () => setIsEditMode(mode => !mode) }}
    >
      <HeaderActionBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
    </Header>
    <ViewContent>
      {filteredLists.map((item) => (
        <ShoppingListItem
          key={item.id}
          item={item}
          actions={isEditMode && <>
            <Link href={`/${item.id}/edit`}><PencilIcon className='mx-4 my-2'/></Link>
            <AlignJustifyIcon className='my-2'/>
          </>}
        />
      ))}
    </ViewContent>
  </>);
}
