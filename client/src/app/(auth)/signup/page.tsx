import FormInput from "@/components/form/FormInput";
import FormLayouts from "@/components/auth/FormLayouts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${process.env.TITLE} - Sign Up`,    
}

export default function SignUP() {
  return <FormLayouts
      type='signup'
    >
      <>
        <FormInput 
          label="Nickname"
          fieldType="nickname"
          placeholder="example@gmail.com"
          required
        />
        <FormInput 
          label="Your email"
          fieldType="email"
          placeholder="example@gmail.com"
          required
        />
        <FormInput 
          label="Password"
          fieldType="password"
          placeholder="••••••••"
          required
        />
      </>
    </FormLayouts>
}  