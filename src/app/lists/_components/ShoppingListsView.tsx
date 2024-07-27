'use client'

import { Header } from "@/components/composite/Header";
import { ViewContent } from "@/components/composite/ViewContent";
import { HeaderActionBar } from "@/components/HeaderActionBar";
import { ShoppingList } from "@/db/schema";
import { useState } from "react";
import { ShoppingListRow } from "@/app/lists/_components/ShoppingListRow";
import { PencilIcon, AlignJustifyIcon } from "lucide-react";
import Link from "next/link";

export const ShoppingListsView = ({ lists }: { lists: ShoppingList[] }) => {

  const [isEditMode, setIsEditMode] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredLists = lists.filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (<>
    <Header
      title='Lists'
      left={{ icon: 'plus', href: 'lists/new' }}
      right={{ text: !isEditMode ? 'Edit' : 'Done', onClick: () => setIsEditMode(mode => !mode) }}
    >
      <HeaderActionBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
    </Header>
    <ViewContent>
      {filteredLists.map((item) => (
        <ShoppingListRow
          key={item.id}
          item={item}
          href={`/lists/${item.id}/items`}
          actions={isEditMode && <>
            <Link href={`/lists/${item.id}/edit`}><PencilIcon className='mx-4 my-2'/></Link>
            <AlignJustifyIcon className='my-2'/>
          </>}
        />
      ))}
    </ViewContent>
  </>);
}
