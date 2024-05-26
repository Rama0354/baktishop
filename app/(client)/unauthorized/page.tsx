import { Button } from "@/components/ui/button";
import Link from "next/link";

function UnauthorizedPage() {
  return (
    <section className="container flex items-center justify-center w-full h-screen bg-secondary dark:bg-background">
      <div className="px-4 lg:py-12">
        <div className="lg:gap-4 lg:flex">
          <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
            <h1 className="font-bold text-primary text-9xl">401</h1>
            <p className="mb-2 text-2xl font-bold text-center md:text-3xl">
              <span className="text-destructive">Oops!</span> Anda tidak
              memiliki akses
            </p>
            <p className="mb-8 text-center text-gray-500 md:text-lg">
              Maaf Halama yang anda tuju tidak tersedia untuk umum.
            </p>
            <Link href="/">
              <Button size={"lg"}>Kembali</Button>
            </Link>
          </div>
          <div className="mt-4">
            {/* <Image
                width={340}
                height={340}
                src="https://cdn.pixabay.com/photo/2016/11/22/23/13/black-dog-1851106__340.jpg"
                alt="img"
                className="object-cover w-full h-full"
              /> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UnauthorizedPage;
