import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import homeImage from "../public/home.jpg";

function Hero() {
  return (
    <div className="flex whitespace-normal justify-center p-20 gap-16 dark:text-white">
      <div className="text-clip justify-center align flex flex-col gap-4">
        <span className="text-3xl font-bold">
          Elevate Your Project Management with Effortless Collaboration
        </span>
        <p className="text-sm">
          Welcome to our Project Management System - Where Organizing Tasks and
          Projects is a Breeze!
        </p>
        <div>
          <Button variant={"default"}>Try it!</Button>
        </div>
      </div>
      <div>
        <Image src={homeImage} height={800} alt="" />
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="px-8 py-2 z-50 sticky w-full flex justify-between items-center -inset-1">
      {/* Logo Area */}
      <div className="font-bold dark:text-white text-lg">PMS</div>

      {/* Login / Signup */}
      <div className="flex gap-2">
        <Button variant={"link"}>
          <Link href={"/signup"}>Sign Up</Link>
        </Button>
        <Button>
          <Link href={"/login"}>Login</Link>
        </Button>
      </div>
    </nav>
  );
}

export default function Home() {
  return (
    <div className="w-3/4 mx-auto h-screen">
      <Navbar />
      <Hero />
    </div>
  );
}
