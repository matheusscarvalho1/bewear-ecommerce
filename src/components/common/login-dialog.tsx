"use client";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";

interface LoginDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginDialog = ({ isOpen, onOpenChange }: LoginDialogProps) => {
  const handleSignInWithGoogle = async () => {
    try {
      await authClient.signIn.social({ provider: "google" });
    } catch (err) {
      console.error("Erro ao entrar com Google", err);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="text-center">
          <DialogTitle className="mt-4 text-2xl">Criar uma conta</DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium">
            Conecte-se à BEWEAR e aproveite uma experiência feita para quem se
            veste com personalidade.
          </DialogDescription>

          <DialogFooter>
            <div className="flex w-full flex-col gap-4">
              <Button type="button" className="w-full" asChild>
                <Link href="/authentication">Crie uma conta</Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleSignInWithGoogle}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Entrar com o Google
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginDialog;
