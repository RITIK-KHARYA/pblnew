import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Tabs defaultValue="signin" className="w-[400px] mx-auto p-4">
        <TabsList className="grid w-full grid-cols-2 divide-x-2 divide-foreground/10 rounded-lg">
          <TabsTrigger value="signin">SignIn</TabsTrigger>
          <TabsTrigger value="signup">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignIn />
        </TabsContent>
        <TabsContent value="signup">
          <SignUp />
        </TabsContent>  
      </Tabs>
    </div>
  );
}
