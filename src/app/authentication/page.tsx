"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { toast } from "sonner";

import { Header } from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

// Componente que usa searchParams (envolto em Suspense)
const AuthenticationContent = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error") === "not-authenticated") {
      toast.info("Conecte-se à BEWARE para uma melhor experiência.", {
        id: "auth-error",
        duration: 8000,
      });
    }
  }, [searchParams]);

  return (
    <Tabs defaultValue="sign-in">
      <TabsList>
        <TabsTrigger value="sign-in">Entrar</TabsTrigger>
        <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in" className="w-full">
        <SignInForm />
      </TabsContent>
      <TabsContent value="sign-up" className="w-full">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  );
};

// Componente principal
const Authentication = () => {
  return (
    <>
      <Header />
      <div className="flex w-full flex-col gap-6 p-5">
        <Suspense fallback={<div className="text-center">Carregando...</div>}>
          <AuthenticationContent />
        </Suspense>
      </div>
    </>
  );
};

export default Authentication;
