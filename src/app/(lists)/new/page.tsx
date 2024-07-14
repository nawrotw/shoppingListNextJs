'use client';

import { Header } from "@/components/composite/Header";
import { ShoppingListForm } from "@/app/(lists)/_components/ShoppingListForm";
import { useState, useRef } from "react";

export default function NewListPage() {

  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSave = () => {
    formRef.current?.requestSubmit()
  }

  return (
    <main className="p-4">
      <Header
        title='Lists'
        left={{ text: 'Cancel', href: '/' }}
        right={{ text: !pending ? 'Save' : 'Save...', disabled: pending, onClick: handleSave }}
      />
      <ShoppingListForm onPending={setPending} formRef={formRef} />
    </main>
  );
}
