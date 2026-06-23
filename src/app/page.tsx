"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import { Input } from "@base-ui/react";
import { useState } from "react";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert("SOmething went wrong");
        },
        onSuccess: () => {
          window.alert("Success");
        },
      },
    );
  };
  if (session){
    return(
      <div>
        <p>Logged i as {session.user.name}</p>
        <Button onClick={()=>authClient.signOut()}>Sign out</Button>
      </div>
    )
  }

  return (
    <>
      <div>
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Button onClick={onSubmit}>create user</Button>
      </div>
    </>
  );
}
