import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"



export const useConfirm = (title: string, message: string): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{resolve: (value: boolean) => void } | null>(null)
    // confirm() -> promise != null -> show dialog -> user clicks confirm -> promise.resolve(true) -> promise = null -> dialog closes
    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve: resolve }) // resolve is a function that can be called 
    })

    const handleClose = () => {
        setPromise(null)
    }

    const handleConfirm = () => {
        promise?.resolve(true)
        handleClose()
    }

    const handleCancel = () => {
        promise?.resolve(false)
        handleClose()
    }

    const ConfirmationDialog = () => (
        // show the dialog if promise is not null
        <Dialog open={promise !== null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-2">
                    <Button onClick={handleCancel} variant={"outline"}>Cancel</Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
    )

    return [ConfirmationDialog, confirm]
}