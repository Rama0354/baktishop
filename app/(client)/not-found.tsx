import Image from "next/image";
import Link from "next/link";

function NotFoundPage() {
  return (
    <section className="container flex items-center justify-center w-full h-screen bg-white">
      <div className="px-4 lg:py-12">
        <div className="lg:gap-4 lg:flex">
          <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
            <h1 className="font-bold text-primary-dark text-9xl">404</h1>
            <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops!</span> Halaman tidak
              ditemukan
            </p>
            <p className="mb-8 text-center text-gray-500 md:text-lg">
              Maaf Halama yang anda tuju mungkin salah atau belum tersedia.
            </p>
            <Link
              href="/"
              className="px-5 py-2 rounded-md text-blue-100 bg-primary-dark hover:bg-secondary-dark"
            >
              Kembali
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

export default NotFoundPage;
