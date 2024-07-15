import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";

export interface DeleteConfirmationDialogProps {
  open: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
  title?: string;
  message?: string;
  children?: ReactNode;
}

export const DeleteConfirmationDialog = (props: DeleteConfirmationDialogProps) => {

  const {
    open,
    onConfirm,
    onClose,
    title = 'Are you absolutely sure?',
    message = 'This action cannot be undone.',
  } = props;

  return <AlertDialog open={open}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{message}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
        <AlertDialogAction
          className={buttonVariants({ variant: "destructive" })}
          onClick={onConfirm}
        >
          Confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
}
